import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function SignupPage() {
  const [userType, setUserType] = useState('client');
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises:', formData, 'Type d\'utilisateur:', userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Partie gauche (bleu) */}
          <div className="bg-blue-600 text-white p-8 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
            <p className="text-blue-100 mb-8">
              Créez votre compte et commencez à collaborer sur des projets passionnants.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaCheck className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-white">Accès à des milliers de projets</span>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaCheck className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-white">Paiements sécurisés</span>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaCheck className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-white">Support client réactif</span>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaCheck className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-white">Profil professionnel personnalisable</span>
              </div>
            </div>
          </div>
          
          {/* Partie droite (formulaire) */}
          <div className="p-8 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Créer un compte</h2>
            
            {/* Sélection du type de compte */}
            <div className="flex mb-6 rounded-md overflow-hidden border border-gray-300">
              <button
                type="button"
                className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                  userType === 'client' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setUserType('client')}
              >
                Client
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                  userType === 'freelance' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>
              
              {/* Accepter les conditions */}
              <div className="flex items-start">
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
                    <a href="#" className="text-blue-600 hover:underline">conditions d'utilisation</a>
                    {' '} et la {' '}
                    <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
                  </label>
                </div>
              </div>
              
              {/* Bouton de soumission */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Créer un compte {userType === 'client' ? 'client' : 'freelance'}
                </button>
              </div>
              
              {/* Lien vers la connexion */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Vous avez déjà un compte ? {' '}
                <a href="#" className="font-medium text-blue-600 hover:underline">
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