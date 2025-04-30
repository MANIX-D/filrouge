import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "Manix",
    last_name: "Yotto",
    title: "Développeuse Full Stack",
    location: "Douala, Cameroun",
    rating: 4.9,
    reviewCount: 48,
    projectsCompleted: 21,
    memberSince: "Janvier 2025",
    dailyRate: "25000FCFA/Jour",
    about: "Développeur Full Stack passionné avec plus de 3 ans d'expérience dans la création architectures cloud. J'aime relever des défis techniques et créer des solutions innovantes pour mes clients.",
    skills: [
      { name: "React", level: "Expert" },
      { name: "Node.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "MongoDB", level: "Avancé" },
      { name: "AWS", level: "Avancé" },
      { name: "React Native", level: "Intermédiaire" }
    ],
    languages: [
      { name: "Français", level: "Natif" },
      { name: "Anglais", level: "Intermédiaire" }
    ],
    education: [
      {
        institution: "Institut Universitaire de la Côte",
        degree: "licence en Ingénierie Logicielle",
        year: "2023"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        year: "2023"
      }
    ],
    portfolio: [
      {
        id: 1,
        title: "Application E-commerce React",
        description: "Application complète avec panier, paiement et gestion des produits",
        image: "/api/placeholder/400/320",
        technologies: ["React", "Node.js", "MongoDB"]
      },
      {
        id: 2,
        title: "Dashboard",
        description: "Interface d'analyse de données en temps réel avec graphiques",
        image: "/api/placeholder/400/320",
        technologies: ["React", "TypeScript", "D3.js"]
      },
      {
        id: 3,
        title: "Application Mobile Fitness",
        description: "Application de suivi d'entraînement et de nutrition",
        image: "/api/placeholder/400/320",
        technologies: ["React Native", "Firebase"]
      }
    ]
  });

  // Simuler la vérification de l'utilisateur actuel
  useEffect(() => {
    // Dans une application réelle, cela viendrait d'une API
    setIsCurrentUser(true);
  }, []);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 mt-15">
      <div className="max-w-6xl mx-auto">
        {/* Card Profil principal */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
             <div className='flex flex-row space-x-2'>
                 <h1 className="text-2xl font-bold mb-1">{profile.first_name}</h1>
                 <h1 className="text-2xl font-bold mb-1">{profile.last_name}</h1>
             </div>
              <p className="text-gray-600 mb-2">{profile.title}</p>
              
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-600">{profile.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1">{profile.rating} ({profile.reviewCount} avis)</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1">{profile.projectsCompleted} projets réalisés</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1">Membre depuis {profile.memberSince}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <div 
                  className={`px-3 py-1 rounded-full text-sm ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} ${isCurrentUser ? 'cursor-pointer hover:opacity-80' : ''} flex items-center`}
                  onClick={isCurrentUser ? toggleAvailability : undefined}
                >
                  <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  {isAvailable ? 'Disponible' : 'Indisponible'}
                </div>
                <div className="text-gray-700 font-medium">{profile.dailyRate}</div>
              </div>
            </div>
            
            {isCurrentUser && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4 md:mt-0 transition-colors duration-300">
                Modifier le profil
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section À propos */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">À propos</h2>
              <p className="text-gray-700">{profile.about}</p>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.portfolio.map((project) => (
                  <div 
                    key={project.id} 
                    className="border rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Compétences */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Compétences</h2>
              <div className="space-y-3">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{skill.name}</span>
                    <span 
                      className={`text-sm px-2 py-1 rounded ${
                        skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                        skill.level === 'Avancé' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Langues */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Langues</h2>
              <div className="space-y-3">
                {profile.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{language.name}</span>
                    <span 
                      className={`text-sm px-2 py-1 rounded ${
                        language.level === 'Natif' ? 'bg-green-100 text-green-800' :
                        language.level === 'Courant' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formation */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Formation</h2>
              {profile.education.map((edu, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              {profile.certifications.map((cert, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-600">{cert.organization}</p>
                  <p className="text-gray-500 text-sm">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;