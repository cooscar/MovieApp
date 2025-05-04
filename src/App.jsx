import "./css/App.css";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/navbar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/MovieApp/home" element={<Home />} />
          <Route path="/MovieApp/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;