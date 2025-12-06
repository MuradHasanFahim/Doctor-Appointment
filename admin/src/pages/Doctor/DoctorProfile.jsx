import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';


const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl} =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);


  const updateProfile=async()=>{
    try{
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }

      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',
      updateData,
      {headers:{Authorization:`Bearer ${dToken}`}}  )
      if(data.success)
      {
        toast.success('Profile updated successfully')
        setIsEdit(false)
        getProfileData();

      }
      else
      {
        toast.error(data.message)
      }

    }
    catch(error)
    {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);



  if (!profileData) {
    return <p className="p-4">Loading profile...</p>;
  }

  // const handleSave = () => {
  //   updateProfile(profileData); // API call from context
  //   setIsEdit(false);
  // };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

        {/* ===== Profile Image Section ===== */}
        <div className="bg-blue-500 p-6 rounded-xl flex justify-center">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>

        {/* ===== Basic Info ===== */}
        <div className="mt-6 text-center">
          <p className="text-2xl font-semibold text-gray-800">{profileData.name}</p>
          <p className="text-gray-600 mt-1">
            {profileData.degree} • {profileData.speciality}
          </p>

          <button className="mt-3 px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
            {profileData.experience}
          </button>
        </div>

        {/* ===== About Section ===== */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">About</h3>
          <p className="text-gray-700 mt-1 leading-relaxed">
            {profileData.about}
          </p>
        </div>

        {/* ===== Fees ===== */}
        <div className="mt-6">
          <p className="font-semibold text-lg">
            Appointment Fee:{" "}
            <span className="text-blue-600">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  className="border p-1 rounded ml-2 w-24"
                />
              ) : (
                `$${profileData.fees}`
              )}
            </span>
          </p>
        </div>

        {/* ===== Address ===== */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Address</h3>

          {isEdit ? (
            <>
              <input
                type="text"
                className="border p-2 rounded w-full mt-2"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                className="border p-2 rounded w-full mt-2"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </>
          ) : (
            <>
              <p className="text-gray-700">{profileData.address?.line1}</p>
              <p className="text-gray-700">{profileData.address?.line2}</p>
            </>
          )}
        </div>

        {/* ===== Availability ===== */}
       <div className="mt-6 flex items-center gap-2">
  <input 
    type="checkbox"
    checked={profileData.available}
    disabled={!isEdit}
    onChange={() =>
      setProfileData((prev) => ({
        ...prev,
        available: !prev.available,
      }))
    }
    className="w-5 h-5 accent-blue-600" // ✅ sets checkbox color to blue when checked
  />
  <label className="text-gray-700 font-medium">
    Available for Appointments
  </label>
</div>


        {/* ===== Buttons ===== */}
        <div className="mt-8 flex justify-center gap-4">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:cursor-pointer">
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:cursor-pointer">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
