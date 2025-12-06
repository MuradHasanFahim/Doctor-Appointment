import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments,setAppointments]=useState([])
  const [dashData,setDashData]=useState(false)
  const [profileData,setProfileData]=useState(null)


  const getAppointments = async () => {
  console.log("getAppointments() CALLED");
  console.log("dToken:", dToken); // Log the token

  try {
    const { data } = await axios.get(
      backendUrl + "/api/doctor/appointments",
      { headers: { Authorization: `Bearer ${dToken}` } }
    );

    console.log("Raw response:", data);

    if (data.success) {
      setAppointments(data.appointments);
      console.log("Appointments:", data.appointments);
    } else {
      console.warn("Backend responded with failure:", data);
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response (backend):", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/complete-appointment',
      { appointmentId },
      { headers: { Authorization: `Bearer ${dToken}` } }
    );

    if (data.success) {
      toast.success('Appointment marked as complete');
      getAppointments();
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/cancel-appointment',
      { appointmentId },
      { headers: { Authorization: `Bearer ${dToken}` } }
    );

    if (data.success) {
      toast.success('Appointment cancelled successfully');
      getAppointments();
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


const getDashData=async(req,res)=>{
  try{
    const{data}=await axios.get(backendUrl+'/api/doctor/dashboard',
    {headers:{Authorization:`Bearer ${dToken}`}} )
    if(data.success)
    {
      setDashData(data.dashData)
      console.log(data.dashData)
      toast.success('Dashboard data fetched')
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


const getProfileData = async ()=>{
  try{
    const {data}=await axios.get(backendUrl+'/api/doctor/profile',
    {headers:{Authorization:`Bearer ${dToken}`}} )
    if(data.success)
    {
      setProfileData(data.profile)
      console.log(data.profile)
      toast.success('Profile data fetched')
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




  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    profileData,setProfileData,
    getProfileData,
    backendUrl




  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
