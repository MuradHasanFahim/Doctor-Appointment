import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = React.useState(false);
    const {token,setToken,userData}=useContext(AppContext)

    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')
    }
    

    return (
        <div className="flex flex-row justify-between items-center py-4 border-b border-b-gray-400">
            <img
                onClick={() => navigate("/")}
                className="w-44 cursor-pointer"
                src={assets.logo}
                alt="logo"
            />

            <ul className="hidden md:flex flex-row justify-center items-center gap-5 font-medium">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1">Home</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink
                    to="/doctors"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1">All Doctors</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1">About</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1">Contact</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-4">
                {token && userData ? (
                    <div className="flex item-center gap-2 cursor-pointer relative  group">
                        <img
                            className="w-8 rounded-full"
                            src={userData.image}
                            alt=""
                        />
                        <img
                            className="w-2.5"
                            src={assets.dropdown_icon}
                            alt=""
                        />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                <p
                                    onClick={() => navigate("my-profile")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("my-appointments")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Appointment
                                </p>
                                <p
                                    onClick={logout}
                                    className="hover:text-black cursor-pointer"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:cursor-pointer hover:scale-105 transition-all"
                    >
                        Create Account
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    className="w-6 md:hidden cursor-pointer"
                    src={assets.menu_icon}
                    alt="menu"
                />

                <div
                    className={`${
                        showMenu ? "fixed right-0 top-0 bottom-0 w-64" : "w-0"
                    } md:hidden z-20 overflow-hidden bg-white shadow-lg transition-all duration-300`}
                >
                    <img
                        onClick={() => setShowMenu(true)}
                        className="w-6 md:hidden cursor-pointer"
                        src={assets.menu_icon}
                        alt="menu"
                    />

                    <div
                        className={`${
                            showMenu ? "fixed w-full" : "h-0 w-0"
                        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
                    >
                        <div className="flex items-center justify-between px-5 py-6">
                            <img
                                className="w-36"
                                src={assets.logo}
                                alt="logo"
                            />
                            <img
                                className="w-7 cursor-pointer"
                                onClick={() => setShowMenu(false)}
                                src={assets.cross_icon}
                                alt="close"
                            />
                        </div>

                        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                            <NavLink
                                className="w-full text-center px-4 py-2 rounded-lg shadow-md bg-white text-zinc-700 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                onClick={() => setShowMenu(false)}
                                to="/"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className="w-full text-center px-4 py-2 rounded-lg shadow-md bg-white text-zinc-700 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                onClick={() => setShowMenu(false)}
                                to="/doctors"
                            >
                                All Doctors
                            </NavLink>

                            <NavLink
                                className="w-full text-center px-4 py-2 rounded-lg shadow-md bg-white text-zinc-700 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                onClick={() => setShowMenu(false)}
                                to="/about"
                            >
                                About
                            </NavLink>
                            <NavLink
                                className="w-full text-center px-4 py-2 rounded-lg shadow-md bg-white text-zinc-700 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
                                onClick={() => setShowMenu(false)}
                                to="/contact"
                            >
                                Contact
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
