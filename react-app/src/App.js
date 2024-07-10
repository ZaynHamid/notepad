import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Signup from './Signup';
import forgotPassword from './forgot_password';
import ResetPassword from './reset_password';
import Notepad from './Notepad';
import User from './User';
import VerifyEmail from './verify-email';
import ChangePassword from './changePassword';
import Login from './Login';
import { useEffect } from 'react';

const App = () => {
   
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Notepad}/>
                <Route exact path='/login' Component={Login}/>
                <Route exact path='/signup' Component={Signup}/>
                <Route path='/forgot_password' Component={forgotPassword}/>
                <Route path='/reset_password/:token' Component={ResetPassword}/>
                <Route path='/user' Component={() => <User />}/>
                <Route path='/verify-email' Component={VerifyEmail}/>
                <Route path='/change-password' Component={ChangePassword}/>        
            </Routes>
        </BrowserRouter>     
    </>
       
    );
};

export default App;


