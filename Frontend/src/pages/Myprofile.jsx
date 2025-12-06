import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // Update context immediately with new data including image
        setUserData((prev) => ({
          ...prev,
          ...data.updatedUser,
        }));

        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!userData) return <p>Loading user data...</p>;

  return (
    <div className="max-w-lg flex flex-col gap-3 text-sm mt-10">
      {/* Profile Image */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-100"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
            />
            {!image && (
              <img
                className="w-10 absolute bottom-12 right-12"
                src={assets.upload_icon}
                alt="upload"
              />
            )}
          </div>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="profile" />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          type="text"
          className="bg-gray-50 text-3xl font-medium max-w-80"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="text-3xl font-medium text-black">{userData.name}</p>
      )}

      <hr className="text-gray-500 h-[1px]" />

      {/* Contact Information */}
      <div>
        <p className="underline text-gray-400 uppercase text-xl mb-6">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 ">
          <p className="text-gray-500 font-semibold text-xl">Email id:</p>
          <p className="text-blue-500 font-medium text-lg">{userData.email}</p>

          <p className="text-gray-500 font-semibold text-xl">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              className="bg-gray-100 max-w-52"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500 font-medium text-lg">
              {userData.phone}
            </p>
          )}

          <p className="text-gray-500 font-semibold text-xl">Address:</p>
          {isEdit ? (
            <div>
              <input
                type="text"
                className="bg-gray-50"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                type="text"
                className="bg-gray-50"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-500 font-semibold text-xl">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="underline text-gray-400 uppercase text-xl mt-3 mb-6">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3">
          <p className="text-gray-500 font-semibold text-xl">Gender:</p>
          {isEdit ? (
            <select
              className="border border-zinc-300 rounded p-2 text-gray-600"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500 font-semibold text-xl">{userData.gender}</p>
          )}

          <p className="text-gray-500 font-semibold text-xl">BirthDay:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500 font-semibold text-xl">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5">
        {isEdit ? (
          <button
            className="px-10 py-5 border border-blue-500 rounded-full text-gray-600 text-xl hover:bg-blue-500 hover:text-white transition-all duration-500"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="px-10 py-5 border border-blue-500 rounded-full text-gray-600 text-xl hover:bg-blue-500 hover:text-white transition-all duration-500"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
