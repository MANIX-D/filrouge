import { useEffect, useState } from 'react';

export default function Home() {
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

  // Données pour les projets en vedette
  const projets = [
    {
      titre: "Développement d'une application web e-commerce",
      description: "Création d'une application web complète avec panier, paiement et gestion des produits.",
      budget: "500000-1000000 Fcfa",
      tags: ["React", "Node.js", "MongoDB"],
      date: "Il y a 2 jours",
    },
    {
      titre: "Design d'une identité visuelle pour startup",
      description: "Création de logo, charte graphique et éléments visuels pour une startup dans le domaine de la santé.",
      budget: "300000-500000 Fcfa",
      tags: ["Design graphique", "Branding", "Illustrator"],
      date: "Il y a 3 jours",
    },
    {
      titre: "Rédaction de contenu SEO pour site web",
      description: "Rédaction de 20 articles optimisés SEO pour un site web dans le domaine de la technologie.",
      budget: "150000-250000 Fcfa",
      tags: ["Rédaction web", "SEO", "Marketing de contenu"],
      date: "Il y a 1 jour",
    },
  ];

  // Données pour les freelances populaires
  const freelances = [
    {
      nom: "Manix Yotto",
      titre: "Développeuse Full Stack",
      note: 4.9,
      avis: 48,
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      nom: "Aimé Poka",
      titre: "Designer UX/UI",
      note: 4.8,
      avis: 36,
      skills: ["Figma", "Adobe XD", "Sketch"],
    },
    {
      nom: "Rédactrice Web & SEO",
      titre: "",
      note: 4.7,
      avis: 52,
      skills: ["Copywriting", "SEO", "Marketing de contenu"],
    },
    {
      nom: "Mario Fotso",
      titre: "Développeur Mobile",
      note: 4.9,
      avis: 41,
      skills: ["React Native", "Flutter", "Swift"],
    },
  ];

  // Données pour les avis utilisateurs
  const temoignages = [
    {
      nom: "Marie Dogmo",
      role: "Fondatrice, TechStart",
      texte: "J'ai trouvé le freelance parfait pour mon projet en seulement 2 jours. La qualité du travail était exceptionnelle !",
      image: null,
    },
    {
      nom: "Manix Yotto",
      role: "Développeur Indépendant",
      texte: "En tant que freelance, cette plateforme m'a permis de trouver des clients sérieux et des projets intéressants.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nom: "Julie Kouam",
      role: "Designer Freelance",
      texte: "Le système de paiement sécurisé me donne confiance à chaque transaction. Je recommande vivement !",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <div>
      {/* Section Hero avec carrousel */}
      <section className="relative h-screen w-full overflow-hidden">
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

      {/* Section Projets en vedette */}
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Projets en vedette</h2>
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Voir tous les projets
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projets.map((projet, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {projet.titre}
                  </h3>
                  <p className="text-gray-600 mb-4">{projet.description}</p>
                  <p className="font-semibold text-gray-800 mb-3">
                    Budget:{" "}
                    <span className="font-normal text-gray-700">{projet.budget}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{projet.date}</span>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Voir détails
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section Freelances populaires */}
      <section className="bg-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Freelances populaires</h2>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Voir tous les freelances
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {freelances.map((freelance, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{freelance.nom}</h3>
                  <p className="text-gray-600">{freelance.titre}</p>
                  <div className="flex justify-center items-center gap-1 mt-3 mb-4 text-sm text-gray-700">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="font-semibold">{freelance.note}</span>
                    <span className="text-gray-500">({freelance.avis} avis)</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {freelance.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ce que disent nos utilisateurs</h2>
          <p className="text-gray-600 mb-10">
            Découvrez les expériences de nos clients et freelances
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {temoignages.map((avis, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  {avis.image && (
                    <img
                      src={avis.image}
                      alt={avis.nom}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
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
      <section className="bg-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
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