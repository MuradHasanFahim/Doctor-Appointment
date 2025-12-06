import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-14 md:gap-20">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-6">
          <img src={assets.logo} alt="Logo" className="mb-5 w-40" />
          <p className="text-sm text-gray-700 w-full md:w-2/3">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div className="">
          <h3 className="text-lg text-gray-900 font-semibold mb-5">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer ">Home</li>
            <li className="cursor-pointer ">About Us</li>
            <li className="cursor-pointer ">Contact</li>
            <li className="cursor-pointer ">Privacy Policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg text-gray-900 font-semibold">Get In Touch</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer ">+1-221-456-7890</li>
            <li className="cursor-pointer ">Hey@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
        © 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
