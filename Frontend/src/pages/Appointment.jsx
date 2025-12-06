import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors,backendUrl,token,getDoctorsData } = useContext(AppContext);

  const navigate=useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
const getAvailableSlots = () => {
  if (!docInfo) return;

  const allSlots = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const endTime = new Date(today);
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    const timeSlots = [];

    while (currentDate < endTime) {
      const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // fix zero-index
      const year = currentDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const slotsBookedForDate = docInfo.slots_booked?.[slotDate] || [];
      const isSlotAvailable = !slotsBookedForDate.includes(formattedTime);

      if (isSlotAvailable) {
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    allSlots.push(timeSlots);
  }

  setDocSlot(allSlots);
};

const bookAppointment = async () => {
  // 1️⃣ Check if user is logged in
  if (!token) {
    toast.warn('Login to book appointment');
    return navigate('/login');
  }

  try {
    const date=docSlot[slotIndex][0].datetime
   

    // 3️⃣ Format the date as day_month_year (EDIT)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    console.log("slotDate:", slotDate);
    console.log("slotTime:", slotTime);

    // 4️⃣ Send POST request to backend with Authorization header (EDIT)
    const { data } = await axios.post(
      `${backendUrl}/api/user/book-appointment`,
      { docId, slotDate, slotTime }, // Send correct fields
      { headers: { Authorization: `Bearer ${token}` } } // Backend expects token here
    );

    console.log("Backend response:", data); // 5️⃣ Log full response for debugging

    // 6️⃣ Handle success / error responses (EDIT)
    if (data.success) {
      toast.success(data.message);
      getDoctorsData(); // Refresh doctors data
      navigate('/my-appointments');
    } else {
      toast.error(data.message || 'Booking failed'); // Use message from backend
    }

  } catch (error) {
    // 7️⃣ Handle backend errors properly (EDIT)
    if (error.response) {
      console.log("Backend error:", error.response.data);
      toast.error(error.response.data.message || 'Something went wrong');
    } else {
      console.log("Error:", error);
      toast.error(error.message);
    }
  }
};









  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div className="my-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <div className="text-gray-600 font-medium mt-3">
              Appointment Fee:{" "}
              <span className="text-gray-600">$ {docInfo.fees}</span>
            </div>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex items-center gap-6 w-full overflow-x-auto mt-4">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div onClick={() => setSlotIndex(index) }
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              docSlot.length > 0 && docSlot[slotIndex].map((item,index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300 '}`}key={index}>
                  {item.time.toLowerCase()}

                </p>

              ))
            }
          </div>
          <button onClick={bookAppointment}className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor=pointer">Book an Appoinement</button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointment;
