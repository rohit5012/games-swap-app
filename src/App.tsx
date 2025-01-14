import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import BrowseGames from "./pages/BrowseGames";
import Header from "./components/Header";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/browse-games" element={<BrowseGames />} />
      </Routes>
    </>
  );
}

export default App;
