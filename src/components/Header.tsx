import { buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";
import Searchbar from "./Searchbar";
import AuthStatus from "./ui/AuthStatus";
import Logout from "@/pages/Logout";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex flex-row justify-between p-3 px-2 border-b border-black sticky top-0 bg-sky-100 z-10">
      <Link to="/home">
        <img
          className="w-16 sm:w-20 md:w-24 lg:w-28"
          src="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png"
          alt="logo-placeholder"
        />
      </Link>
      <Link
        className={buttonVariants({ variant: "outline", size: "responsive" })}
        to="/map"
      >
        Borrow Games
      </Link>
      <Searchbar />
      <AuthStatus />
      {user ? (
        <Logout />
      ) : (
        <div className="flex flex-col">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "responsive",
            })}
            to="/login"
          >
            Login
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "responsive",
            })}
            to="/register"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
