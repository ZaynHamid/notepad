import React, { useState } from 'react'
import Home from './goBack'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

 
    const handleSubmit = async e => {
        e.preventDefault()
        const user = localStorage.getItem('user')

        try {
            const response = await fetch("https://ohzayn.pythonanywhere.com/change-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ currentPassword, newPassword, user })
            });
            const data = await response.json();
            if (data.success) {

                setMessage(data.message, user);
                navigate('/')  
               
            } else {
                setMessage(data.message, user)                
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    }

    return (
        <>
        <Home/>
         <div className="container mx-auto mt-48 ">
        <div className='md:w-2/3 mx-auto border-2 p-8 shadow-xl'>
            <h1 className='text-2xl font-bold'>Change Password</h1>
            <form onSubmit={handleSubmit}>
            <div className='flex items-center justify-between border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl'>

<input 
type={showPassword ? 'text' : 'password'}
value={currentPassword} 
onChange={e => setCurrentPassword(e.target.value)} 
placeholder="Current Password"
className='w-full outline-none' 

/>
<svg
width="25px"
height="25px"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
className='cursor-pointer'
onClick={() => setShowPassword(!showPassword)}
>
<path
d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
stroke="#000000"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
/>
<path
d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
stroke="#000000"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
/>
</svg>
</div>

<div className='flex items-center justify-between border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl'>

<input 
type={showPassword ? 'text' : 'password'}
value={newPassword} 
onChange={e => setNewPassword(e.target.value)} 
placeholder="New Password"
className='w-full outline-none' 

/>
</div>
<p className='text-grey-600'>Use 8 or more characters with a mix of letters, numbers, and symbols.</p>
<p className='text-grey-600'>{message}</p>

<input type='submit' value="Save Changes" className='bg-black block ml-auto text-white px-6 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all duration-150 font-semibold shadow-xl'/>

            </form>
        </div>
    </div>
        </>
   
  )
}

export default ChangePassword