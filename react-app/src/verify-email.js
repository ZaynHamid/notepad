import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const VerifyEmail = () => {
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const handleChange = e => {
        setCode(e.target.value)
    }

    const handleVerification = async (e) => {
      e.preventDefault();
      if(code.length < 6 || isNaN(code)) {
        setMessage("Please enter a valid 6-digit code.")
      } else if(code === "") {
        setMessage("Please enter a 6-digit code.")
      } else {
        try {
        const response = await fetch('https://ohzayn.pythonanywhere.com/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',

        body: JSON.stringify({ code })
        });
        const data = await response.json()
        if(data.success) {
          navigate('/login')
        } else {
          console.log('Stored Code', data.stored_code)
          console.log('Provide Code', data.provided_code)
          console.log('Email', data.email)
        }
      }      
      catch (err) {
        console.log(err)
      }
      }
      
    }

  return (

    <>
     <div className='md:container mx-auto mt-40 rounded-xl py-32'>
      <div className='flex justify-center'>
        <div className='md:w-2/3 w-full md:mx-0 mx-8 shadow-xl py-10 md:px-20 px-6 border-2 rounded-xl'>   
        <form onSubmit={handleVerification}>
        <h1 className='text-2xl font-semibold my-3 text-black'>Verify your Email</h1>
        <h3 className='text-lg text-gray-500'>Enter a 6-digit code</h3>
        <input type="text" placeholder="Code" maxLength="6" pattern="[0-9]*" value={code} className="border px-4 py-2 my-4 w-full block border-gray-800/60 outline-none rounded-lg" onChange={handleChange}/>
      
        <p className='text-red-700'>{message}</p>
            <input type="submit" value="Submit"  className='bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all float-right duration-150 font-semibold shadow-xl'/>
        </form>     

        </div>
   
      </div>
        
    </div>

    </>

  )
}

export default VerifyEmail;