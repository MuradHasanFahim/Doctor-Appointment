import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  // State for all form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')
  const [DocImage, setDocImage] = useState(null)

  const { aToken, backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!DocImage) {
        return toast.error('Image Not Selected!!')
      }
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address1 || !address2) {
        return toast.error("Please fill all the fields")
      }

      const requiredFields = { name, email, password, speciality, degree, experience, about, fees, address1, address2 }
      for (const [key, value] of Object.entries(requiredFields)) {
        if (!value || value.toString().trim() === '') {
          return toast.error(`Please fill the ${key} field`)
        }
      }

      const formData = new FormData()
      formData.append("image", DocImage)
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("experience", experience)
      formData.append("fees", Number(fees))
      formData.append("speciality", speciality)
      formData.append("degree", degree)
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }))
      formData.append("about", about)

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken: aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        // ✅ Reset fields now works because inputs are controlled
        setDocImage(null)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        setSpeciality('General Physician')
        setExperience('1 Year')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error adding doctor:', error.response?.data || error.message)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <p className="text-2xl font-bold text-gray-800 mb-6">Add Doctor</p>

      {/* Upload Image */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={DocImage ? URL.createObjectURL(DocImage) : assets.upload_area}
                alt=""
                className="w-24 h-24 opacity-70"
              />
            </label>
            <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-sm text-gray-700 text-start mt-2">Upload doctor <br />picture</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Doctor Name</p>
              {/* ❌ ERROR: missing value, fixed with value={name} */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Doctor Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                type="number"
                placeholder="Fees"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Education</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                placeholder="Education"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                type="text"
                placeholder="Address 1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type="text"
                placeholder="Address 2"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Doctor */}
      <div className="pt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">About Doctor</p>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Write About Doctor"
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-6"
        />
        <button
          type="submit"
          className=" bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-colors hover:cursor-pointer"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
