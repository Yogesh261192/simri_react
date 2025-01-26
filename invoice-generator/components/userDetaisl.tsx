import React, { createContext, useState } from 'react';

const UserContext = createContext({email:''});


 const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContext, UserProvider }