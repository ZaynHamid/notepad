import React, {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const pswdRef = useRef(null)
  const navigate = useNavigate()

  const handleUserChange = e => {
    setUsername(e.target.value);
  }

  const handleEmailChange = e =>{
     setEmail(e.target.value);
     setIsValid(validateEmail(e.target.value));
    }

  const handlePswdChange = e => {
    setPassword(e.target.value);
  }

  const handleCnfrmPswdChange = e => setConfirmPassword(e.target.value)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

const handleSignup = async (e) => {
e.preventDefault()
if (password !== confirmPassword) {
setError("Passwords don't match.")
pswdRef.current.focus()
} else if(username == "" || username.length <= 3){
setError("Please enter a valid username.");
 usernameRef.current.focus()
} 
 else if(password.length < 8){ 
  setError("Please enter a password consisting of 8 characters.")
  pswdRef.current.focus()
} else if(!isValid) {
  setError("Please enter a valid email.")
  emailRef.current.focus()
}
else {
  
     try {
      const response = await fetch("https://ohzayn.pythonanywhere.com/signup", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',

          body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (data.success) {
        navigate('/verify-email')
      } else {
          setError(data.message);
      }
  } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
  }
}
} 


 
  return (
      <div className='md:container md:mx-auto md:mt-48 my-24 sm:mx-12 mx-6'>
      <div className='flex md:flex-row flex-col justify-center items-center gap-4'>
      <div className='md:w-2/3 w-full px-10 py-12 md:mx-0 mx-6 rounded-xl bg-slate-700 basis-1/2 shadow-lg'>
                    <h1 className='md:text-3xl text-2xl text-white  font-bold'>Notepad by Z</h1>
                    <p className='my-4  text-white md:text-lg'>An app used as Notepad with different functionalities like
                choosing font size, font boldness, line heights, etc. Also,
light/dark themes, download .txt files or simply create or delete the text. It was made with React, TailwindCSS, and
Router. It also has account authentication systems which
allow the users to retrieve, update, and remove the notes
from their account.
</p>
                </div>
    
        <div className='md:w-1/3 w-full bg-white/30 border-2 md:mx-0 mx-8 px-8 rounded-xl py-10 basis-1/2 shadow-lg'>
                      <h1 className='text-3xl font-semibold my-4'>Sign up</h1>
          <form onSubmit={handleSignup}>
              <input type='text' onChange={handleUserChange} placeholder='Username' value={username} ref={usernameRef} className='border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl' />
              <input type='email' onChange={handleEmailChange} placeholder='Email' ref={emailRef}  className='border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl'  value={email} />
            <div className='border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl flex justify-between items-center'>
               <input type={showPassword ? "text" : 'password'} onChange={handlePswdChange} placeholder='Password' ref={pswdRef} className='outline-none w-full'  value={password} />
       
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
            </div>        <input type={showPassword ? "text" : 'password'} onChange={handleCnfrmPswdChange} placeholder='Confirm Password' className='border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl'  value={confirmPassword} />
              <p className='text-red-600 mb-3'>{error}</p>
              <input type='submit' value="Submit" className='bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all duration-150 font-semibold shadow-xl'/>
          </form>
          <br />
          <Link to='/login'>
             <button className='hover:underline'>
              Have an Account? Sign in
            </button>
          </Link>
         
        </div>
                </div>
                

      </div>
  );
};


export default Signup