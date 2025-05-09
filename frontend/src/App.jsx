import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './Layouts/MainLayout';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './contexts/AuthContext';
import Profilfreelance from './pages/Profilfreelance';
// import profilclient from './pages/profilclient'
import Dashboardfreelance from './pages/Dashboardfreelance';
// import dashboardclient from './pages/dashboardclient'
// import creationprofilclient from './pages/creationprofilclient'
import Creationprofilfreelance from './pages/Creationprofilfreelance';
// import creationprojet from './pages/creationprojet'
// import freelances from './pages/freelances'
import ProjectSearchPage from './pages/Projet'
import About from './pages/About';
import Freelance from './pages/Freelance';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/profil-freelance" element={<Profilfreelance />} />
          <Route path="/creation-profil-freelance" element={<Creationprofilfreelance />} />
          <Route path="/dashboard-freelance" element={<Dashboardfreelance />} />
          <Route path="/projet" element={<ProjectSearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/freelance" element={<Freelance />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
