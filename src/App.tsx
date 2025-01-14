import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import BrowseGames from "./pages/BrowseGames";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-games" element={<BrowseGames />} />
      </Routes>
    </>

  );
}

export default App;
