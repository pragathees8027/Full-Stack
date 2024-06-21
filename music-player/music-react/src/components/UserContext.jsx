import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const LoggedUser = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username) => {
    setCurrentUser(username);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
