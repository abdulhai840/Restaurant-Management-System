import React from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';

const LandingScreenforCheck = () => {
    const Login = localStorage.getItem('Login')
    if (Login === "true") {
        return <>
            <Sidebar />
        </>
    }
    else {
        return <>
            {localStorage.clear()}
            <Redirect to="/home" />
        </>
    }
}

export default LandingScreenforCheck;