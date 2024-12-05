import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// Simulamos una función de autenticación

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    // Si el usuario está autenticado, guarda el token en localStorage
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        sessionStorage.setItem("authToken", token);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // function App() {
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        {/* Ruta pública */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Ruta protegida */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/profile" />}
        />
        {/* Ruta protegida */}
        <Route
          path="/maps"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/profile" />}
        />
        {/* Ruta protegida */}
        <Route
          path="/lists"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/profile" />}
        />
        {/* Redirigir a login si la ruta no existe */}
        <Route path="/" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>
  );
};

export default App;
