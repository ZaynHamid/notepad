
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const name = localStorage.getItem('user');
        if (name) {
            setLoggedIn(true);
            setUserInfo({ username: name });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "") {
            setMessage("Please enter a valid username");
            return;
        } else {
            setMessage("");
        }

        try {
            const response = await fetch("https://ohzayn.pythonanywhere.com/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ identifier: username, password })
            });
            const data = await response.json();
            if (data.success) {
                setLoggedIn(true);
                const name = data.user;
                setUserInfo({ name });
                localStorage.setItem("user", name);
                if (data.email) {
                    const _email = JSON.stringify(data.email);
                    localStorage.setItem('email', _email);
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            {loggedIn ? <Navigate to='/' /> :
                <div className='md:container md:mx-auto md:mt-48 my-24 sm:mx-12 mx-6'>
                    
                    <div className='flex justify-center md:flex-row flex-col items-center gap-4'>
  

                        <div className='w-full md:w-2/3  md:px-10 md:py-12 px-5 py-5 rounded-xl bg-slate-700 shadow-lg'>
  <h1 className='md:text-3xl text-2xl text-white font-bold'>Notepad by Z</h1>
                            <p className='my-4 text-white md:text-lg'>
                                An app used as Notepad with different functionalities like choosing font size, font boldness, line heights, etc. Also, light/dark themes, download .txt files or simply create or delete the text. It was made with React, TailwindCSS, and Router. It also has account authentication systems which allow the users to retrieve, update, and remove the notes from their account.
                            </p>


      </div>


                        <div className='md:w-1/2 w-full bg-white/30 border-2 md:px-9 px-6 md:mx-0 mx-6 rounded-xl py-10  shadow-lg'>
                            <form onSubmit={handleLogin}>
                                <h1 className='text-3xl font-semibold my-4'>Login</h1>

                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Username or email"
                                    autoComplete='true'
                                    className='border px-4 py-2 w-full border-gray-800/60 outline-none rounded-xl'
                                />

                                <div className='flex items-center justify-between border px-4 py-2 my-4 w-full border-gray-800/60 outline-none rounded-xl'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Password"
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

                                <p className='text-red-600 mb-4'>{message ? message : error}</p>

                                <input type="submit" value="Submit" className='bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-white transition-all duration-150 font-semibold shadow-xl' />
                            </form>
                            <Link to='/forgot_password' className='text-blue-600 float-right hover:underline text-lg my-2 md:my-0'>
                                Forgot password?
                            </Link>
                            <p>{message}</p>
                            <br />
                            <Link to='/signup'>
                                <button className='my-2 hover:underline'>Don't have an Account? Sign up</button>
                            </Link>
                        </div>
                        
                    </div>

                </div>
            }
        </>
    );
};

export default Login;
