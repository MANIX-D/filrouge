import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification lors du chargement initial
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Récupérer les infos de l'utilisateur depuis l'API
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Fonction de connexion
  const login = (userData) => {
    setCurrentUser(userData);
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const authContextValue = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};