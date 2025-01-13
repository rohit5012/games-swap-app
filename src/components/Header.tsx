import { Button } from "@mui/material";
import Searchbar from "./Searchbar";

const Header: React.FC = () => {
  return (
    <header className="flow-root">
      <p className="float-left">Logo</p>
      <Button variant="outlined" className="float-left">
        Borrow Games near me
      </Button>
      <Searchbar />
      <Button variant="outlined" className="float-right">
        Log in
      </Button>
    </header>
  );
};

export default Header;
