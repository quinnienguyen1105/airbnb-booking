import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Wishlist from './pages/WishList';
import CreateProfile from './pages/CreateProfile';
import HouseDetails from './pages/HouseDetails';
import { AuthProvider } from './AuthContext';
import { useDispatch } from 'react-redux';
import { showHouses } from "./redux/houseSlice";
import  * as database from "./database";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      (async() => {
          const data = await database.loadHouse();
          dispatch(showHouses(data));
      })();
  }, [dispatch]);

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile/:id" element={<HouseDetails/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
