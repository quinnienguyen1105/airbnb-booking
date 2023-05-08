import React, {useState} from 'react';
import './RegistrationForm.scss';
import * as database from "../../../database";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/usersSlice";
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [userType, setUserType] = useState("1"); // set the initial value to "1"
    const [validationErrors, setValidationErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }
    
    const handleUserTypeChange = (e) => {
        setUserType(e.target.value); // set the value of userType to the selected value
    }

    const validateForm = () => {
        const errors = [];
        
        // Check if required fields are empty
        if (!firstName) {
          errors.push("First name is required");
        }
        if (!lastName) {
          errors.push("Last name is required");
        }
        if (!email) {
          errors.push("Email is required");
        }
        if (!password) {
          errors.push("Password is required");
        }
        if (!confirmPassword) {
          errors.push("Confirm password is required");
        }
        
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
          errors.push("Email is invalid");
        }
        
        // Check if password and confirm password match
        if (password !== confirmPassword) {
          errors.push("Passwords do not match");
        }
        
        setValidationErrors(errors);
        
        return errors.length === 0;
    };

    const handleSubmit  = async () => {
        const isValid = validateForm();
        if (isValid) {
            const data = {firstName, lastName, email, password, userType};
            const saveId = await database.save(data);
            data.id = saveId;
            dispatch(addUser(data));
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUserType('1');
            navigate('/login');
        }
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName"/>
                    {validationErrors.includes("First name is required") && <span className="error-message">First name is required</span>}
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Last name is required") && <span className="error-message">Last name is required</span>}
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Email is required") && <span className="error-message">Email is required</span>}
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Password is required") && <span className="error-message">Password is required</span>}
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Confirm password is required") && <span className="error-message">Confirm password is required</span>}
                </div>
                <div className="confirm-host">
                    <label className="form__label" for="confirmPassword">Register As A </label>
                    <select id="userType" value={userType} onChange={(e) => handleUserTypeChange(e)}>  
                        <option value="1" defaultChecked>Host</option>
                        <option value="0">Non-Host</option>
                    </select>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
            </div>
        </div>
       
    )       
}

export default RegistrationForm