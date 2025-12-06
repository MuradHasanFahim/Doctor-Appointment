

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";  
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token,getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat=(slotDate)=>{
  const dateArray=slotDate.split('_')
  return dateArray[0]+" "+months[Number(dateArray[1])]+' '+dateArray[2]

  }


  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }  
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
      else
      {
        toast.error(data.message)
      }

    
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


const cancelAppointment = async (appointmentId) => {
  try {
    //console.log("Cancelling appointment:", appointmentId);

    const { data } = await axios.post(
      backendUrl + "/api/user/cancel-appointment",
      { appointmentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      toast.success(data.message);
      getUserAppointments(); 
      getDoctorsData// refresh list
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    if (token) getUserAppointments();   
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
        My Appointments
      </p>
      {appointments.map((doctor, index) => (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300 "
          key={index}
        >
          <div>
            <img
              className="w-36 bg-indigo-50"
              src={doctor.docData.image}
              alt=""
            />
          </div>
          <div className="flex-1 text-sm text-zinc-600 ">
            <p className="text-neutral-800 font-semibold ">{doctor.docData.name}</p>
            <p className="mb-3">{doctor.docData.speciality}</p>
            <p className="text-zinc-700 font-medium mt-2">Address:</p>
            <p className="text-xs">{doctor.docData.address.line1}</p>
            <p className="text-xs">{doctor.docData.address.line2}</p>
            <p className="text-xs mt-2">
              <span className="text-sm text-neutral-700 font-medium">
                Date & Time:
              </span>{" "}
              {slotDateFormat(doctor.slotDate)} | {doctor.slotTime}
            </p>
          </div>
          <div></div>
          <div className="flex flex-col gap-2 justify-end">
            {
                !doctor.cancelled && !doctor.isCompleted && <button className="text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white cursor-pointer transiton-all duration-300">
              Pay Online
            </button>
            }

            {
              !doctor.cancelled &&  !doctor.isCompleted && <button onClick={()=>cancelAppointment(doctor._id)}className="text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-500 hover:text-white cursor-pointer transiton-all duration-300">
              Cancel appointment
            </button>
            }
            {
                doctor.cancelled && !doctor.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointmnent Cancelled</button>
            }
            {
              doctor.isCompleted && <button className="sm:min-w-[12rem] py-2 border border-green-500 rounded text-green-500">Completed</button>
            }
            
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
