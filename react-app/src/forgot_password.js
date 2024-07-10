import React, { useState } from 'react'
import Navbar from './Navbar'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = e => setEmail(e.target.value)

  
  const handleForgotPassword = async (e) => {
      // Logic to reset password
    e.preventDefault()
    try {
     const response = await fetch('https://ohzayn.pythonanywhere.com/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',

      body: JSON.stringify({email})
    });
    const data = await response.json()
    if (data.success) {
      setMessage(data.message);
      sessionStorage.setItem('token', data.reset_token); // Set token in sessionStorage
      sessionStorage.setItem('email', data.email);
      window.location.href = data.redirect_url;
    } else {
      setMessage(data.message);
    }
    
  }
   catch(err){
      console.error(err)
   }

    
  }

  return (
    <>
     <div className='container mx-auto mt-40 rounded-xl py-32'>
      <div className='flex justify-center'>
        <div className='md:w-2/3 w-full md:mx-0 mx-8 shadow-xl py-10 md:px-20 px-6 border-2 rounded-xl'>   <form onSubmit={handleForgotPassword}>
        <h1 className='text-2xl font-semibold my text-black'>Reset Password</h1>
        <h3 className='text-lg text-gray-500 my-2'>Enter your email to reset the password</h3>
            <input type="email" placeholder='Email' value={email} className='border px-4 py-2 my-4 w-full block border-gray-800/60 outline-none rounded-lg' onChange={handleEmailChange}/>    
            <input type="submit" value="Submit"  className='bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all float-right duration-150 font-semibold shadow-xl'/>
        </form>     
        <p className='text-red-700'>{message}</p>

        </div>
   
      </div>
        
    </div>
    </>
   
  )
}

export default ForgotPassword
