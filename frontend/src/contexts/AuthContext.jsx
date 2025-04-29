import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await authService.getCurrentUser();
        setCurrentUser({
          id: userData.id,
          firstName: userData.firstName,
          email: userData.email,
          // Ajoutez d'autres propriétés nécessaires
        });
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (credentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('token', token);
      setCurrentUser({
        id: user.id,
        firstName: user.firstName,
        email: user.email
      });
      return true;
    } catch (error) {
      console.error('Échec de la connexion:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    authService.logout(); // Si nécessaire pour les appels API
  };

  // const value = {
  //   currentUser,
  //   loading,
  //   isAuthenticated: !!currentUser,
  //   login,
  //   logout
  // };
  // Dans votre AuthContext.js
const value = {
  currentUser,
  loading,
  isAuthenticated: !!currentUser && !loading, 
  login,
  logout
};

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};