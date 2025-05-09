import { useState, useRef, useEffect } from 'react';
import { User, Globe, BookOpen, Award, PlusCircle, X, Trash } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../config/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function FreelanceProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fonction pour rediriger vers la page de profil
  const redirectToProfile = (userData) => {
    navigate('/profil-freelance', {
      state: {
        profile: userData,
        justUpdated: true
      },
      replace: true
    });
  };
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState('Débutant');
  const [previewImage, setPreviewImage] = useState(null);

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    location: '',
    dailyRate: '',
    about: '',
    profilePicture: null,
    skills: [], // Initialiser avec au moins un skill vide
    languages: [{ name: '', level: 'Débutant' }],
    education: [{
      diploma: '',
      school: '',
      year: '',
      description: ''
    }],
    certifications: [{
      name: '',
      organization: '',
      year: '',
      url: ''
    }],
    portfolioProjects: [{
      url: '',
      technologies: ['']
    }]
  });

  // Charger les données du profil si elles existent
  useEffect(() => {
    if (location.state?.profileData) {
      const profileData = location.state.profileData;
      
      // Adapter le format des données pour le formulaire
      const adaptedSkills = profileData.skills?.map(skill => skill.name) || [];
      const adaptedLanguages = profileData.languages?.map(lang => ({
        name: lang.name,
        level: lang.level
      })) || [];
      const adaptedEducation = profileData.education?.map(edu => ({
        diploma: edu.diploma,
        school: edu.school,
        year: edu.year,
        description: edu.description
      })) || [];
      const adaptedCertifications = profileData.certifications?.map(cert => ({
        name: cert.name,
        organization: cert.organization,
        year: cert.year,
        url: cert.url
      })) || [];
      const adaptedProjects = profileData.portfolioProjects?.map(project => ({
        title: project.title,
        description: project.description,
        url: project.url,
        technologies: project.technologies?.map(tech => tech.name) || []
      })) || [];

      setFormData({
        firstName: profileData.first_name || '',
        lastName: profileData.last_name || '',
        title: profileData.title || '',
        location: profileData.location || '',
        dailyRate: profileData.daily_rate || '',
        about: profileData.about || '',
        skills: adaptedSkills,
        languages: adaptedLanguages.length > 0 ? adaptedLanguages : [{ name: '', level: 'Débutant' }],
        education: adaptedEducation.length > 0 ? adaptedEducation : [{
          diploma: '',
          school: '',
          year: '',
          description: ''
        }],
        certifications: adaptedCertifications.length > 0 ? adaptedCertifications : [{
          name: '',
          organization: '',
          year: '',
          url: ''
        }],
        portfolioProjects: adaptedProjects.length > 0 ? adaptedProjects : [{
          title: '',
          description: '',
          url: '',
          technologies: ['']
        }]
      });
    }
  }, [location.state]);



  // Gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer l'upload de l'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Valider les données du formulaire
  const validateFormData = () => {
    const errors = [];

    if (!formData.firstName) errors.push('Le prénom est requis');
    if (!formData.lastName) errors.push('Le nom est requis');
    if (!formData.title) errors.push('Le titre est requis');
    if (!formData.location) errors.push('La localisation est requise');
    if (!formData.dailyRate) errors.push('Le taux journalier est requis');
    if (!formData.about) errors.push('La description est requise');

    if (formData.skills.length === 0) errors.push('Au moins une compétence est requise');
    if (formData.languages.length === 0) errors.push('Au moins une langue est requise');

    // Validation de la photo de profil
    if (formData.profilePicture) {
      const file = formData.profilePicture;
      if (!file.type.startsWith('image/')) {
        errors.push('La photo de profil doit être une image valide');
      }
      if (file.size > 5 * 1024 * 1024) {
        errors.push('La taille de la photo ne doit pas dépasser 5MB');
      }
    }

    return errors;
  };

  // Nettoyer et formater les données
  const cleanFormData = (data) => {
    return {
      ...data,
      firstName: data.firstName?.trim() || '',
      lastName: data.lastName?.trim() || '',
      title: data.title?.trim() || '',
      location: data.location?.trim() || '',
      dailyRate: data.dailyRate?.trim() || '',
      about: data.about?.trim() || '',
      skills: data.skills.filter(skill => skill && (typeof skill === 'string' ? skill.trim() : skill.name?.trim())),
      languages: data.languages.filter(lang => lang.name?.trim()),
      education: data.education.filter(edu => edu.diploma?.trim() || edu.school?.trim()),
      certifications: data.certifications.filter(cert => cert.name?.trim()),
      portfolioProjects: data.portfolioProjects.filter(proj => proj.url?.trim() || proj.title?.trim())
    };
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== handleSubmit appelé ===');
    console.log('État initial du formulaire:', formData);
    setIsLoading(true);

    try {
      console.log('=== Début de la validation ===');
      // Validation des données
      const validationErrors = validateFormData();
      console.log('Erreurs de validation:', validationErrors);
      if (validationErrors.length > 0) {
        validationErrors.forEach(error => toast.error(error));
        setIsLoading(false);
        return;
      }

      // Vérifier si l'utilisateur est connecté
      let token = localStorage.getItem('token');
      console.log('Token brut:', token);
      
      // Nettoyage du token
      try {
        if (token && (token.startsWith('{') || token.startsWith('"'))) {
          const parsedToken = JSON.parse(token);
          token = typeof parsedToken === 'object' ? parsedToken.token : parsedToken;
        }
      } catch (e) {
        console.log('Le token n\'est pas au format JSON');
      }
      
      console.log('Token final à utiliser:', token);
      
      if (!token) {
        toast.error('Veuillez vous connecter pour créer un profil');
        navigate('/connexion');
        return;
      }

      // Obtenir le cookie CSRF
      await axios.get(`${API_CONFIG.baseURL}/sanctum/csrf-cookie`, {
        withCredentials: true
      });

      console.log('=== Début du nettoyage des données ===');
      const cleanedData = cleanFormData(formData);
      console.log('Données nettoyées:', cleanedData);

      const formDataToSend = new FormData();
      
      formDataToSend.append('first_name', cleanedData.firstName.trim());
      formDataToSend.append('last_name', cleanedData.lastName.trim());
      formDataToSend.append('title', cleanedData.title.trim());
      formDataToSend.append('location', cleanedData.location.trim());
      formDataToSend.append('daily_rate', cleanedData.dailyRate.trim());
      formDataToSend.append('about', cleanedData.about.trim());
      
      formDataToSend.append('skills', JSON.stringify(cleanedData.skills));
      formDataToSend.append('languages', JSON.stringify(cleanedData.languages.filter(lang => lang.name.trim())));
      formDataToSend.append('education', JSON.stringify(cleanedData.education.filter(edu => edu.diploma?.trim() || edu.school?.trim() || edu.description?.trim()).map(edu => ({
        diploma: edu.diploma || '',
        school: edu.school || '',
        year: edu.year || '',
        description: edu.description || ''
      }))));
      formDataToSend.append('certifications', JSON.stringify(cleanedData.certifications.filter(cert => cert.name.trim())));
      formDataToSend.append('portfolioProjects', JSON.stringify(cleanedData.portfolioProjects.filter(project => project.url.trim()).map(project => ({
        title: project.title.trim(),
        description: project.description.trim(),
        url: project.url.trim(),
        technologies: project.technologies.filter(tech => tech.trim())
      }))));

      if (cleanedData.profilePicture) {
        formDataToSend.append('profile_picture', cleanedData.profilePicture);
      }

      console.log('=== Tentative d\'envoi des données ===');
      console.log('URL:', `${API_CONFIG.baseURL}/api/freelance/profile`);

      const response = await axios.post(`${API_CONFIG.baseURL}/api/freelance/profile`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        transformRequest: [(data) => data],
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      });

      console.log('=== Réponse reçue du backend ===');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      
      if (!response.data.user) {
        console.error('Pas de données utilisateur dans la réponse');
        toast.error('Erreur: données de profil manquantes');
        return;
      }
      
      localStorage.setItem('userProfile', JSON.stringify(response.data.user));
      console.log('=== Données stockées dans localStorage ===');
      
      toast.success('Profil créé avec succès!', {
        position: 'top-center',
        autoClose: 2000
      });
      
      setTimeout(() => {
        navigate('/profil-freelance', {
          state: {
            profile: response.data.user,
            justUpdated: true
          },
          replace: true
        });
      }, 500);

    } catch (error) {
      console.error('Erreur complète:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 422:
            const validationErrors = error.response.data.errors;
            Object.values(validationErrors).forEach(error => {
              toast.error(Array.isArray(error) ? error[0] : error);
            });
            break;
          case 401:
            toast.error('Session expirée. Veuillez vous reconnecter.');
            navigate('/login');
            break;
          case 500:
            toast.error('Erreur serveur. Veuillez réessayer plus tard.');
            break;
          default:
            toast.error(`Erreur ${error.response.status}: ${error.response.data.message || 'Erreur lors de la mise à jour du profil'}`);
        }
      } else if (error.request) {
        toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.');
      } else {
        toast.error('Une erreur inattendue est survenue: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Ajouter un skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Supprimer un skill
  const removeSkill = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Ajouter une langue
  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, { name: newLanguage.trim(), level: selectedLanguageLevel }]
      }));
      setNewLanguage('');
      setSelectedLanguageLevel('Débutant');
    }
  };

  // Ajouter un projet portfolio
  const addPortfolioProject = () => {
    setFormData(prev => ({
      ...prev,
      portfolioProjects: [...prev.portfolioProjects, { url: '', technologies: [] }]
    }));
  };

  // Ajouter une technologie à un projet
  const addTechnology = (projectIndex, technology) => {
    setFormData(prev => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.map((project, index) => 
        index === projectIndex ? { ...project, technologies: [...project.technologies, technology] } : project
      )
    }));
  };

  // Supprimer une technologie d'un projet
  const removeTechnology = (projectIndex, technologyIndex) => {
    setFormData(prev => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.map((project, index) => 
        index === projectIndex ? { 
          ...project, 
          technologies: project.technologies.filter((_, techIndex) => techIndex !== technologyIndex)
        } : project
      )
    }));
  };

  // Supprimer une langue
  const removeLanguage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Ajouter une formation
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { diploma: '', school: '', year: '', description: '' }]
    }));
  };

  // Supprimer une formation
  const removeEducation = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Mettre à jour une formation
  const updateEducation = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  // Ajouter une certification
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', organization: '', year: '', url: '' }]
    }));
  };

  // Supprimer une certification
  const removeCertification = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Mettre à jour une certification
  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      certifications: updatedCertifications
    }));
  };

  // Supprimer un lien portfolio
  const removePortfolioLink = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Mettre à jour un lien portfolio
  const updatePortfolioLink = (index, value) => {
    const updatedLinks = [...formData.portfolioLinks];
    updatedLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      portfolioLinks: updatedLinks
    }));
  };

  // Gérer le changement de photo de profil
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image valide');
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Déclencher le clic sur l'input de fichier
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Mettre à jour un projet portfolio
  const updatePortfolioProject = (index, field, value) => {
    setFormData(prev => {
      const updatedProjects = [...prev.portfolioProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      };
      return {
        ...prev,
        portfolioProjects: updatedProjects
      };
    });
  };

  
  return (
    <div className="bg-white min-h-screen mt-15">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Créer votre profil freelance</h1>
        <p className="text-gray-600 mb-8">Complétez votre profil pour augmenter vos chances d'être sélectionné pour des projets.</p>
        
        <div>
          {/* Informations personnelles */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                className="hidden"
              />
              <button 
                type="button"
                onClick={triggerFileInput}
                className="text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Changer la photo
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="ex: Développeur Full Stack React"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="ex: Paris, France"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700 mb-1">Tarif journalier (USD)</label>
                <input
                  type="number"
                  id="dailyRate"
                  name="dailyRate"
                  placeholder="ex: 450"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                id="about"
                name="about"
                rows={4}
                placeholder="Présentez-vous et décrivez votre parcours professionnel..."
                value={formData.about}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </section>
          
          {/* Compétences */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Compétences</h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="ex: React.js, Design UI/UX, SEO..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {skill}
                    <button 
                      onClick={() => removeSkill(index)} 
                      className="ml-1 p-1 hover:bg-blue-200 rounded-full"
                      aria-label="Supprimer la compétence"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter une compétence
            </button>
          </section>
          
          {/* Langues */}
          <section className="mb-8">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <Globe className="w-5 h-5 mr-2" /> Langues
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="ex: Anglais, Espagnol..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <select
                  value={selectedLanguageLevel}
                  onChange={(e) => setSelectedLanguageLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Courant">Courant</option>
                  <option value="Natif">Natif</option>
                </select>
              </div>
            </div>
            
            {formData.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.languages.map((lang, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {lang.name} - {lang.level}
                    <button 
                      onClick={() => removeLanguage(index)} 
                      className="ml-1 p-1 hover:bg-green-200 rounded-full"
                      aria-label="Supprimer la langue"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter une langue
            </button>
          </section>
          
          {/* Formation */}
          <section className="mb-8">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <BookOpen className="w-5 h-5 mr-2" /> Formation
            </h2>
            
            {formData.education.map((edu, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-4 relative">
                <button 
                  onClick={() => removeEducation(index)} 
                  className="absolute top-2 right-2 p-1 hover:bg-red-100 text-red-500 rounded"
                  aria-label="Supprimer la formation"
                >
                  <Trash className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
                    <input
                      type="text"
                      placeholder="ex: Master en Informatique"
                      value={edu.diploma}
                      onChange={(e) => updateEducation(index, 'diploma', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">École</label>
                    <input
                      type="text"
                      placeholder="ex: Université de Douala"
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Année d'obtention</label>
                  <input
                    type="text"
                    placeholder="ex: 2020"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez brièvement votre formation..."
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter une formation
            </button>
          </section>
          
          {/* Certifications */}
          <section className="mb-8">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <Award className="w-5 h-5 mr-2" /> Certifications
            </h2>
            
            {formData.certifications.map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-4 relative">
                <button 
                  onClick={() => removeCertification(index)} 
                  className="absolute top-2 right-2 p-1 hover:bg-red-100 text-red-500 rounded"
                  aria-label="Supprimer la certification"
                >
                  <Trash className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la certification</label>
                    <input
                      type="text"
                      placeholder="ex: AWS Certified Developer"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organisme</label>
                    <input
                      type="text"
                      placeholder="ex: Amazon Web Services"
                      value={cert.organization}
                      onChange={(e) => updateCertification(index, 'organization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Année d'obtention</label>
                    <input
                      type="text"
                      placeholder="ex: 2023"
                      value={cert.year}
                      onChange={(e) => updateCertification(index, 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL de vérification</label>
                    <input
                      type="text"
                      placeholder="https://"
                      value={cert.url}
                      onChange={(e) => updateCertification(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addCertification}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter une certification
            </button>
          </section>
          
          {/* Portfolio */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
            
            {formData.portfolioProjects.map((project, index) => (
              <div key={index} className="mb-4 flex items-center">
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre du projet</label>
                  <input
                    type="text"
                    placeholder="ex: Projet de démonstration"
                    value={project.title}
                    onChange={(e) => updatePortfolioProject(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description du projet</label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez brièvement le projet..."
                    value={project.description}
                    onChange={(e) => updatePortfolioProject(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL du projet</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={project.url}
                    onChange={(e) => updatePortfolioProject(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies utilisées</label>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(index, techIndex)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        const newTech = prompt('Entrez le nom de la technologie');
                        if (newTech) {
                          addTechnology(index, newTech);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ajouter une technologie
                    </button>
                  </div>
                </div>
              </div>
                <button 
                  onClick={() => removePortfolioProject(index)} 
                  className="ml-2 p-2 hover:bg-red-100 text-red-500 rounded"
                  aria-label="Supprimer le lien portfolio"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPortfolioProject}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un projet portfolio
            </button>
          </section>
          
          {/* Bouton d'action */}
          <div className="flex space-x-4 justify-end mt-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('=== Bouton cliqué ===');
                handleSubmit(e);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Publication en cours...' : 'Publier le profil'}
            </button>
          </div>
          
          {/* Message de confirmation après soumission (optionnel) */}
          <div id="submit-message" className="hidden mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            Votre profil a été enregistré avec succès! Vous allez être redirigé...
          </div>
        </div>
      </div>
    </div>
  );
}