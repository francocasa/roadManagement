import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
