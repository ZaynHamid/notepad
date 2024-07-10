import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const User = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  

  useEffect(() => {
  const user = localStorage.getItem("user")
  user ? setUsername(user) : <></>
  }, [])

  const DeleteAccount = async () => {
    try {
        const response = await fetch('https://ohzayn.pythonanywhere.com/delete_account', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',

            body: JSON.stringify({username})
        });
        const data = await response.json();
        if(data.success) {
            setMessage("Account deleted!");
            window.location.href = data.redirect_url;
          localStorage.clear()
        } else {
            setError("An error occurred. Please try again later.");
        }
    } catch(err) {
        console.error(err);
        setError("An error occurred. Please try again later.");
    }
};


  return ( <>
  <ul class="flex my-4 items-center flex-row justify-center gap-6 md:text-lg uppercase font-semibold">
    <li>
      <Link class="border bg-slate-200/80  md:text-lg lead font-bold px-4 py-2 rounded-lg" to="/">/</Link>
      </li>
    </ul>
  <div className='container mx-auto mt-40'>
    <div className='md:w-2/3 md:mx-auto mx-4 shadow-xl p-6' >
       <h2 className='text-3xl font-semibold'>Settings</h2>
       <p className='mt-12 capitalize text-xl'>Welcome, {username}!</p>
       <button className='mt-6 flex items-center bg-white/50 border shadow-md rounded-2xl px-5 py-2 gap-3 text-blue-400'>
       <svg 
      width={"20px"} 
      height={"20px"} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" 
        stroke="#000000" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg><Link to='/change-password'> Change Password</Link></button>

         <button className='mt-6 flex items-center bg-red-500 hover:bg-red-700 rounded-md border px-5 py-2 gap-3 text-white'  onClick={user => DeleteAccount(user)}>
         <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7H20"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>Delete Account</button>
    </div>
   
  </div>
  
    
    {message ? message : error}
    </>
  )
}

export default User