import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Clock, Eye, Calendar, DollarSign, X } from 'lucide-react';

const Project = () => {
  // États pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    skills: [],
    dateRange: 'all' // 'all', 'week', 'month', '3months'
  });

  // État pour stocker les projets
  const [projects] = useState([
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

  // États pour les modales
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  
  // État pour le formulaire de proposition
  const [proposalForm, setProposalForm] = useState({
    name: '',
    email: '',
    price: '',
    message: ''
  });

  // Gestionnaires des modales
  const openDetailsModal = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const openProposalModal = (project) => {
    setSelectedProject(project);
    setIsProposalModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsProposalModalOpen(false);
  };

  // Gestionnaire du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalForm({
      ...proposalForm,
      [name]: value
    });
  };

  const handleSubmitProposal = () => {
    // Traitement de la soumission du formulaire
    console.log('Proposition soumise:', proposalForm);
    // Réinitialiser le formulaire
    setProposalForm({
      name: '',
      email: '',
      price: '',
      message: ''
    });
    // Fermer la modale
    closeModals();
    // Afficher un message de confirmation
    alert('Votre proposition a été envoyée avec succès!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full mt-15">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rechercher des projets</h1>
        <p className="text-gray-600">Trouvez des projets qui correspondent à vos compétences et intérêts.</p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un projet..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 ${showFilters ? 'text-blue-600 border-blue-600' : 'text-gray-700'}`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filtres</span>
            </button>
          </div>
        </div>
      </div>

      {/* Panneau de filtres */}
      {showFilters && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget minimum</label>
              <input
                type="number"
                value={filters.minBudget}
                onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                placeholder="Min $"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget maximum</label>
              <input
                type="number"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                placeholder="Max $"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de publication</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">Toutes les dates</option>
                <option value="week">7 derniers jours</option>
                <option value="month">30 derniers jours</option>
                <option value="3months">3 derniers mois</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compétences</label>
              <select
                value={filters.skills}
                onChange={(e) => {
                  const options = [...e.target.selectedOptions];
                  const values = options.map(option => option.value);
                  setFilters({ ...filters, skills: values });
                }}
                multiple
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="MongoDB">MongoDB</option>
                <option value="React Native">React Native</option>
                <option value="Firebase">Firebase</option>
                <option value="Design graphique">Design graphique</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                setFilters({
                  minBudget: '',
                  maxBudget: '',
                  skills: [],
                  dateRange: 'all'
                });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      {/* Liste des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useMemo(() => {
          return projects
            .filter(project => {
              // Filtre par recherche
              if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
              }

              // Filtre par budget
              if (filters.minBudget && project.budget < parseInt(filters.minBudget)) {
                return false;
              }
              if (filters.maxBudget && project.budget > parseInt(filters.maxBudget)) {
                return false;
              }

              // Filtre par compétences
              if (filters.skills.length > 0 && !filters.skills.some(skill => project.skills.includes(skill))) {
                return false;
              }

              // Filtre par date
              if (filters.dateRange !== 'all') {
                const publishDate = new Date(project.publishedDate);
                const now = new Date();
                const diffTime = Math.abs(now - publishDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                switch (filters.dateRange) {
                  case 'week':
                    if (diffDays > 7) return false;
                    break;
                  case 'month':
                    if (diffDays > 30) return false;
                    break;
                  case '3months':
                    if (diffDays > 90) return false;
                    break;
                  default:
                    break;
                }
              }

              return true;
            })
            .map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-5 flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-900 font-medium">Budget</span>
                    </div>
                    <span className="text-gray-900 font-medium">${project.budget}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-900 font-medium">Date limite</span>
                    </div>
                    <span className="text-gray-900">{project.deadline}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-900 font-medium mb-2">Compétences requises</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Publié le {project.publishedDate}</span>
                  </div>
                </div>
                
                <div className="flex border-t border-gray-200">  
                  <button 
                    className="flex-1 py-3 px-4 text-center border-r border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors flex justify-center items-center gap-1"
                    onClick={() => openDetailsModal(project)}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Voir les détails</span>
                  </button>
                  <button 
                    className="flex-1 py-3 px-4 text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => openProposalModal(project)}
                  >
                    Proposer mes services
                  </button>
                </div>
              </div>
            ));
        }, [projects, searchTerm, filters])}

        
        {/* Carte avec l'image muet */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
          <div className="p-5 flex-grow flex justify-center items-center">
            <div className="bg-gray-100 p-10 rounded-lg flex justify-center items-center">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-gray-400">
                  <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="8" />
                  <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="8" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex border-t border-gray-200">
            <button className="flex-1 py-3 px-4 text-center border-r border-gray-200 invisible">
              Placeholder
            </button>
            <button className="flex-1 py-3 px-4 text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Proposer mes services
            </button>
          </div>
        </div>
      </div>

      {/* Modal de détails du projet */}
      {isDetailsModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button 
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{selectedProject.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Budget</h3>
                  <p className="text-gray-900 font-bold">${selectedProject.budget}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Date limite</h3>
                  <p className="text-gray-900">{selectedProject.deadline}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Compétences requises</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Publié le {selectedProject.publishedDate}</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button 
                onClick={closeModals}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
              <button 
                onClick={() => {
                  closeModals();
                  openProposalModal(selectedProject);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proposer mes services
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de proposition de services */}
      {isProposalModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Proposer mes services</h2>
              <button 
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Projet : {selectedProject.title}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={proposalForm.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={proposalForm.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre tarif proposé ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={proposalForm.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (décrivez brièvement votre proposition)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={proposalForm.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="button"
                  onClick={handleSubmitProposal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Envoyer ma proposition
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;