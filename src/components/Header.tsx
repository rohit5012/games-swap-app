import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";
import Searchbar from "./Searchbar";
import { useAuth } from "@/hooks/useAuth";
import Logout from "@/pages/Logout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { PiGameControllerLight } from "react-icons/pi";

interface HeaderProps {
  userProfileImage?: string;
}

const Header: React.FC<HeaderProps> = ({ userProfileImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userPFP, setUserPFP] = useState(null)
  const { user } = useAuth();

  useEffect(() => {
      if (user) {
        const fetchUserProfile = async () => {
          const q = query(
            collection(db, "user details"),
            where("userId", "==", user.uid) 
          );
    
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserPFP(userData.avatarUrl)
          } else {
            console.log("No user found with that ID");
          }
        };
        fetchUserProfile();
      }
    }, [user]);
  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-5 lg:gap-0 items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-primary">
              <PiGameControllerLight size={55} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/map" className={buttonVariants({ variant: "map" })}>
              Borrow Games
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <Searchbar />
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex flex-row gap-4">
                <a href="/user-profile" className="flex items-center space-x-2">
                  <img
                    src={
                      userPFP ||
                      "https://t3.ftcdn.net/jpg/01/12/43/90/360_F_112439016_DkgjEftsYWLvlYtyl7gVJo1H9ik7wu1z.jpg"
                    }
                    alt="User profile"
                    className="w-8 h-8 rounded-full object-cover hover:outline hover:outline-2 hover:outline-green-500"
                  />
                  <span className="text-foreground hover:underline">{user.displayName}</span>
                </a>
                <Logout />
              </div>
            ) : (
              <Link
                className={buttonVariants({
                  variant: "outline",
                })}
                to="/login"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-muted">
            <div className="flex flex-col gap-2 px-2 space-y-1">
              <Link to="/map" className={buttonVariants({ variant: "map" })}>
                Borrow Games
              </Link>
              {user ? (
                <>
                  <Logout />
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                    })}
                    to="/user-profile"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <Link
                  className={buttonVariants({
                    variant: "outline",
                  })}
                  to="/login"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="px-2 pt-4 pb-3">
            <Searchbar />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
