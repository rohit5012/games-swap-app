import { getAllGames, Game } from "../rawgApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";

export default function Searchbar() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | false>(false);

  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    getAllGames()
      .then((gameData) => {
        setAllGames(gameData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Couldn't fetch games.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      setFilteredGames(
        allGames.filter((game) =>
          game.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    } else {
      setFilteredGames([]);
    }
  }, [debouncedSearch, allGames]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search game here..."
        className="w-full p-2 border-2 border-gray-300 rounded-lg w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px]"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredGames.map((game) => (
            <li key={game.id}>
              <Link to={`/game/${game.slug}`} className="flex items-center">
                {" "}
                <p className="mr-2">{game.name}</p>{" "}
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="mt-1 max-w-13 max-h-13"
                />{" "}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
