import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
    return (
        <div>
            <div className="text-center mt-10">
                <p className="uppercase text-2xl text-gray-500 font-semibold">
                    Contact{" "}
                    <span className="text-gray-700 font-bold uppercase text-2xl">
                        Us
                    </span>
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center mb-28 my-10 gap-10">
                <div className="">
                    <img
                        className="w-full  md:max-w-[360px] "
                        src={assets.contact_image}
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-center items-start gap-5">
                    <b className="uppercase font-semibold text-lg text-gray-600">
                        OUR office
                    </b>
                    <p className="text-gray-500">54709 Willms Station<br/>Suite 350,Washington,USA</p>

                   
                    <p className= " text-gray-500">Tel:(415) 555-0132<br/>Email:prescripto@gmail.com</p>


                    <b className="font-semibold text-lg text-gray-600">carres at prescripto</b>
                    <p className="text-sm text-gray-500 ">learn more about our teams and job openings</p>

                    <div>
                        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white hover:cursor-pointer transition-all duration-500">
                            Explore More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
