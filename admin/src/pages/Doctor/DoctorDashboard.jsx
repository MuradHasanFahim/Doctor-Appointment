import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    getDashData,
    dashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    <div className="m-10 w-[50%] mt-5">

      {/* ------ Top Stats Row ------ */}
      <div className="flex flex-wrap gap-5 mb-6 justify-start">
        <div className="flex items-center gap-2 bg-white p-4 min-w-[200px] rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-[200px] rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-[200px] rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* ------ Latest Appointments Section ------ */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <p className="text-lg font-semibold p-4 border-b border-gray-300">
          Latest Appointments
        </p>

        {dashData.latestAppointments?.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-6 py-4 gap-3 hover:bg-gray-50"
          >
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={item.userData.image}
              alt=""
            />

            <div className="flex-1">
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
              <p className="text-gray-500 text-sm">
                {slotDateFormat(item.slotDate)}
              </p>
            </div>

            {item.cancelled ? (
              <p className="text-md text-red-500 font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-md text-green-500 font-medium">Completed</p>
            ) : (
              <div className="flex gap-3">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-9 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-9 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
