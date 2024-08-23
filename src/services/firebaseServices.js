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

// User Authentication
export const registerUser = async (email, password, name, userType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    email,
    userType,
  });
  return user;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

// Order Management
export const createOrder = async (orderData) => {
  return addDoc(collection(db, "orders"), orderData);
};

export const getOrders = async (userId, userType) => {
  const ordersRef = collection(db, "orders");
  const q =
    userType === "customer"
      ? query(ordersRef, where("customerId", "==", userId))
      : query(ordersRef, where("driverId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);
  return updateDoc(orderRef, { status });
};
