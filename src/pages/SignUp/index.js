import React from 'react';
import "./signup.scss";
import RegistrationForm from "../../components/Authentication/Signup/RegistrationForm";
import background_image from "../../assets/image/sign-up-cover.jpeg";
import {Link } from "react-router-dom";
export default function SignUp() {
    
    return (
        <>
        <section className='signup' style={{  
        backgroundImage: `url(${background_image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }}>
        <div className='sign-up-container'>
        <h1>Sign Up</h1>
        <RegistrationForm />
        <div className='try-login'>
            <p>Already have an account? Try to <Link  to="/login"> Log in </Link></p> 
        </div>
        </div>
        </section>
        </>
    );
}
