import React, { useRef, useContext, useEffect } from 'react';
import "./createprofile.scss";
import CreateProfileForm from "../../components/CreateProfile/CreateProfileForm";
import create_profile from "../../assets/image/create_profile_thumbnail.png";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoMdImages } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreateProfilePage() {
    const profileFormRef = useRef(null);
    const navigate = useNavigate();

    const { isLoggedIn} = useContext(AuthContext);
    

    const handleCreateNowClick = () => {
        profileFormRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <section>
                <div className='container'>
                    <div className='introduction'>
                        <div className='intro-left'> 
                            <img src={create_profile} alt='create-profile-cover' />
                        </div>
                        <div className='intro-right'> 
                            <h1>Invest in your future, invest in your home with Airbnb hosting.</h1>
                            <p>Are you looking to earn some extra income from your home? 
                                Become an Airbnb host and start renting out your space to travelers from around the world. With our easy-to-use platform and helpful support team, 
                                listing your home on Airbnb is a great way to turn your space into a source of extra income.</p>
                            <button className='button-scroll'  onClick={handleCreateNowClick}>Ready to make your listing!</button>
                        </div>
                    </div>
                    <div className='starting-card'>
                        <h1>It's easy to get started on MapleStays</h1>
                        <div className='starting-cards'>
                            <article>
                                <span class="starting_icon">
                                    <HiOutlineChatBubbleOvalLeftEllipsis/>
                                </span>
                                <h3>Tell us about your place</h3>
                                <p>Share some basic info like where it is and how many guests can stay.</p>
                            </article>
                            <article>
                                <span class="starting_icon">
                                    <IoMdImages/>
                                </span>
                                <h3>Make it stand out</h3>
                                <p>Add wonderful photo, title, description. We will help you out! </p>
                            </article>
                            <article>
                                <span class="starting_icon">
                                    <RiMoneyDollarCircleLine/>
                                </span>
                                <h3>Finish up and publish</h3>
                                <p>By setting starting price and publish your listing!</p>
                            </article>
                        </div>
                    </div>
                    <div className='create-profile-form' ref={profileFormRef}>
                        <h2>List Your Home on Airbnb: Create Your Host Profile</h2>
                        <CreateProfileForm />
                    </div>
                </div>
            </section>
        </>
    );
}
