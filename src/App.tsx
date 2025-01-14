import { Route, Routes } from "react-router-dom"; // Ensure you are using react-router-dom v6
import Home from "./pages/Home";
import BrowseGames from "./pages/BrowseGames";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import MapPage from "./pages/MapPage";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Dynamic Route for GamePage */}
        <Route path="/game/:game_slug" element={<GamePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/browse-games" element={<BrowseGames />} />
      </Routes>
    </>
  );
}

export default App;
