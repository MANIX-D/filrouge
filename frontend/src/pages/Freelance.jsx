import { useState, useMemo } from 'react';
import { Search, MapPin, Star, X, SlidersHorizontal, Mail, Phone, Calendar, Briefcase, Award, Clock, ExternalLink } from 'lucide-react';

export default function Freelance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [filters, setFilters] = useState({
    minRate: '',
    maxRate: '',
    skills: [],
    location: ''
  });

  // Liste des compétences disponibles
  const availableSkills = [
    'React', 'Node.js', 'MongoDB', 'TypeScript', 'Figma', 'Adobe XD',
    'Sketch', 'UI Design', 'React Native', 'Swift', 'Kotlin', 'Firebase',
    'SEO', 'Google Ads', 'Analytics', 'Content Marketing'
  ];

  // Données des freelancers
  const freelancers = [
    {
      id: 1,
      name: "Penpen Berboss",
      title: "Développeur Full Stack",
      location: "Douala, Cameroun",
      rating: 4.8,
      reviewCount: 27,
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      hourlyRate: 65,
      description: "Développeur full stack avec 5 ans d'expérience dans la création d'applications web et mobiles. Spécialisé dans les technologies JavaScript.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Aimé Poka",
      title: "Designer UI/UX",
      location: "Douala, Cameroun",
      rating: 4.9,
      reviewCount: 42,
      skills: ["Figma", "Adobe XD", "Sketch", "UI Design"],
      hourlyRate: 55,
      description: "Designer UI/UX passionné par la création d'interfaces utilisateur intuitives et esthétiques. Plus de 7 ans d'expérience dans le domaine.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Mario Fotso",
      title: "Développeuse Mobile",
      location: "Douala, Cameroun",
      rating: 4.7,
      reviewCount: 19,
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      hourlyRate: 60,
      description: "Spécialiste du développement d'applications mobiles natives et cross-platform. Expérience dans la création d'applications pour startups et entreprises.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      name: "Antoine Moreau",
      title: "Expert SEO & Marketing Digital",
      location: "Nantes, France",
      rating: 4.6,
      reviewCount: 31,
      skills: ["SEO", "Google Ads", "Analytics", "Content Marketing"],
      hourlyRate: 50,
      description: "Consultant en marketing digital avec une expertise en référencement naturel et publicité en ligne. Aide les entreprises à augmenter leur visibilité en ligne.",
      image: "/api/placeholder/60/60"
    }
  ];

  // Filtrer les freelancers
  const filteredFreelancers = useMemo(() => {
    return freelancers.filter(freelancer => {
      // Recherche par nom ou titre
      const searchMatch = (
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Filtre par tarif
      const rateMatch = (
        (!filters.minRate || freelancer.hourlyRate >= Number(filters.minRate)) &&
        (!filters.maxRate || freelancer.hourlyRate <= Number(filters.maxRate))
      );

      // Filtre par compétences
      const skillsMatch = (
        filters.skills.length === 0 ||
        filters.skills.some(skill => freelancer.skills.includes(skill))
      );

      // Filtre par localisation
      const locationMatch = (
        !filters.location ||
        freelancer.location.toLowerCase().includes(filters.location.toLowerCase())
      );

      return searchMatch && rateMatch && skillsMatch && locationMatch;
    });
  }, [searchTerm, filters, freelancers]);

  // Gérer la sélection des compétences
  const handleSkillToggle = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      minRate: '',
      maxRate: '',
      skills: [],
      location: ''
    });
  };

  // Rendu des étoiles pour l'évaluation
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Carte de profil freelance
  const FreelancerCard = ({ freelancer }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center p-3 border-b">
        <img
          src={freelancer.image} 
          alt={freelancer.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{freelancer.name}</h3>
          <p className="text-sm text-gray-600">{freelancer.title}</p>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <MapPin size={14} className="text-gray-500 mr-1" />
            <span className="text-gray-800">{freelancer.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-800">{freelancer.rating}</span>
            <span className="text-gray-500 text-xs">({freelancer.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {freelancer.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs font-medium">
              +{freelancer.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm font-medium text-gray-800">{freelancer.hourlyRate} $/h</p>
          <button 
            onClick={() => setSelectedFreelancer(freelancer)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded text-sm font-medium"
          >
            APERÇU
          </button>
        </div>
      </div>
    </div>
  );

  // Modal de profil détaillé
  const ProfileModal = ({ freelancer, onClose }) => {
    if (!freelancer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{freelancer.name}</h2>
                  <p className="text-lg text-gray-600">{freelancer.title}</p>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{freelancer.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-blue-600 mr-2" size={20} />
                    <span className="text-gray-700">Note moyenne</span>
                  </div>
                  <span className="font-bold text-blue-600">{freelancer.rating}/5</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="text-blue-600 mr-2" size={20} />
                    <span className="text-gray-700">Projets réalisés</span>
                  </div>
                  <span className="font-bold text-blue-600">{freelancer.reviewCount}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="text-blue-600 mr-2" size={20} />
                    <span className="text-gray-700">Tarif horaire</span>
                  </div>
                  <span className="font-bold text-blue-600">{freelancer.hourlyRate}$/h</span>
                </div>
              </div>
            </div>

            {/* À propos */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos</h3>
              <p className="text-gray-600 leading-relaxed">{freelancer.description}</p>
            </div>

            {/* Compétences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <Mail size={20} className="mr-2" />
                    Contacter
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <ExternalLink size={20} className="mr-2" />
                    Voir le portfolio
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Proposer un projet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-15">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Rechercher des freelances</h1>
      <p className="text-gray-600 mb-6">Trouvez des freelances qualifiés pour vos projets.</p>
      
      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou titre..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filtres
              {(filters.minRate || filters.maxRate || filters.skills.length > 0 || filters.location) && 
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">!</span>
              }
            </button>
          </div>
        </div>

        {/* Panneau de filtres */}
        {showFilters && (
          <div className="p-4 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtre par tarif */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarif horaire ($)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={filters.minRate}
                    onChange={(e) => setFilters(prev => ({ ...prev, minRate: e.target.value }))}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={filters.maxRate}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxRate: e.target.value }))}
                  />
                </div>
              </div>

              {/* Filtre par localisation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                <input
                  type="text"
                  placeholder="Ville ou pays"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              {/* Filtre par compétences */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Compétences</label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filters.skills.includes(skill) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <X size={16} />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}

        {/* Résultats de la recherche */}
        <div className="p-4 bg-white border-t">
          <p className="text-sm text-gray-600">
            {filteredFreelancers.length} freelance{filteredFreelancers.length > 1 ? 's' : ''} trouvé{filteredFreelancers.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      {/* Liste des freelancers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFreelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>

      {/* Affichage de la modal */}
      {selectedFreelancer && (
        <ProfileModal
          freelancer={selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
        />
      )}
    </div>
  );
}