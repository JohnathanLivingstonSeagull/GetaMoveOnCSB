import React, { createContext, useState, useEffect, useContext } from "react";
import { getData, storeData, removeData } from "../utils/asyncStorageUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // figure out how to check for stored user data when the app loads
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await getData("user");
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error checking user login status:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    await storeData("user", userData);
  };

  const logout = async () => {
    setUser(null);
    await removeData("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
