import { Routes, Route,BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './Layouts/MainLayout';

// import signin from './pages/signin'
// import signup from './pages/signup'
// import profilfreelance from './pages/profilfreelance'
// import profilclient from './pages/profilclient'
// import dashboardfreelance from './pages/dashboardfreelance'
// import dashboardclient from './pages/dashboardclient'
// import creationprofilclient from './pages/creationprofilclient'
// import creationprofilfreelance from './pages/creationprofilfreelance'
// import creationprojet from './pages/creationprojet'
// import freelances from './pages/freelances'


const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />} >
      <Route path="/" element={<Home />} />
      </Route>
      
    </Routes>
  )
}



export default App
