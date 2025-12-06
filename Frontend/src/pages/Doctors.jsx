import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter,setShowFilter]=useState(false);

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            const filtered = doctors.filter(
                (doc) =>
                    doc.speciality.toLowerCase() === speciality.toLowerCase()
            );
            setFilterDoc(filtered);
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div className=" ">
            <p className="text-gray-600 ">
                Browse through the doctor specialist.
            </p>
            <button className={`mt-3 py-2 px-4 border rounded text-sm transition-all sm:hidden hover:cursor-pointer ${showFilter?'bg-blue-600 text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filter</button>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-8">
                <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden sm:flex'}` }>
                    <p onClick={()=>speciality==='General Physician'?navigate('/doctors'):navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='General Physician'?'bg-indigo-100 text-black':""} `}>General Physician</p>
                    <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw]sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='Gynecologist'?'bg-indigo-100 text-black':""}`}>Gynecologist</p>
                    <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw]sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='Dermatologist'?'bg-indigo-100 text-black':""} `}>Dermatologist</p>
                    <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='Pediatricians'?'bg-indigo-100 text-black':""}`}>Pediatricians</p>
                    <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='Neurologist'?'bg-indigo-100 text-black':""}`}>Neurologist</p>
                    <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${speciality==='Gastroenterologist'?'bg-indigo-100 text-black':""}`}>Gastroenterologist</p>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-4 pt-5 px-3 sm:px-0">
                    {filterDoc.map((doctor, index) => (
                        <div
                            onClick={() =>
                                navigate(`/appointment/${doctor._id}`)
                            }
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
            </div>
        </div>
    );
};

export default Doctors;
