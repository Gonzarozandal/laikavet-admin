import { Routes, Route } from "react-router-dom";
import Homepages from "./pages/Homepages.jsx";
import HistorialClinicaPage from "./pages/HistorialClinicaPage.jsx";
import FormUsersPage from "./Components/FormUsers.jsx";
import MascotasPage from "./pages/MascotasPage.jsx";
import UserDetailPage from "./pages/UserDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Homepages />} />
      <Route
        path="/HistorialClinicaPage"
        element={
          <PrivateRoute>
            <HistorialClinicaPage />
          </PrivateRoute> 
        }
      />
      <Route
        path="/MascotasPage"
        element={
          <PrivateRoute>
            <MascotasPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/FormUsersPage"
        element={
          <PrivateRoute>
            <FormUsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuario/:userId"
        element={
          <PrivateRoute>
            <UserDetailPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
