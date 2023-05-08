import './mainmenu.scss';
import React, { useState, useEffect , useRef, useContext } from 'react';
import { FiMenu } from "react-icons/fi";
import {Link } from "react-router-dom";
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import * as database from "../../database";
function MainMenu(props) {

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState(""); 
    const [userType, setUserType] = useState(""); 
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    let menuRef = useRef();
    const navigate = useNavigate();
    const { email, password } = props;

    const handleLogout = () => {
        // Set isLoggedIn to false in your AuthContext to update the state across your app
        setIsLoggedIn(false);

        // Redirect the user to the login page
        navigate('/');
    };
    // Load the user's first name on component mount
    useEffect(() => {
        async function loadUserInfo() {
            const { firstName, userType } = await database.getUserInfo(email, password);
            setFirstName(firstName);
            setUserType(userType); 
     
        }
        loadUserInfo();
    }, [email, password]);


    useEffect(() => {
        let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
            setOpen(false);
        }       
        };

        document.addEventListener("mousedown", handler);
        

        return() =>{
        document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <>
        <div className='menu-container' ref={menuRef}>
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
            <FiMenu/>
            </div>

                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                <ul>
                    {firstName && (
                        <li><h3>Welcome, {firstName}</h3></li>
                    )}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/wishlist">Wish list</Link></li>
                            <li><Link to="#">Manage booking</Link></li>
                            {userType=== '1' && (
                                <li><Link to="/create-profile">Airbnb listing</Link></li>
                            )}
                            <li><Link to="#" onClick={handleLogout}>Log out</Link></li>
                        </>
                        )}
                </ul>
                </div>
            </div>
        </>
    );
    }
    export default MainMenu;