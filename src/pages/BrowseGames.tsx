import { useEffect, useState } from "react";
import {
  Game,
  getGamesByGenre,
  getGenres,
  getPaginatedGames,
  getPlatforms,
} from "@/rawgApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { updateWishlist } from "@/services/wishlistServices";
import Pagination from "../components/ui/Pagination";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/lottie/LoadingAnimation.json";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingAnimationComponent from "@/components/LoadingAnimationComponent";

export default function BrowseGames() {
  const { user } = useAuth();
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<[] | null>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [genres, setGenres] = useState<[] | null>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [totalGames, setTotalGames] = useState(0);
  const itemsPerPage = 8;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("platform");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Helper function to handle fetching data
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      // Fetch platforms and genres
      const platformData = await getPlatforms();
      const genresData = await getGenres();
      setGenres(genresData);
      setPlatforms(platformData);

      // Fetch games based on genre or platform filter
      let gameData;
      if (selectedGenre || selectedPlatform) {
        gameData = await getGamesByGenre([selectedGenre], [selectedPlatform]);
        setDisplayedGames(gameData);
        setTotalGames(gameData.length);
      } else {
        const paginatedGames = await getPaginatedGames(
          currentPage,
          itemsPerPage
        );
        setDisplayedGames(paginatedGames.results);
        setTotalGames(paginatedGames.count);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false once fetching is complete
    }
  };

  // Trigger the fetchData function when any dependencies change
  useEffect(() => {
    if (query) {
      setSelectedPlatform(query); // Set platform if there's a query param
    }
    fetchData();
  }, [currentPage, selectedGenre, selectedPlatform]);

  async function handleAddToWishlist(game: Game) {
    if (user) {
      const newWishlistItem = {
        gameName: game.name,
        slug: game.slug,
        backgroundImg: game.background_image,
        releaseDate: game.released,
      };
      await updateWishlist(user.uid, newWishlistItem);
    }
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handlePlatformChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPlatform(event.target.value);
  };

  if (isLoading) {
    return <LoadingAnimationComponent />;
  }

  return (
    <section className="flex flex-col items-center justify-center mb-11 text-black">
      <h2 className="text-center text-3xl mb-6">All Games</h2>
      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {/* Genre Filter */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">Filter by Genre</h3>
          <select
            onChange={handleGenreChange}
            value={selectedGenre || ""}
            className="px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">All Genres</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-col items-start text-black">
          <h3 className="text-lg font-semibold mb-2">Filter by Platform</h3>
          <select
            value={selectedPlatform || ""}
            onChange={handlePlatformChange}
            className="px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">All Platforms</option>
            {platforms?.map((platform) => (
              <option key={platform.slug} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        {displayedGames.map((game) => (
          <div key={game.id} className="w-96 inline-flex pb-5">
            <Card className="card-games-body card-games">
              <Link to={`/game/${game.slug}`}>
                <CardHeader>
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-80 h-52 object-cover w-full"
                  />
                  <CardTitle>{game.name}</CardTitle>
                </CardHeader>
                <CardContent platformClassName="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">
                  {game.platforms.map((availablePlats) => (
                    <p key={availablePlats.platform.id}>
                      {availablePlats.platform.name}
                    </p>
                  ))}
                </CardContent>
              </Link>
              <CardFooter className="card-games-wishlist-button pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(game);
                  }}
                  className="black-btn bg-gray-900 text-white px-4 py-2 rounded mt-2 w-full"
                >
                  Wishlist
                </button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* <Pagination
        totalItems={totalGames}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
    </section>
  );
}
