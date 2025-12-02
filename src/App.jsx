import { Routes, Route } from "react-router-dom";
import Homepages from "./pages/Homepages.jsx";
import HistorialClinicaPage from "./pages/HistorialClinicaPage.jsx";
import FormUsersPage from "./Components/FormUsers.jsx";
import MascotasPage from "./pages/MascotasPage.jsx";
import UserDetailPage from "./pages/UserDetailPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepages />} />
      <Route path="/HistorialClinicaPage" element={<HistorialClinicaPage />} />
      <Route path="/MascotasPage" element={<MascotasPage />} />
      <Route path="/FormUsersPage" element={<FormUsersPage />} />
      <Route path="/usuario/:userId" element={<UserDetailPage />} />
    </Routes>
  );
}

export default App;
