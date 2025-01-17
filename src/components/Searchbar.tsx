import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { getGamesBySearch, Game } from "../rawgApi"; // Ensure this function is implemented
import { useDebounce } from "@/hooks/useDebounce";

export default function Searchbar() {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(searchValue, 1000);

  // Fetch games from the API when debouncedSearch changes
  useEffect(() => {
    const fetchGames = async () => {
      if (!debouncedSearch) {
        setFilteredGames([]); // Clear results if search input is empty
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        const games = await getGamesBySearch(debouncedSearch);
        setFilteredGames(games);
        setIsDropdownVisible(true); // Show dropdown when results are available
      } catch (err) {
        setError("Couldn't fetch games.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleGameClick = () => {
    setIsDropdownVisible(false); // Close dropdown on game selection
    setSearchValue(""); // Optional: Clear search value
  };

  return (
    <div className="relative w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] mx-auto">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search game here..."
        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {isDropdownVisible && !isLoading && !error && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {filteredGames.length > 0 ? (
            <ul>
              {filteredGames.map((game) => (
                <li
                  key={game.id}
                  onClick={handleGameClick}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Link to={`/game/${game.slug}`} className="flex items-center">
                    <p className="mr-2">{game.name}</p>
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">No games found.</p>
          )}
        </div>
      )}
    </div>
  );
}
