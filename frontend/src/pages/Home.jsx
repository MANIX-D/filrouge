import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Clock, DollarSign } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Images pour le carrousel hero
  const images = [
    '/images/Headercaroussel1.png',
    '/images/Headercaroussel2.png',
    '/images/Headercaroussel3.png',
    '/images/Headercaroussel4.png',
    '/images/Headercaroussel5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // change toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyage
  }, []);

  // Données des projets
  const [projets] = useState([
    {
      id: 1,
      title: 'Site e-commerce pour une boutique locale',
      description: 'Création d\'un site e-commerce complet avec panier, paiement en ligne, et gestion des commandes',
      budget: 2750,
      deadline: '2025-12-15',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      publishedDate: '2025-05-01',
      fullDescription: 'Création d\'un site e-commerce complet pour une boutique locale. Le site doit inclure une interface utilisateur intuitive, un système de panier fonctionnel, un processus de paiement sécurisé via Stripe, et un tableau de bord d\'administration pour gérer les produits et les commandes. Le site doit être responsive et optimisé pour les mobiles.'
    },
    {
      id: 2,
      title: 'Application mobile de livraison de repas',
      description: 'Développement d\'une application mobile pour un service de livraison de repas local avec géolocalisation',
      budget: 3850,
      deadline: '2025-11-30',
      skills: ['React Native', 'Firebase', 'Google Maps API'],
      publishedDate: '2025-04-20',
      fullDescription: 'Développement d\'une application mobile native pour iOS et Android destinée à un service de livraison de repas local. L\'application doit permettre aux utilisateurs de parcourir les restaurants à proximité, commander des repas, suivre la livraison en temps réel grâce à la géolocalisation, et payer directement via l\'application.'
    },
    {
      id: 3,
      title: 'Identité visuelle d\'une entreprise',
      description: 'Création d\'un nouveau logo, charte graphique et templates pour une startup dans le domaine de la santé',
      budget: 1320,
      deadline: '2025-10-15',
      skills: ['Design graphique', 'Illustrator', 'Photoshop'],
      publishedDate: '2025-04-20',
      fullDescription: 'Refonte complète de l\'identité visuelle d\'une startup innovante dans le secteur de la santé. Le projet comprend la création d\'un nouveau logo moderne et mémorable, une charte graphique complète, et divers templates pour les supports de communication (cartes de visite, papier à en-tête, présentations PowerPoint, etc.).'
    },
    {
      id: 4,
      title: 'Développement d\'un tableau de bord',
      description: 'Création d\'un tableau de bord interactif pour visualiser les données de vente et marketing d\'une entreprise',
      budget: 1980,
      deadline: '2025-11-10',
      skills: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      publishedDate: '2025-04-15',
      fullDescription: 'Développement d\'un tableau de bord analytique interactif permettant de visualiser et d\'analyser les données de vente et de marketing d\'une entreprise. L\'interface doit être intuitive avec des graphiques dynamiques, des filtres personnalisables, et des rapports exportables. Le dashboard doit être accessible via un navigateur web.'
    }
  ]);

  // Configuration du carrousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Fonction pour formater les dates en temps relatif
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInMinutes > 0) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  };

  // Mise à jour des timestamps en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setProjets(currentProjets => [...currentProjets]); // Forcer une mise à jour
    }, 60000); // Rafraîchir chaque minute
    return () => clearInterval(interval);
  }, []);

  // Données pour les freelances populaires avec état pour les notes dynamiques
  const [freelances, setFreelances] = useState([
    {
      id: 1,
      nom: "Manix Yotto",
      titre: "Développeur Full Stack",
      note: 4.9,
      avis: 48,
      skills: ["React", "Node.js", "MongoDB"],
      avatarUrl: "https://randomuser.me/api/portraits/men/83.jpg"
    },
    {
      id: 2,
      nom: "Aimé Poka",
      titre: "Designer UX/UI",
      note: 4.8,
      avis: 36,
      skills: ["Figma", "Adobe XD", "Sketch"],
      avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 3,
      nom: "Sarah Kamdem",
      titre: "Rédactrice Web & SEO",
      note: 4.7,
      avis: 52,
      skills: ["Copywriting", "SEO", "Marketing de contenu"],
      avatarUrl: "https://randomuser.me/api/portraits/women/92.jpg"
    },
    {
      id: 4,
      nom: "Mario Fotso",
      titre: "Développeur Mobile",
      note: 4.9,
      avis: 41,
      skills: ["React Native", "Flutter", "Swift"],
      avatarUrl: "https://randomuser.me/api/portraits/men/59.jpg"
    },
  ]);

  // Fonction pour simuler l'ajout d'un nouvel avis (pour démonstration)
  const ajouterAvis = (freelanceId, nouvelleNote) => {
    setFreelances(prevFreelances => {
      return prevFreelances.map(freelance => {
        if (freelance.id === freelanceId) {
          const totalAvis = freelance.avis + 1;
          const ancienneNote = freelance.note * freelance.avis;
          const nouvelleNoteGlobale = ((ancienneNote + nouvelleNote) / totalAvis).toFixed(1);
          
          return {
            ...freelance,
            note: parseFloat(nouvelleNoteGlobale),
            avis: totalAvis
          };
        }
        return freelance;
      });
    });
  };

  // Effet de démonstration pour la mise à jour des notes (simule des avis aléatoires)
  useEffect(() => {
    // Simule l'ajout d'un nouvel avis toutes les 30 secondes (pour démonstration)
    const interval = setInterval(() => {
      const randomFreelanceId = Math.floor(Math.random() * freelances.length) + 1;
      const randomNote = Math.floor(Math.random() * 5) + 1; // Note entre 1 et 5
      ajouterAvis(randomFreelanceId, randomNote);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [freelances]);

  // Données pour les avis utilisateurs
  const temoignages = [
    {
      nom: "Marie Dogmo",
      role: "Fondatrice, TechStart",
      texte: "J'ai trouvé le freelance parfait pour mon projet en seulement 2 jours. La qualité du travail était exceptionnelle !",
      image: "https://randomuser.me/api/portraits/women/69.jpg",
    },
    {
      nom: "Pierre Lambert",
      role: "Développeur Indépendant",
      texte: "En tant que freelance, cette plateforme m'a permis de trouver des clients sérieux et des projets intéressants.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nom: "Julie Moreau",
      role: "Designer Freelance",
      texte: "Le système de paiement sécurisé me donne confiance à chaque transaction. Je recommande vivement !",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <div>
      {/* Section Hero avec carrousel */}
      <section className="relative h-screen w-full overflow-hidden mt-15">
        {/* Carrousel */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        {/* Overlay sombre pour le contraste */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>
        {/* Texte Hero */}
        <div className="relative z-30 h-full flex flex-col justify-center items-start px-6 md:px-20 text-white max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Trouvez le talent parfait<br />pour votre projet
          </h1>
          <p className="text-sm md:text-base mb-6 text-gray-200">
            Connectez-vous avec des freelances qualifiés et faites avancer vos projets rapidement et efficacement.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
              Publier un projet
            </button>
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
              Devenir freelance
            </button>
          </div>
        </div>
      </section>

      {/* Section des projets en vedette */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Projets en vedette</h2>
          <Slider {...sliderSettings} className="-mx-2">
            {projets.map((projet) => (
              <div key={projet.id} className="px-2">
                <div className="bg-white rounded-lg shadow-sm p-6 h-full border border-gray-200 hover:border-blue-500 transition-colors duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex-grow">{projet.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <DollarSign size={16} />
                      {projet.budget}$
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{projet.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      Échéance : {new Date(projet.deadline).toLocaleDateString()}
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => window.location.href = '/projet'}
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Section Comment ça fonctionne */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça fonctionne</h2>
          <p className="text-gray-500 text-lg mb-12">
            Un processus simple pour trouver les meilleurs talents ou projets
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 7l9 6 9-6-9-6-9 6z" />
                    <path d="M21 10.5v6l-9 6-9-6v-6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Publiez votre projet</h3>
              <p className="text-gray-500 text-sm">
                Décrivez votre projet, définissez votre budget et les compétences requises.
              </p>
            </div>
            {/* Étape 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
                    <path d="M6 20v-1c0-2.21 3.58-4 6-4s6 1.79 6 4v1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trouvez le bon talent</h3>
              <p className="text-gray-500 text-sm">
                Recevez des propositions de freelances qualifiés et choisissez le meilleur.
              </p>
            </div>
            {/* Étape 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paiement sécurisé</h3>
              <p className="text-gray-500 text-sm">
                Travaillez avec confiance grâce à notre système de paiement sécurisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Projets en vedette - avec timestamps dynamiques */}
      {/* <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Projets en vedette</h2>
            <a href="/projet" className="text-blue-600 font-medium hover:underline">
              Voir tous les projets
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projets.map((projet) => (
              <div
                key={projet.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {projet.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{projet.description}</p>
                  <p className="font-semibold text-gray-800 mb-3">
                    Budget:{" "}
                    <span className="font-normal text-gray-700">{projet.budget}$</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatRelativeTime(projet.createdAt)}</span>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Voir détails
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* Section Freelances populaires - avec notes dynamiques */}
      <section className={`py-16 px-4 md:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Freelances populaires</h2>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Voir tous les freelances
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transform transition-all duration-500 ease-in-out">
            {freelances.map((freelance) => (
              <div
                key={freelance.id}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={freelance.avatarUrl} 
                      alt={freelance.nom} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900">{freelance.nom}</h3>
                  <p className="text-gray-600">{freelance.titre}</p>
                  
                  {/* Système de notation dynamique avec animation */}
                  <div className="flex justify-center items-center gap-1 mt-3 mb-4 text-sm text-gray-700">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="font-semibold transition-all duration-500 ease-in-out">{freelance.note}</span>
                    <span className="text-gray-500 transition-all duration-500 ease-in-out">
                      ({freelance.avis} avis)
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {freelance.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center group">Voir profil <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    Voir profil
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avis Utilisateurs */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-600 after:mx-auto after:mt-2">Ce que disent nos utilisateurs</h2>
          <p className="text-gray-600 mb-10">
            Découvrez les expériences de nos clients et freelances
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {temoignages.map((avis, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={avis.image}
                    alt={avis.nom}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{avis.nom}</p>
                    <p className="text-sm text-gray-500">{avis.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">"{avis.texte}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA - Prêt à démarrer */}
      <section className="bg-blue-600 py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-50 -z-10"></div>
          <h2 className="text-4xl font-bold mb-6">Prêt à démarrer ?</h2>
          <p className="text-xl mb-10">
            Rejoignez notre communauté de freelances et d'entreprises pour collaborer sur des projets passionnants.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#" 
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Je cherche un freelance
            </a>
            <a 
              href="#" 
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
            >
              Je suis freelance
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}