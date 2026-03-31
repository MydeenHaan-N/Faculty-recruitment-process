import React, { createContext, useState, useContext, ReactNode } from 'react';


interface User {
  department: string
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useSelectedUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a UserProvider');
  }
  return context;
};


interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
