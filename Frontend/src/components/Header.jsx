import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 lg:px-20 bg-primary rounded-2xl mt-5 overflow-hidden py-10 md:py-16 gap-10">
            
            {/* Left Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center md:text-left leading-snug">
                    Book Appointment <br /> with Trusted Doctors
                </h1>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 sm:gap-6">
                    <img className="w-24 md:w-28" src={assets.group_profiles} alt="User profiles" />
                    <p className="text-sm md:text-base text-center md:text-left">
                        Simply browse through our extensive list of trusted
                        doctors, schedule your appointment hassle-free.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="bg-white text-gray-600 px-6 py-3 rounded-full font-medium hover:scale-105 transition-all flex items-center gap-2 self-center md:self-start"
                >
                    Book Appointment
                    <img className="w-3" src={assets.arrow_icon} alt="Arrow icon" />
                </a>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 relative flex justify-center item-center">
                <img
                    src={assets.header_img}
                    alt="Doctor illustration"
                    className="w-full max-w-sm md:max-w-md h-auto object-contain "
                />
            </div>
        </div>
    );
};

export default Header;
