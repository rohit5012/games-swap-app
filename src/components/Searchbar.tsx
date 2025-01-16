import { getAllGames, Game } from "../rawgApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
        placeholder="Search game here..."
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredGames.map((game) => (
            <li key={game.id}>
              <Link to={`/game/${game.slug}`}>
                <p>{game.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
