import React from 'react'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import {useNavigate} from 'react-router'


const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)

    const navigate=useNavigate()

     const logout=()=>{
        navigate('/')
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken')
        
    }


//     const logout = () => {
//     setAToken('');
//     localStorage.removeItem('aToken');
// };

  return (

   
  

    <div className='flex justify-between items-center px-4 sm:px-10 py-3 shadow bg-white '>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-3 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-3 py-1 rounded-full border-gray-500 text-gray-600'>{aToken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer '>LogOut</button>
    </div>
  )
}

export default Navbar