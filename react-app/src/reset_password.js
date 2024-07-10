import React, { useRef, useState } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const pswdRef = useRef(null)
  
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage("Passwords don't match.")
            pswdRef.current.focus()
        } else if(password === "" || confirmPassword === "") {
            setMessage("Enter a valid password.")
            pswdRef.current.focus()

        } else if(password.length < 8) {
            setMessage("Please enter a password consisting of 8 characters.")
        } else {
              try {
            const response = await fetch(`https://ohzayn.pythonanywhere.com/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',

                body: JSON.stringify({
                    password,
                    confirmPassword
                })
            });
            const data = await response.json();
            if (data.success) {
                setMessage(data.message);
                window.location.href = data.redirect_url;
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error(err);
        }
        }
      
    };

    const handlePasswordChange = e => setPassword(e.target.value);

    const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

    return (
        <>
        <div className='container mx-auto mt-48 '> 
        <div className='flex justify-center'>
            <div className='md:w-2/3 w-full md:mx-0 mx-8  py-10 md:px-20 px-6 border-2 shadow-xl rounded-xl'>
                <h1 className='text-2xl my-4 font-semibold'>Reset Password</h1>
                 <form onSubmit={handleFormSubmit}>
                <div className='border px-4 py-2 my-2 w-full border-gray-800/60 outline-none rounded-xl flex justify-between items-center'>

     <input type={showPassword ? 'text' : 'password'} value={password} ref={pswdRef} onChange={handlePasswordChange} placeholder='Password'  className='outline-none w-full' />    
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
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password'  className='border px-4 py-2 my-2 w-full border-gray-800/60 outline-none rounded-xl' />    
                <p className='text-red-600 my-2'>{message}</p>      
                <input type='submit'  className='bg-black text-white px-6 mt-3 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all duration-150 font-semibold shadow-xl' value="Submit" />
            </form>  
       
            </div>
             
        </div>

        </div>
          
        </>
    );
}

export default ResetPassword;
