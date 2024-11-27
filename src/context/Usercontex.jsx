import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUserId = localStorage.getItem("userId");
  const storedUserRole = localStorage.getItem("userRole");

  const [userId, setUserId] = useState(storedUserId);
  const [userRole, setUserRole] = useState(storedUserRole);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);
  console.log(userRole);
  

  return (
    <UserContext.Provider value={{ userId, setUserId, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
