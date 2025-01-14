// TODO This component has buttons (Borrow Games / Login) with no functionality as they'll need to be linked to other pages
import { Button } from "@/components/ui/Button";
import { Link } from "react-router";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex flex-row justify-between p-3 px-2 border-b border-black sticky top-0 bg-sky-100 z-10">
      <p className="text-2xl md:text-4xl">Logo</p>
      <Button variant="outline" as={Link} to="/map">
        Borrow Games near me
      </Button>
      <Searchbar />
      <Button variant="outline" as={Link} to="/login">
        Login
      </Button>
    </header>
  );
}
// Unsure whether the Link would be functional as it is
