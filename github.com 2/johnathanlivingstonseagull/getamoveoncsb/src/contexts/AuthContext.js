import React, { createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await AsyncStorage.getItem("userData");
        setUser(
          userData
            ? JSON.parse(userData)
            : { uid: firebaseUser.uid, email: firebaseUser.email }
        );
      } else {
        setUser(null);
        await AsyncStorage.removeItem("userData");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
