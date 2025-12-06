import React from "react";
import { assets } from "../assets/assets";

const About = () => {
    return (
        <div className="mb-40">
            <div className="text-center text-2xl text-gray-500 pt-10">
                <p>
                    About <span className="text-gray-700 font-bold">Us</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 my-10">
                <img
                    className="md:w-1/2 w-full md:max-w-[390px]"
                    src={assets.about_image}
                    alt=""
                />
                <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600">
                    <p>
                        Welcome To Prescripto, Your Trusted Partner In Managing
                        Your Healthcare Needs Conveniently And Efficiently. At
                        Prescripto, We Understand The Challenges Individuals
                        Face When It Comes To Scheduling Doctor Appointments And
                        Managing Their Health Records.
                    </p>
                    <p>
                        Prescripto Is Committed To Excellence In Healthcare
                        Technology. We Continuously Strive To Enhance Our
                        Platform, Integrating The Latest Advancements To Improve
                        User Experience And Deliver Superior Service. Whether
                        You're Booking Your First Appointment Or Managing
                        Ongoing Care, Prescripto Is Here To Support You Every
                        Step Of The Way.
                    </p>
                    <b className="text-gray-700 font-bold text-xl">
                        Our Vision
                    </b>
                    <p>
                        Our Vision At Prescripto Is To Create A Seamless
                        Healthcare Experience For Every User. We Aim To Bridge
                        The Gap Between Patients And Healthcare Providers,
                        Making It Easier For You To Access The Care You Need,
                        When You Need It.
                    </p>
                </div>
            </div>

            <div className="text-xl mb-10 mt-20">
                <p>
                    WHY{" "}
                    <span className="text-gray-700 font-bold ">CHOOSE US</span>
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 text-[15px] text-gray-600 cursor-pointer border divide-y md:divide-y-0 md:divide-x">
                <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <b className="font-bold text-gray-700 uppercase">
                        Efficiency
                    </b>
                    <p>
                        Streamlined Appointment Scheduling That Fits into Your
                        Busy Lifestyle
                    </p>
                </div>

                <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <b className="font-bold text-gray-700 uppercase">
                        Convenience
                    </b>
                    <p>
                        Access To a Network of Trusted Healthcare Professionals
                        In Your Area
                    </p>
                </div>

                <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <b className="font-bold text-gray-700 uppercase">
                        Personalization
                    </b>
                    <p>
                        Tailored Recommendations And Reminders To Help You Stay
                        On Top of Your Health
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
