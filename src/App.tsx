import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <Routes>
      <Header />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
