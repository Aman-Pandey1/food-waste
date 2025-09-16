import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  getDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Waste Supplier Functions
export const postWaste = async (wasteData) => {
  try {
    const docRef = await addDoc(collection(db, 'wasteListings'), {
      ...wasteData,
      createdAt: new Date(),
      status: 'available'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyListings = async (userId) => {
  try {
    const q = query(
      collection(db, 'wasteListings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, listings };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Compost Producer Functions
export const getAllListings = async () => {
  try {
    const q = query(
      collection(db, 'wasteListings'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, listings };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateListingStatus = async (listingId, status) => {
  try {
    await updateDoc(doc(db, 'wasteListings', listingId), { status });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};