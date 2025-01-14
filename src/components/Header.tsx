import { Button } from "@mui/material";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex flex-row justify-between p-3 px-2 border-b border-black sticky top-0 bg-sky-100">
      <p className="text-2xl md:text-4xl">Logo</p>
      <Button variant="outlined">Borrow Games near me</Button>
      <Searchbar />
      <Button variant="outlined">Log in</Button>
    </header>
  );
}
