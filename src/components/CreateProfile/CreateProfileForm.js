import React, {useState, useContext, useEffect} from 'react';
import './CreateProfileForm.scss';
import { AuthContext } from '../../AuthContext';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addHouse } from "../../redux/houseSlice";
import * as database from "../../database";
// import {storage} from "../../database/config";
// import {ref, uploadBytes } from "firebase/storage";

function CreateProfileForm() {
    
    const [title, setTitle] = useState(null);
    const [pricePerNight, setPricePerNight] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState("Toronto");
    const [image, setImage] = useState(null);
    const [typeOfProperty, setTypeOfProperty] = useState("aframes");
    const [validationErrors, setValidationErrors] = useState([]);
    const [id, setId] = useState("");

    const { email, password } = useContext(AuthContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      async function loadUserInfo() {
          const {id} = await database.getUserInfo(email, password);
          setId(id);
   
      }
      loadUserInfo();
  }, [email, password]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
      
        if (id === "title") {
          setTitle(value);
        } 
        if (id === "pricePerNight") {
          setPricePerNight(value);
        }
        if (id === "address") {
          setAddress(value);
        }
        if (id === "city") {
          setCity(value);
        }
        if (id === "image") {
          setImage(value);
        }
        if (id === "typeOfProperty") {
          setTypeOfProperty(value);
        }
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (loadEvent) => {
          setImage(loadEvent.target.result);
        }
    }
      const validateForm = () => {
        const errors = [];
        
        if (!title) {
          errors.push("Title is required");
        }
        if (!pricePerNight) {
          errors.push("Price per night is required");
        }
        if (!address) {
          errors.push("Address is required");
        }
        
        if (!city) {
            errors.push("City is required");
          }
          if (!image) {
            errors.push("Image is required");
          }
          
          // Check if pricePerNight is a valid number
          const priceRegex = /^\d+(\.\d{1,2})?$/;
          if (pricePerNight && !priceRegex.test(pricePerNight)) {
            errors.push("Price per night must be a valid number");
          }
          
        setValidationErrors(errors);
        
        return errors.length === 0;
      };

      const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
          //id is userId
          const data = {id, title, pricePerNight, address, city, image, typeOfProperty };
          const saveProfile = await database.saveProfile(data);
          data.id = saveProfile;
          // const imageRef = ref(storage, `images/${image.name}`);
          // uploadBytes(imageRef, image).then(()=> {
          //   console.log("Image upload!");
          // })
          dispatch(addHouse(data));
          setTitle(null);
          setPricePerNight(null);
          setAddress(null);
          setCity("Toronto");
          setImage(null);
          setTypeOfProperty("aframes");
          setValidationErrors([]);
          navigate("/");
        }
      };

    return(
        <div className="form">
            <div className="form-body">
                <div className="title">
                    <label className="form__label" for="title"> Title </label>
                    <input className="form__input" type="text" value={title} onChange = {(e) => handleInputChange(e)} id="title"/>
                    {validationErrors.includes("Title is required") && <span className="error-message">Title is required</span>}
                </div>
                <div className="pricePerNight">
                    <label className="form__label" for="pricePerNight">Price per night (CAD): </label>
                    <input  type="number" name="pricePerNight" id="pricePerNight" value={pricePerNight}  className="form__input" onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Price per night is required") && <span className="error-message">Price per night is required</span>}
                </div>
                <div className="address">
                    <label className="form__label" for="address">Address </label>
                    <input   type="text" id="address" className="form__input" value={address} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Address is required") && <span className="error-message">Address is required</span>}
                </div>
                <div className="city-selector">
                    <label className="form__label" for="city">City</label>
                    <select id="city" value={city} onChange={(e) => handleInputChange(e)}>
                        <option value="Toronto" defaultChecked>Toronto</option>
                        <option value="Ottawa">Ottawa</option>
                        <option value="Hamilton">Hamilton</option>
                        <option value="London">London</option>
                        <option value="Kitchener">Kitchener</option>
                        <option value="Waterloo">Waterloo</option>
                        <option value="Windsor">Windsor</option>
                        <option value="Mississauga">Mississauga</option>
                        <option value="Markham">Markham</option>
                        <option value="Vaughan">Vaughan</option>
                    </select>
                    </div>

                <div className="image">
                    <label className="form__label" for="image">Image:</label>
                    <input type="file" name="image" id="image" accept="image/*" onChange={(e) => handleImageChange(e)} />
                    {validationErrors.includes("Image is required") && <span className="error-message">Image is required</span>}
                </div>
                <div className="typeOfProperty">
                    <label className="form__label" for="typeOfProperty">Choose a type of your property: </label>
                    <select id="typeOfProperty" value={typeOfProperty} onChange={(e) => handleInputChange(e)}>  
                        <option value="aframes" defaultChecked>A frames</option>
                        <option value="apartment">Apartment</option>
                        <option value="arctic">Arctic</option>
                        <option value="cabins">Cabins</option>
                        <option value="camping">Camping</option>
                        <option value="tinyhouse">Tiny House</option>
                        <option value="countryside">Countryside</option>
                        <option value="lake">Lake</option>
                        <option value="amazingpool">Amazing Pool</option>
                        <option value="mainson">Mainson</option>
                    </select>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Add to the listing!</button>
            </div>
        </div>
       
    )       
}

export default CreateProfileForm