import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from './config';


// Get user information
export async function getUserInfo(email, password) {
    try{
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error('No matching documents');
        }
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return { 
            id: data[0].id,
            firstName: data[0].firstName,
            userType: data[0].userType,
        };
    }
    catch(error){
        throw new Error('Failed to load database' +  error);
    }
}

export async function loadHouse() {
    try{
        const querySnapshot = await getDocs(collection(db,"house"));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        return data;
    }
    catch(error){
        throw new Error('Failed to load database');
    }
}

export async function loadHouseById(id) {
    try {
        const houseDoc = doc(db, "house", id);
        const houseSnapshot = await getDoc(houseDoc);
        if (houseSnapshot.exists()) {
            const data = houseSnapshot.data();
            return {
                ...data,
                id: houseSnapshot.id,
            };
        } else {
            throw new Error('No matching documents');
        }
    } catch(error){
        throw new Error('Failed to load house from database: ' + error);
    }
}

export async function loadFavorites(userId) {
    try {
      const favoritesRef = collection(db, "favorites");
      const q = query(favoritesRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
  
      const favoriteHouses = [];
  
      for (const doc of querySnapshot.docs) {
        const house = await loadHouseById(doc.data().houseId);
        favoriteHouses.push(house);
      }
  
      return favoriteHouses;
    } catch (error) {
      throw new Error('Failed to load favorites from database: ' + error);
    }
  }