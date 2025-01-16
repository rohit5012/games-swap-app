import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/Usercontext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <UserProvider>
    <App />
  </UserProvider>
  </BrowserRouter>,
);
