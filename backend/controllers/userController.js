import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


// API to register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Required Details" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Error Email. Enter a Valid Email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong Password" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = { name, email, password: hashedPassword }
    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })  

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user information
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id   
    const userData = await userModel.findById(userId).select("-password")
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.imageFile

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" })
    }

    const updateData = { name, phone, dob, gender }

    if (address) {
      try {
        updateData.address = JSON.parse(address)
      } catch (e) {
        return res.json({ success: false, message: "Invalid address format" })
      }
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
      updateData.image = imageUpload.secure_url
    }

    const updatedUser= await userModel.findByIdAndUpdate(userId, updateData, { new: true })
    res.json({ success: true, message: "Profile Updated", updatedUser })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id
    const { docId, slotDate, slotTime } = req.body

    // find doctor
    const docData = await doctorModel.findById(docId).select("-password")
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" })
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" })
    }

    // check and update booked slots
    let slots_booked = docData.slots_booked || {}
    if (slotTime) {
      if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
          return res.json({ success: false, message: "Slot not available" })
        } else {
          slots_booked[slotDate].push(slotTime)
        }
      } else {
        slots_booked[slotDate] = [slotTime]
      }
    } else {
      if (!slots_booked[slotDate]) slots_booked[slotDate] = []
    }

    const userData = await userModel.findById(userId).select("-password")
    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime: slotTime || null,
      slotDate,
      date: Date.now(),
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({ success: true, message: "Appointment Booked!!" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to list user appointments
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id; // get from auth middleware
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//API to cancel an appointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user.id; // safer if auth middleware sets req.user

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
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


//API to make payment of appointment







export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,cancelAppointment}
