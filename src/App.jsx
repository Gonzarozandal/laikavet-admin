import { Routes, Route } from 'react-router-dom';  
import Homepages from './pages/Homepages.jsx';
import HistorialClinicaPage from './pages/HistorialClinicaPage.jsx';
import FormUsersPage from './Components/FormUsers.jsx';

function App() {
  return (
    <Routes>    
      <Route path='/' element={<Homepages/>} />
      <Route path="/HistorialClinicaPage" element={<HistorialClinicaPage />} />
      <Route path="/FormUsersPage" element={<FormUsersPage />} />
      
    </Routes>
  );
}

export default App;
