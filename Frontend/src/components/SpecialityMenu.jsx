import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find By Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm px-4'>Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.</p>
        <div className='flex justify-start sm:justify-center gap-6 pt-5 w-full overflow-x-auto px-4 hide-scrollbar'>
            {specialityData.map((item,index) => (
               <Link onClick={()=>window.scrollTo(0,0)}
                 className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300' 
                 key={index} 
                 to={`/doctors/${item.speciality}`}
               >
                 <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                 <p className='text-center font-medium'>{item.speciality}</p>
               </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu