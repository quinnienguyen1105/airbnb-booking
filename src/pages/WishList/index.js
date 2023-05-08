import React, { useState, useEffect, useContext } from 'react';
import { getUserInfo, loadFavorites, removeFavorite } from '../../database';
import House from "../../components/Houses/SingleHouse/House";
import { AuthContext } from '../../AuthContext'; 
import './wishlist.scss';

export default function WishList() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const { email, password } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const userInfo = await getUserInfo(email, password); // replace with actual email and password
        setUser(userInfo);
        const userFavorites = await loadFavorites(userInfo.id);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
    fetchData();
  }, [email, password]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(user.id, favoriteId);
      setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="container">
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className='wishlist-container'>
            <h2>{user.firstName}'s Wish List</h2>
        <div className='wishlist'>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-house">
                <House house={favorite} />
                <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove from favorites</button>
              </div>
            ))
          ) : (
            <p>You have no favorite houses yet.</p>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
