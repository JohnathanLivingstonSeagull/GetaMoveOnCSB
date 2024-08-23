import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const API_URL = "https://your-api-url.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  await AsyncStorage.setItem("token", token);
  return userCredential;
};

export const register = async (name, email, password, userType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addDoc(collection(db, "users"), {
    uid: userCredential.user.uid,
    name,
    email,
    userType,
  });
  const token = await userCredential.user.getIdToken();
  await AsyncStorage.setItem("token", token);
  return userCredential;
};

export const logout = async () => {
  await signOut(auth);
  await AsyncStorage.removeItem("token");
};

export const createOrder = async (orderData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated");

  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    userId: user.uid,
    status: "pending",
    createdAt: new Date(),
  });
  return { id: docRef.id };
};

export const getCustomerOrders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated");

  const q = query(collection(db, "orders"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAvailableOrders = async () => {
  const q = query(collection(db, "orders"), where("status", "==", "pending"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const acceptOrder = async (orderId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated");

  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status: "accepted",
    driverId: user.uid,
  });
};

export default api;
