import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
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
          id: userData?.id || 0,
          firstName: userData?.firstName || 'no name',
          email: userData?.email || 'no email',
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
      const { user } = await authService.login(credentials.email, credentials.password, credentials.rememberMe);
      setCurrentUser({
        id: user.id,
        firstName: user.first_name,
        email: user.email
      });
      return user;
    } catch (error) {
      console.error('Échec de la connexion:', error);
      return false;
    }
  };


  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { user, token } = response;
      
      // Stocker le token
      localStorage.setItem('token', token);
      
      // Mettre à jour l'utilisateur courant
      setCurrentUser({
        id: user.id,
        firstName: user.first_name,
        email: user.email,
        userType: user.user_type
      });
      
      return user;
    } catch (error) {
      console.error("Échec de l'enregistrement:", error);
      throw error; // Propager l'erreur pour la gérer dans le composant
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
  isAuthenticated: !!currentUser, 
  login,
  register,
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