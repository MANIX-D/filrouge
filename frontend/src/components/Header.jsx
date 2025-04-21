import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <span className="text-blue-600 font-bold text-lg">Skills Crafters</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link to="#" className="text-gray-600 hover:text-blue-600 transition duration-300">Projets</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600 transition duration-300">Freelances</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600 transition duration-300">À propos</Link>

            <div className="flex items-center space-x-4 ml-6">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-300">Connexion</Link>
              <Link 
                to="#" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Inscription
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              <svg 
                className="w-6 h-6 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-6 rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link to="#" className="text-gray-700 hover:text-blue-700 transition">Projets</Link>
              <Link to="#" className="text-gray-700 hover:text-blue-700 transition">Freelances</Link>
              <Link to="#" className="text-gray-700 hover:text-blue-700 transition">À propos</Link>

              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex flex-col space-y-2 pt-4">
                <Link to="#" className="text-gray-600 hover:text-blue-700 text-center transition">Connexion</Link>
                <Link 
                  to="#" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center transition"
                >
                  Inscription
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
