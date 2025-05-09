import { useState, useEffect } from 'react';
import { User, Briefcase, Star, CheckCircle } from 'lucide-react';

// Composant pour l'animation des chiffres
function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrameId;
    
    // Fonction d'animation
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculer la valeur actuelle en fonction du temps écoulé
      // const percentage = Math.min(progress / duration, 1);
      // const currentCount = Math.floor(percentage * end);
      
      // setCount(currentCount);
      
      // Continuer l'animation si elle n'est pas terminée
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    // Démarrer l'animation
    animationFrameId = requestAnimationFrame(updateCount);
    
    // Nettoyer l'animation lors du démontage du composant
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);
  
  return <>{count.toLocaleString()}</>;
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full mt-15">
      {/* Hero Section */}
      <div className="w-full bg-blue-600 text-white py-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">À propos de Skills Crafters</h1>
        <p className="text-xl max-w-2xl text-center">
          La plateforme qui connecte les meilleurs talents freelances avec des projets passionnants
        </p>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Freelances actifs */}
        <div className="flex flex-col items-center">
          <User className="text-blue-600 mb-4" size={48} />
          <h2 className="text-4xl font-bold">
            <CountUp end={10000} duration={1500} />+
          </h2>
          <p className="text-xl text-gray-600">Freelances actifs</p>
        </div>

        {/* Projets réalisés */}
        <div className="flex flex-col items-center">
          <Briefcase className="text-blue-600 mb-4" size={48} />
          <h2 className="text-4xl font-bold">
            <CountUp end={25000} duration={1500} />+
          </h2>
          <p className="text-xl text-gray-600">Projets réalisés</p>
        </div>

        {/* Taux de satisfaction */}
        <div className="flex flex-col items-center">
          <Star className="text-blue-600 mb-4" size={48} />
          <h2 className="text-4xl font-bold">
            <CountUp end={98} duration={1500} />%
          </h2>
          <p className="text-xl text-gray-600">Taux de satisfaction</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">Pourquoi choisir Skills Crafters?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pour les freelances */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Pour les freelances</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Trouvez des projets qui correspondent à vos compétences</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Développez votre portefeuille client</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Gérez votre activité en toute autonomie</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Bénéficiez d'une visibilité accrue</p>
                </div>
              </div>
            </div>
            
            {/* Pour les clients */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Pour les clients</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Accédez à des talents qualifiés</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Publiez vos projets gratuitement</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Gérez vos projets efficacement</p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Trouvez le bon freelance rapidement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-6xl py-16 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Questions fréquentes</h2>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold mb-2">Comment fonctionne Skills Crafters?</h3>
            <p className="text-gray-700">
            Skills Crafters met en relation les entreprises et les freelances. Les clients publient leurs projets, les freelances postulent, et vous choisissez le meilleur profil pour votre projet.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Quels types de freelances peut-on trouver ?</h3>
            <p className="text-gray-700">
              Notre plateforme accueille des freelances dans de nombreux domaines : développement web, design, marketing digital, rédaction, traduction, et bien d'autres encore.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Comment sont sélectionnés les freelances ?</h3>
            <p className="text-gray-700">
              Chaque freelance passe par un processus de vérification. Nous vérifions leurs compétences, leur expérience et leurs réalisations pour garantir la qualité des services.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Quels sont les frais d'utilisation ?</h3>
            <p className="text-gray-700">
              L'inscription et la publication de projets sont gratuites. Des frais de service s'appliquent uniquement lorsqu'un projet est attribué à un freelance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}