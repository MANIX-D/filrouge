import { Routes, Route,BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './Layouts/MainLayout';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './contexts/AuthContext';
import Profilfreelance from './pages/profilfreelance'
// import profilclient from './pages/profilclient'
// import dashboardfreelance from './pages/dashboardfreelance'
// import dashboardclient from './pages/dashboardclient'
// import creationprofilclient from './pages/creationprofilclient'
// import creationprofilfreelance from './pages/creationprofilfreelance'
// import creationprojet from './pages/creationprojet'
// import freelances from './pages/freelances'


const App = () => {
  return (
    <>
   <AuthProvider>
    <Routes>
      <Route element={<MainLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/inscription" element={<SignupPage />} />
      <Route path="/profilfreelance" element={<Profilfreelance />} />
      </Route>
      
    </Routes>
    </AuthProvider>
    </>
  )
}



export default App
