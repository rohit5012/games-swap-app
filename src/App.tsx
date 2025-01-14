import { Route, Routes } from "react-router-dom"; // Ensure you are using react-router-dom v6
import Home from "./pages/Home";
import PopularGamesFullList from "../src/pages/PopularGamesFullList";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular-games" element={<PopularGamesFullList />} />
        {/* Dynamic Route for GamePage */}
        <Route path="/game/:game_slug" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
