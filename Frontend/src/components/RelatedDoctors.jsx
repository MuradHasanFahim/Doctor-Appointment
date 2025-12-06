import React, { use } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const RelatedDoctors = ({speciality,docId}) => {

    const navigate=useNavigate();

    const {doctors}=useContext(AppContext);
    const [relDoc,setRelDoc]=useState([]);

    useEffect(()=>{
        if(doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()&&doc._id!==docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality,docId]);



    
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm text-gray-600">
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* ✅ Fixed Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-4 pt-5 px-3 sm:px-0">
                {relDoc.slice(0,5).map((doctor, index) => (
                    <div
                        onClick={() => {navigate(`/appointment/${doctor._id}`); window.scrollTo(0,0)}}
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        {/* Doctor Image */}
                        <img
                            className="w-full  object-cover bg-blue-50"
                            src={doctor.image}
                            alt={doctor.name}
                        />

                        {/* Doctor Info */}
                        <div className="p-4 space-y-1">
                            <div className={`flex items-center gap-2 text-xs ${doctor.available?'text-green-500':'text-red-500'}  font-medium`}>
                                <p className={`w-2 h-2 ${doctor.available?'bg-green-500 ':'bg-red-500 '} rounded-full `}></p>
                                <p>{doctor.available?'Available':'Unavailable'}</p>
                            </div>
                            <p className="font-semibold text-gray-800">
                                {doctor.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {doctor.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate("/doctors");
                    window.scrollTo(0, 0);
                }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 border border-blue-900 hover:cursor-pointer hover:translate-y-0.5 transition-all duration-500"
            >
                More
            </button>
        </div>
  )
}

export default RelatedDoctors