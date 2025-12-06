import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


//addDoctorsAddDoctors

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    // Input validation
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: 'Missing details' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' })
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Weak password!!" })
    }

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Please upload an image" })
    }

    // Hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageURL = imageUpload.secure_url

    // Parse address if it's a JSON string
    let parsedAddress = address
    try {
      parsedAddress = JSON.parse(address)
    } catch (e) {
      console.log("Address is not JSON, using as string")
    }

    const doctorData = {
      name,
      email,
      image: imageURL,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    // Send success response
    res.status(201).json({ success: true, message: 'Doctor Added Successfully', doctor: newDoctor })

  } catch (error) {
    console.error('Error in addDoctor:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}


//loginloginlogin

const loginAdmin = async (req, res) => { // FIXED parameter order
  try {
    const { email, password } = req.body

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Correct JWT signing with a payload object
      const token = jwt.sign(
        { 
          email: email, 
          role: 'admin' 
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Add expiration for security
      )
      
      return res.status(200).json({success: true, token,message: 'Login successful'})

    } else {
      return res.status(401).json({ success: false,  message: "Invalid credentials" })
    }

  } catch (error) {
    console.error('Error in loginAdmin:', error)
    return res.status(500).json({ success: false, message: 'Server error during login' })
  }
}



//Api call to get all the doctors for admin panel

const allDoctors=async(req,res)=>{
  try{

    const doctors=await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  }
  catch(error)
  {

    console.log(error)
    res.json({success:false,message:error.message})

  }
}

//API to get all appointments list

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });  // success true, appointments returned
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
     // safer if auth middleware sets req.user

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//api to get dashboard data for admin panel
const adminDashboard =async(req,res)=>{
  try{
    const doctors=await doctorModel.find({})
    const users=await userModel.find({})
    const appointments= await appointmentModel.find({})

    const dashData={
    doctors:doctors.length,
    appointments:appointments.length,
    patients:users.length,
    latestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})





  }
  catch(error)
  {
    console.log(error)
    res.json({succes:false,message:error.message})

  }

}
 



export { addDoctor, loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}