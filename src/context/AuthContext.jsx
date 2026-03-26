import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('kb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kb_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    // Fake authentication delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Accept any login for demo
    const fakeUser = {
      id: 'user1',
      name: email.split('@')[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`
    };
    
    setUser(fakeUser);
    setIsLoading(false);
    return true;
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const fakeUser = {
      id: 'user2',
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=6366f1&color=fff`
    };
    
    setUser(fakeUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
