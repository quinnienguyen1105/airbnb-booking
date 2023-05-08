import React, {useState, useContext } from 'react';
import './LoginForm.scss';
import { LogIn } from '../../../database/write';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../AuthContext";

function LoginForm() {
    
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);

    const navigate = useNavigate();
    const { setIsLoggedIn, setAuthEmail, setAuthPassword} = useContext(AuthContext);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }

    }

    const validateForm = () => {
        const errors = [];
        
        // Check if required fields are empty
        if (!email) {
          errors.push("Email is required");
        }
        if (!password) {
          errors.push("Password is required");
        }

        setValidationErrors(errors);
        
        return errors.length === 0;
    };

    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
          const result = await LogIn(email, password);
          console.log(result);
          if (result.error) {
            setValidationErrors([result.error]);
          } else {
            setIsLoggedIn(true);
            setAuthEmail(email); // Set the email in AuthContext
            setAuthPassword(password);
            console.log('Log in successful!');
            navigate("/");
          }
        }
      }

    return(
        <div className="form">
            <div className="form-body">
                {validationErrors.includes("Invalid email or password") && (
                    <span className="error-message">Invalid email or password</span>
                )}
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Email is required") && <span className="error-message">Email is required</span>}
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)}/>
                    {validationErrors.includes("Password is required") && <span className="error-message">Password is required</span>}
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Login</button>
            </div>
        </div>
       
    )       
}

export default LoginForm;
