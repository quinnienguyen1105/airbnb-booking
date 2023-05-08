import { collection, addDoc,  query, where, getDocs, deleteDoc } from "firebase/firestore"; 
import {db} from './config';

//Save user when signing up
export async function save(data){
    try {
    // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), data);
      return docRef.id;
    } 
    catch(e){
        console.log("Error adding tasks!");
        return null;
    }

}

// Check user when logging in
export const LogIn = async (email, password) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        return { error: "Invalid email or password" };
      } else {
        // User found, do something here, e.g. set user state in Redux or local state
        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data();

        return { email, password, user };
      }
    } catch (error) {
      return { error: error.message };
    }
  };


  //Save user when signing up
export async function saveProfile(data){
  try {
  // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "house"), data);
    return docRef.id;
  } 
  catch(e){
      console.log("Error adding tasks!");
      return null;
  }

}

export async function saveFavorites(userId, houseId) {
  try {
    // Add a new document with a generated id to the favorites collection
    await addDoc(collection(db, "favorites"), { userId, houseId });
    return true;
  } catch(e) {
    console.log("Error adding favorites!", e);
    return false;
  }
}

export async function removeFavorite(userId, houseId) {
  try {
    // Find the favorite item with the corresponding user ID and house ID
    const favoritesRef = collection(db, "favorites");
    const q = query(favoritesRef, where("userId", "==", userId), where("houseId", "==", houseId));
    const querySnapshot = await getDocs(q);
    
    // Delete the favorite item document
    if (!querySnapshot.empty) {
      const favoriteDoc = querySnapshot.docs[0];
      await deleteDoc(favoriteDoc.ref);
      return true;
    } else {
      return false;
    }
  } catch(e) {
    console.log("Error removing favorite!", e);
    return false;
  }
}
