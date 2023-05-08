import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  email: '',
  password: '',
  setAuthEmail: () => {},
  setAuthPassword: () => {},
});

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setAuthEmail] = useState('');
  const [password, setAuthPassword] = useState('');

  function handleLogin(email, password) {
    // Perform login logic here...
    setAuthEmail(email);
    setAuthPassword(password);
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, password, setAuthEmail, setAuthPassword,  handleLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
