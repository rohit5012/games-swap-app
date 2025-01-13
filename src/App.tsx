import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import PopularGamesFullList from "../src/pages/PopularGamesFullList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular-games" element={<PopularGamesFullList />} />
    </Routes>
  );
}

export default App;
