import { Route, Routes } from "react-router-dom"; // Ensure you are using react-router-dom v6
import ThemeSwitch, { ThemeProvider } from "@/components/ThemeToggle";
import Home from "./pages/Home";
import BrowseGames from "./pages/BrowseGames";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfileSetup from "./pages/UserProfileSetup";
import UserProfilePage from "./pages/UserProfilePage";
import UserList from "./components/UserList";
// import Footer from "./components/Footer";
import NewFooter from "./components/NewFooter";
import Messages from "./pages/Messages";
import MapUserProfile from "./pages/MapUserProfile";
import { Toaster } from "sonner";
import ViewProfileComponent from "./components/ViewProfile";
import ContactForm from "./pages/ContactForm";

function App() {
  return (
    <div>
      <Header />
      <ThemeProvider>
        <ThemeSwitch />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* Dynamic Route for GamePage */}
            <Route path="/game/:game_slug" element={<GamePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map/user/:id" element={<MapUserProfile />} />
            <Route path="/browse-games" element={<BrowseGames />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile-setup" element={<UserProfileSetup />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/users/:userId" element={<ViewProfileComponent />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
          {/* necessary for toaster when adding to wishlist and such */}
          <Toaster className="fixed top-4 right-4 z-50" />
        </main>
        <NewFooter />
      </ThemeProvider>
    </div>
  );
}

export default App;
