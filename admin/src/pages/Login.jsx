import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAToken, backendUrl } = useContext(AdminContext)
    const {setDToken}=useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

                if (data.success) {
                    console.log(data.token)
                    localStorage.setItem('aToken', data.token) // Fixed: data.token
                    setAToken(data.token)
                    toast.success('Login successful!')
                } else {
                    toast.error(data.message)
                }
            } else {
                // Doctor login logic here
                const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
                // toast.info('Doctor login functionality coming soon!')
                if (data.success) {
                    console.log(data.token)
                    localStorage.setItem('dToken', data.token) // Fixed: data.token
                    setDToken(data.token)
                    toast.success('Login successful!')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.response?.data?.message || 'Login failed. Please try again.')
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 shadow-xl border border-blue-500 rounded-lg'>
                    <p className='text-2xl font-semibold text-center w-full m-auto'>
                        <span className='text-blue-500'>{state}</span> Login
                    </p>
                    
                    <div className='w-full'>
                        <p>Email :</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-400 shadow-sm mt-2' 
                            type="email" 
                            required 
                        />
                    </div>
                    
                    <div className='w-full'> 
                        <p>Password :</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} // FIXED: setPassword
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-gray-400 shadow-sm mt-2' 
                            type="password" 
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm mt-2 hover:cursor-pointer"
                    >
                        Login
                    </button>
                    
                    {state === 'Admin' 
                        ? <p className="text-sm text-gray-600 mt-4">
                            Doctor Login? <span onClick={() => setState('Doctor')} className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors duration-200">Click Here</span>
                          </p> 
                        : <p className="text-sm text-gray-600 mt-4">
                            Admin Login? <span onClick={() => setState('Admin')} className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors duration-200">Click Here</span>
                          </p>
                    }
                </div>
            </form>
            
            {/* Add ToastContainer to display notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Login