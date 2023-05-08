import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./housedetail.scss";
import { loadHouseById } from '../../database';
import { AiFillStar } from "react-icons/ai";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    loadHouseById(id)
      .then(data => setHouse(data))
      .catch(error => console.log(error));
  }, [id]);

  // Format price to CAD currency
  function formatPrice(price) {
    if (price < 1000) {
      return `$${price}`;
    } else {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `$${formattedPrice}`;
    }
  }

  // Calculate total price based on selected date range
  function calculateTotalPrice() {
    const startDate = selectedRange.startDate.getTime();
    const endDate = selectedRange.endDate.getTime();
    const nights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    return nights * house.pricePerNight;
  }

  // Handle date range selection
  function handleSelect(range) {
    setSelectedRange(range.selection);
  }

  return (
    <div className='container'>
      <div className="house-details">
        {house ? (
          <div>
            <div><h2>{house.title}</h2></div>
            <div>
              <span className='rating'><AiFillStar/> 4.69</span>
              <span className='location'>{house.city}, Ontario Canada</span>
            </div>
            <div><img src={house.image} alt='' /></div>
            <div className='main-content'>
              <div className='left'>
                <div className='facilities'>
                  <div>10 guests</div>
                  <div>4 bedrooms</div>
                  <div>7 beds</div>
                  <div>3 baths</div>
                </div>
                <div className='about-house'>
                    <h3>About This Space</h3>
                    <p><strong>The space: </strong>
                    This apartment has a truly great vibe.
                    Features include, high speed internet, WIF, 2 Smart HD tv's, gas log fireplace, sono's sound system. 15 min walk to downtown. </p>
                    <p><strong>Guest access: </strong>
                    This is a triplex and each apartment is completely separate with individual keypad access for each apartment.
                    Apartment comes with two parking spots both located at the North side of the parking lot.
                    Come down the North path to the main door, enter with keypad, once in the lobby, you'll see two black doors, yours is the one on the right also with a keypad for access.
                    Private outside deck with BBQ, table and chairs.
                    </p>
                </div>
              </div>
              <div className='right'>
                <div className='price'>Price Per Night: <strong>{formatPrice(house.pricePerNight)}</strong> night</div>
                <div className='date-range-picker'>
                  <DateRangePicker
                    ranges={[selectedRange]}
                    onChange={handleSelect}
                  />
                  <div className='total-price'>Total price: <strong>{formatPrice(calculateTotalPrice())}</strong></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading house details...</p>
        )}
      </div>
    </div>
  );
}
