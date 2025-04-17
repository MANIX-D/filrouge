import logo from '../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row justify-between items-start py-12 gap-12">
          
          {/* Section Logo + Description */}
          <div className="flex-1 max-w-sm">
            <h2 className="text-2xl font-bold">Skills Crafters Pro</h2>
            <p className="mt-4 text-blue-100 text-sm leading-relaxed">
              La plateforme qui connecte les freelances et les clients pour des projets réussis.
            </p>
          </div>

          {/* Liens */}
          <div className="flex-1 w-full flex flex-wrap justify-between gap-8">
            {/* Freelances */}
            <div className="min-w-[150px]">
              <h3 className="text-base font-semibold">Pour les Freelances</h3>
              <ul className="mt-3 space-y-2">
                {['Créer un profil', 'Trouver des projets', 'Tableau de bord', 'Paiements'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-100 hover:text-white text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clients */}
            <div className="min-w-[150px]">
              <h3 className="text-base font-semibold">Pour les Clients</h3>
              <ul className="mt-3 space-y-2">
                {['S\'inscrire', 'Publier un projet', 'Trouver des freelances', 'Tableau de bord'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-100 hover:text-white text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aide & Légal */}
            <div className="min-w-[200px]">
              <h3 className="text-base font-semibold">Aide & Support</h3>
              <ul className="mt-3 space-y-2">
                {['FAQ', 'Contact', 'Conditions d\'utilisation', 'Politique de confidentialité'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-100 hover:text-white text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-blue-500 py-6 gap-4">
          <p className="text-sm text-blue-200 text-center sm:text-left">
            © 2025 Skills Crafters Pro. Tous droits réservés.
          </p>
          <img src={logo} alt="logo" className="h-8 object-contain" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
