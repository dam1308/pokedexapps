import { useState } from 'react';

export const useAuth = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const login = () => {
    setIsAuthenticated(true);
    
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    
    localStorage.removeItem('isAuthenticated');
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
