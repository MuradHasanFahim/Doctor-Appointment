import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  // Add time formatting function directly in component
  const formatTime = (time) => {
    if (!time) return "Time not available";
    return time;
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.length === 0 ? (
          <p className="text-center py-4">No appointments found</p>
        ) : (
          appointments.reverse().map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={
                    item.userData?.image ||
                    "default-image.png"
                  }
                  className="w-10 h-10 rounded-full"
                  alt="Patient"
                />
                <p>{item.userData?.name || "Unknown"}</p>
              </div>
              <p className="text-xs inline-block border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
              <p className="max-sm:hidden">
                {calculateAge(item.userData?.dob) || "N/A"}
              </p>
              <p>
                {slotDateFormat(item.slotDate)},{" "}
                {formatTime(item.slotTime)}
              </p>
              <p>${item.amount}</p>
              {
                item.cancelled?<p className="text-md text-red-400">Cancelled</p>:item.isCompleted?(<p className="text-md text-green-500 ">Completed</p>):
                <div className="flex">
                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
              </div>
              
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;