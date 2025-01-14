import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import PopularGamesFullList from "../src/pages/PopularGamesFullList";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular-games" element={<PopularGamesFullList />} />
      </Routes>
    </>

  );
}

export default App;
