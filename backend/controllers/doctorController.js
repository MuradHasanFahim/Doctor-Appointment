import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {



  try {
    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    if (!docData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' })
    }

   
    const updated = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true }
    )

    return res.json({ success: true, message: 'Availability Changed', doctor: updated })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}


const doctorList=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors});

    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


//api to doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email }); // Fix: Query by email
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get doctor appoitments for doctor panel



const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user.id; // No need for parentheses
    const allAppointments = await appointmentModel.find({ docId });
const activeAppointments = await appointmentModel.find({ docId, cancelled: false });
console.log("All appointments:", allAppointments);
console.log("Active appointments:", activeAppointments);

    console.log("Querying appointments for docId:", docId);
    const appointments = await appointmentModel.find({ docId });
    console.log("Found appointments:", appointments);
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




// Api to mark appointment as completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.id; // Get doctor ID from token
    const { appointmentId } = req.body; // Get appointment ID from request body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      res.json({ success: true, message: 'Appointment marked as completed' })
    } else {
      res.json({ success: false, message: 'Appointment not found or unauthorized' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user.id; // Get doctor ID from token
    const { appointmentId } = req.body; // Get appointment ID from request body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      res.json({ success: true, message: 'Appointment marked as cancelled' })
    } else {
      res.json({ success: false, message: 'Appointment not found or unauthorized' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const doctorDashboard=async(req,res)=>{
  try{

    const docId=req.user.id;
    const appointments=await appointmentModel.find({docId})

    let earnings=0;
    appointments.map((item)=>{
      earnings+=item.amount
    })
    
    let patients=[];
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId);
      }
    })

    const dashData={
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.slice(-5)
    }

    res.json({success:true,dashData})

  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})  

  }
}


const doctorProfile=async(req,res)=>{
  try{
    const docId=req.user.id
    const profileData=await doctorModel.findById(docId).select('-password')
    res.json({success:true,profile:profileData})

  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})

  }
}


const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user.id; // doctor ID from token
    const { fees, address, available } = req.body; // updated fields from request

    const updatedProfile = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      updatedProfile
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};







export { changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard ,doctorProfile,updateDoctorProfile} 