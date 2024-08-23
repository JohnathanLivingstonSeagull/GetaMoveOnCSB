import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

// User Auth
export const registerUser = async (email, password, name, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      userType,
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Failed to logout: ${error.message}`);
  }
};

export const createOrder = async (orderData) => {
  try {
    return await addDoc(collection(db, "orders"), orderData);
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};
// Order Management
export const getOrders = async (userId, userType) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = userType === "customer"
      ? query(ordersRef, where("customerId", "==", userId))
      : query(ordersRef, where("driverId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Failed to get orders: ${error.message}`);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
};