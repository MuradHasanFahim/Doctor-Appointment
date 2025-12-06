import { createContext, useEffect, useState } from "react"; 
import axios from "axios";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData]=useState(false)




    

 



    const getDoctorsData = async () => {
        setLoading(true);
        setError(null);
        try {
           const { data } = await axios.get(backendUrl+'/api/doctor/list');

            if (data.success) { 
                setDoctors(data.doctors);
            } else {
                setError(data.message || "Failed to fetch doctors.");
                toast.error(data.message || "Failed to fetch doctors.");
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    const loadUserProfileData=async()=>{
        try{

            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token:token}})
            if(data.success)
            {
                setUserData(data.userData)
            }
            else
            {
                toast.error(data.message)
            }

        }
        catch(error)
        {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    useEffect(() => {
        getDoctorsData();
    }, []); 

   useEffect(() => {
    if (token) {
        loadUserProfileData();
    } else {
        setUserData(false);
    }
}, [token]); 



       const value = { 
        doctors, loading, error, 
        getDoctorsData,
        token,setToken,backendUrl,
        userData,setUserData,
        loadUserProfileData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
