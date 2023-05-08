import React from 'react';
import "./login.scss";
import background_image from "../../assets/image/login-cover.jpeg";
import {Link } from "react-router-dom";
import LoginForm from "../../components/Authentication/Login/LoginForm"

export default function Login() {


    return (
        <>
            <section className='login' style={{  
            backgroundImage: `url(${background_image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
            }}>
                <div className='login-container'>
                    <h1>Welcome Back!</h1>
                    <LoginForm />
                    <div className='try-signin'>
                        <p>Don't have an account? Try to <Link to="/sign-up">Sign up </Link></p> 
                    </div>
                </div>
            </section>
        </>
    );
}
