import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
// import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [userType, setUserType] = useState('client');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const registerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        user_type: userType
      };
      
      // Appel du service d'authentification
      const userData = await register(registerData);
      console.log('Inscription réussie:', userData);
      
      // Si l'inscription réussit, on redirige vers la page d'acceuil
      if (userType === 'freelance') {
        navigate('/');
      } else {
        navigate('/dashboard-client');
      }
      
      // Redirection ou mise à jour de l'état de l'application
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setError(
        error.response?.data?.message || 
        'Une erreur est survenue lors de l\'inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
    {/* Conteneur principal */}
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 relative z-10">
      {/* Reflet subtil au sommet */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100"></div>
      
      <div className="flex flex-col md:flex-row">
        {/* Partie gauche (bleue) */}
        <div className="bg-blue-600 text-white p-8 md:w-1/2 rounded-l-2xl relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Rejoignez notre communauté</h2>
          <p className="text-blue-50 mb-8">
            Créez votre compte et commencez à collaborer sur des projets passionnants.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start bg-blue-700/50 p-3 rounded-lg border border-blue-400/30">
              <div className="flex-shrink-0 mt-1">
                <FaCheck className="h-5 w-5 text-blue-200" />
              </div>
              <span className="ml-3 text-white">Accès à des milliers de projets</span>
            </div>
            
            <div className="flex items-start bg-blue-700/50 p-3 rounded-lg border border-blue-400/30">
              <div className="flex-shrink-0 mt-1">
                <FaCheck className="h-5 w-5 text-blue-200" />
              </div>
              <span className="ml-3 text-white">Collaborez avec des experts</span>
            </div>
            
            <div className="flex items-start bg-blue-700/50 p-3 rounded-lg border border-blue-400/30">
              <div className="flex-shrink-0 mt-1">
                <FaCheck className="h-5 w-5 text-blue-200" />
              </div>
              <span className="ml-3 text-white">Support premium 24/7</span>
            </div>
          </div>
        </div>
        
        {/* Partie droite (formulaire) */}
        <div className="p-8 md:w-1/2 bg-white rounded-r-2xl relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer un compte</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 shadow">
              {error}
            </div>
          )}
          
          {/* Sélection du type de compte */}
          <div className="flex mb-6 rounded-xl overflow-hidden border border-gray-200 shadow">
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-all ${
                userType === 'client' 
                  ? 'bg-blue-600 text-white shadow-inner' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('client')}
            >
              Client
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-all ${
                userType === 'freelance' 
                  ? 'bg-blue-600 text-white shadow-inner' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('freelance')}
            >
              Freelance
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom et prénom */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="votre@email.com"
              />
            </div>
            
            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Masquer" : "Afficher"}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Au moins 8 caractères avec des lettres, chiffres et caractères spéciaux
              </p>
            </div>
            
            {/* Confirmer mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>
            
            {/* Accepter les conditions */}
            <div className="flex items-start p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                  J'accepte les {' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">conditions d'utilisation</a>
                  {' '} et la {' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">politique de confidentialité</a>
                </label>
              </div>
            </div>
            
            {/* Bouton de soumission */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md"
              >
                {loading ? 'Création en cours...' : `Créer un compte ${userType === 'client' ? 'client' : 'freelance'}`}
              </button>
            </div>
            
            {/* Lien vers la connexion */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Vous avez déjà un compte ? {' '}
              <a href="connexion" className="font-medium text-blue-600 hover:text-blue-800 underline">
                Connexion
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}