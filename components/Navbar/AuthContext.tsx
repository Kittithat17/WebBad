"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง Context
const AuthContext = createContext<{
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (value: boolean) => void;
}>({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => {},
});

// 2. สร้าง Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdminLoggedIn");
    if (storedAdminStatus === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. สร้าง Hook เพื่อใช้ Context
export const useAuth = () => useContext(AuthContext);
