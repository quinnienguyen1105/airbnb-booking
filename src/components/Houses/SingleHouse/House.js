import React from 'react';
import { useState, useContext} from "react";
import './house.scss';
import Heart from "react-heart";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, saveFavorites } from '../../../database';

function House({house}) {
  const {city, pricePerNight, image} = house;
  const [active, setActive] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const { isLoggedIn, email, password } = useContext(AuthContext);

  // Format price to CAD currency
  function formatPrice(price) {
    if (price < 1000) {
      return `$${price}`;
    } else {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `$${formattedPrice}`;
    }
  }

  async function handleHeartClick() {
    if (isLoggedIn) {
      setActive(!active);
      const userInfo = await getUserInfo(email, password); // Get user info
      const userId = userInfo.id;
      if (!favorites.some((favorite) => favorite.id === house.id)) {
        setFavorites([...favorites, house]);
        saveFavorites(userId, house.id); // Add house to favorites
      } else {
        setFavorites(favorites.filter((favorite) => favorite.id !== house.id));
        
      }
      setActive(favorites.some((favorite) => favorite.id === house.id));
    } else {
      navigate('/login');
    }
  }


  return (
    <article class="house">
      <div className='house-img'>
        <Link to={`/profile/${house.id}`}>
          <img src={image} alt="" />
        </Link>
        <div className='Heart'>
          <Heart   isActive={active || favorites.some((favorite) => favorite.id === house.id)} onClick={handleHeartClick} animationScale={1.25} style={{marginBottom:'1rem'}} />
        </div>
      </div>
      <div> <h4 class="location">{city}, Ontario</h4></div>
      <div class="price"><strong>{formatPrice(pricePerNight)}</strong> night</div>
    </article>
  );
}

export default House;
