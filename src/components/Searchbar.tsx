// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";
import { getAllGames, Game } from "../rawgApi";
import { useEffect, useState } from "react";
// import { Link } from "react-router";
// TODO Is it possible to add a debounce with lodash?

export default function Searchbar() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | false>(false);

  useEffect(() => {
    getAllGames()
      .then((gameData) => {
        setAllGames(gameData);
        setFilteredGames(gameData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Couldn't fetch games.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredGames(
        allGames.filter((game) =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredGames([]);
    }
  }, [searchQuery, allGames]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a game..."
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredGames.map((game) => (
            <li key={game.id}>
              <p>{game.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// We will have to change line 56 to something like <Link to={`PATH/ENDPOINT`}> {game.name} </Link> once Nadim completes the SingleGame page
