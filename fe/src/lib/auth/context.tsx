"use client";
//this is the global state for auth

import { createContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "./api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };
 return (
     <AuthContext.Provider
      value={{
        user,
        isLoaded: !loading,
        isSignedIn: !!user,
        logout: handleLogout,
        refresh: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
 )
};
