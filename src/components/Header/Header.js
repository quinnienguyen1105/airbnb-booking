import React, { useContext } from 'react';
import './Header.scss';
import { GoSearch } from "react-icons/go";
import MainMenu from "../MainMenu";
import { Link } from "react-router-dom";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { AuthContext } from '../../AuthContext';

function Header() {
    const { isLoggedIn, email, password } = useContext(AuthContext);
  return (
    <>
      <header className='container'>
        <Link to="/" className='title-header'><div className='title'><FaCanadianMapleLeaf/>MapleStays</div></Link>
        <div className='header-center'>
          <input 
            // onClick={() => setShowPlaceholder(!showPlaceholder)}
            type="text" 
            placeholder={"Start your search..."}
          />
          <GoSearch/>
        </div>
        <div className='header-right'>
          {isLoggedIn ? (
              <MainMenu email={email} password={password} />
          ) : (
            <>
              <div className='login'><Link to="/login">Log in</Link></div>
              <div className='signup'><Link to="/sign-up">Sign up</Link></div>
              <MainMenu />
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
