import { useState, useEffect } from 'react';
import { Bell, DollarSign, CheckCircle, Briefcase, Star, Clock } from 'lucide-react';

const FreelanceDashboard = () => {
  const [freelanceData, setFreelanceData] = useState({
    name: "NOM_Freelance",
    totalRevenue: 0,
    activeProjects: 0,
    completedProjects: 0,
    averageRating: 0,
    currentProjects: [],
    notifications: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les données du freelance depuis l'API Laravel
    const fetchFreelanceData = async () => {
      try {
        // Dans un environnement réel, nous ferions un appel à l'API Laravel
        // Simulation d'une requête API
        setTimeout(() => {
          setFreelanceData({
            name: "MANIX-DOLBY",
            totalRevenue: 0,
            activeProjects: 0,
            completedProjects: 0,
            averageRating: 0,
            currentProjects: [
              {
                id: 1,
                name: "Développement site e-commerce",
                client: "TechStore SAS",
                budget: 400000,
                progress: 65,
                deadline: "15 Mai 2025"
              },
              // {
              //   id: 2,
              //   name: "Refonte interface utilisateur",
              //   client: "Design Studio",
              //   budget: 200000,
              //   progress: 30,
              //   deadline: "28 Juin 2025"
              // },
              // {
              //   id: 3,
              //   name: "Application mobile fitness",
              //   client: "GymFit",
              //   budget: 150000,
              //   progress: 45,
              //   deadline: "10 Juillet 2025"
              // },
              {
                id: 4,
                name: "API de paiement",
                client: "FinTech Solutions",
                budget: 180000,
                progress: 20,
                deadline: "15 Août 2025"
              }
            ],
            notifications: [
              {
                id: 1,
                type: "message",
                content: "Nouveau message du client TechStore SAS",
                time: "2 heures"
              },
              {
                id: 2,
                type: "payment",
                content: "Paiement reçu pour le projet \"Application mobile iOS\"",
                time: "5 heures"
              },
              {
                id: 3,
                type: "project",
                content: "Votre proposition pour le projet \"Dashboard Analytics\" a été acceptée",
                time: "1 jour"
              },
              {
                id: 4,
                type: "review",
                content: "Nouvelle évaluation reçue: 5/5 étoiles!",
                time: "2 jours"
              }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      }
    };

    fetchFreelanceData();
  }, []);

  // Fonction pour formater les nombres avec séparateur de milliers
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrency = (amount) => {
    return `${formatNumber(amount)} FCFA`;
  };

  // Fonction pour marquer une notification comme lue
  const markNotificationAsRead = (notificationId) => {
    setFreelanceData(prevData => ({
      ...prevData,
      notifications: prevData.notifications.filter(notif => notif.id !== notificationId)
    }));
  };

  // Fonction pour mettre à jour la progression d'un projet
  const updateProjectProgress = (projectId, newProgress) => {
    setFreelanceData(prevData => ({
      ...prevData,
      currentProjects: prevData.currentProjects.map(project => 
        project.id === projectId ? { ...project, progress: newProgress } : project
      )
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-lg text-blue-600 font-medium">Chargement du tableau de bord...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 mt-15">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{freelanceData.name}</h1>
        <div className="text-sm text-gray-600 mb-6">Bienvenue ! Voici un aperçu de votre activité.</div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6 transform transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Revenus totaux</div>
                <div className="text-xl font-bold">{formatCurrency(freelanceData.totalRevenue)}</div>
              </div>
            </div>
          </div>

          {/* Active Projects Card */}
          <div className="bg-white rounded-lg shadow p-6 transform transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Projets actifs</div>
                <div className="text-xl font-bold">{freelanceData.activeProjects}</div>
              </div>
            </div>
          </div>

          {/* Completed Projects Card */}
          <div className="bg-white rounded-lg shadow p-6 transform transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Projets terminés</div>
                <div className="text-xl font-bold">{freelanceData.completedProjects}</div>
              </div>
            </div>
          </div>

          {/* Average Rating Card */}
          <div className="bg-white rounded-lg shadow p-6 transform transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Note moyenne</div>
                <div className="text-xl font-bold">{freelanceData.averageRating} /5</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Projects Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Projets en cours</h2>
              <div className="space-y-6">
                {freelanceData.currentProjects.map((project) => (
                  <div key={project.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between flex-wrap mb-2">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="text-sm text-gray-600">{project.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(project.budget)}</div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Deadline: {project.deadline}</span>
                      
                      {/* Options interactives pour la démonstration */}
                      <div className="ml-auto">
                        <button 
                          onClick={() => updateProjectProgress(project.id, Math.min(100, project.progress + 5))}
                          className="text-xs bg-green-100 text-green-700 rounded px-2 py-1 hover:bg-green-200"
                        >
                          + Avancer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications récentes</h2>
              <div className="space-y-4">
                {freelanceData.notifications.length > 0 ? (
                  freelanceData.notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="mr-3">
                        <Bell className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{notification.content}</div>
                        <div className="text-xs text-gray-500 mt-1">Il y a {notification.time}</div>
                      </div>
                      <button 
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                      >
                        Marquer comme lu
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-6">
                    Aucune nouvelle notification
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceDashboard;