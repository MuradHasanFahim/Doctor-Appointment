import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Login = () => {

    const {backendUrl,token,setToken}=useContext(AppContext)
    const [state, setState] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [name, setName] = useState("");
    const navigate=useNavigate();


    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try{
            if(state==='Sign Up')
            {
                const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password: passWord})
                if(data.success)
                {
                    localStorage.setItem('token',data.token)
                    setToken(data.token)
                }
                else
                {
                    toast.error(data.message)
                }
            }
            else
            {
                const {data}=await axios.post(backendUrl+'/api/user/login',{email,password: passWord})
                if(data.success)
                {
                    localStorage.setItem('token',data.token)
                    setToken(data.token)
                }
                else
                {
                    toast.error(data.message)
                }

            }

        }
        catch(error)
        {
            toast.error(error.message)


        }
    };

    useEffect(()=>{
        if(token)
        {
            navigate('/')
        }
    },[token])

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex items-center"
        >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-lg ">
                <p className="text-3xl font-semibold text-center w-full text-blue-600 mb-3">
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </p>
                {/* <p className='text-center w-full text-blue-400'>Please {state ==='Sign Up'?'Sign Up':'Login'} to book appointment</p>
                 */}
                {state === "Sign Up" && (
                    <div className="w-full ">
                        <p>Full Name</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}

                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        onChange={(e) => setPassWord(e.target.value)}
                        value={passWord}
                        required
                    />
                </div>

                <button type='submit' className="bg-blue-800 text-white w-full py-2 px-4 rounded-md text-base">
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </button>
                {state === "Sign Up" ? (
                    <p className="text-center w-full">
                        Already Have an account?
                        <span
                            onClick={() => setState("Login")}
                            className="text-blue-600 underline cursor-pointer"
                        >
                            {" "}
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-center w-full">
                        Create new account
                        <span
                            onClick={() => setState("Sign Up")}
                            className="text-blue-600 underline cursor-pointer "
                        >
                            {" "}
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
