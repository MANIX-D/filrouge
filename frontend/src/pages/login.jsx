import { useState } from 'react';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Appel du service d'authentification
      const userData = await authService.login(email, password, rememberMe);
      console.log('Connexion réussie:', userData);
      
      // Redirection ou mise à jour de l'état de l'application
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(
        error.response?.data?.message || 
        'Une erreur est survenue lors de la connexion'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre compte Skills Crafters </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Mot de passe */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Se souvenir de moi */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>

        {/* Le reste du composant reste inchangé */}
        
      </div>
    </div>
  );
}