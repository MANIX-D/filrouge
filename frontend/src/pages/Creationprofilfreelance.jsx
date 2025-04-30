import { useState, useRef } from 'react';
import { User, Globe, BookOpen, Award, PlusCircle, X, Trash } from 'lucide-react';

export default function FreelanceProfileForm() {
  // Référence pour l'input de fichier
  const fileInputRef = useRef(null);
  
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    professionalTitle: '',
    bio: '',
    profilePicture: null,
    skills: [],
    languages: [],
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
    portfolioLinks: ['']
  });
  
  // État pour prévisualiser l'image
  const [previewImage, setPreviewImage] = useState(null);

  // État pour le nouveau skill à ajouter
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState('Débutant');

  // Gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  // Ajouter un lien portfolio
  const addPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
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
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Créer une URL pour prévisualiser l'image
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
  
  // Soumettre le formulaire
  const handleSubmit = () => {
    console.log("Données du formulaire soumises:", formData);
    
    // Ici, vous pourriez appeler une API pour enregistrer les données
    // Simuler une requête API avec un délai
    setTimeout(() => {
      // Rediriger vers une autre page après la soumission
      window.location.href = "Profilfreelance"; // Remplacez par votre URL de redirection
    }, 1000);
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
              <label htmlFor="professionalTitle" className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
              <input
                type="text"
                id="professionalTitle"
                name="professionalTitle"
                placeholder="ex: Développeur Full Stack React"
                value={formData.professionalTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Présentez-vous et décrivez votre parcours professionnel..."
                value={formData.bio}
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
            
            {formData.portfolioLinks.map((link, index) => (
              <div key={index} className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => updatePortfolioLink(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={() => removePortfolioLink(index)} 
                  className="ml-2 p-2 hover:bg-red-100 text-red-500 rounded"
                  aria-label="Supprimer le lien portfolio"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPortfolioLink}
              className="flex items-center text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un lien portfolio
            </button>
          </section>
          
          {/* Bouton d'action */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Publier le profil
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