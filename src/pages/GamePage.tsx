import { useEffect, useState } from "react";
import { useParams } from "react-router"; // Use this to capture dynamic URL parameters
import { fetchGameDetails, Game, getGamesByGenre } from "../rawgApi";
import { Button } from "@/components/ui/Button";
import SmallCarousel from "@/components/SmallCarousel";



const GamePage = () => {
  const { game_slug } = useParams<{ game_slug: string }>(); // Get the dynamic game_slug from the URL
  const [game, setGame] = useState<Game | null>(null);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [platforms, setPlatforms] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGameDetails(game_slug);
        const smallCarouselGames = await getGamesByGenre(response.genres.map((genre) => genre.slug))
        setRecommendedGames(smallCarouselGames)
        setGame(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch game details. Please try again later.");
        setLoading(false);
      }
    };

    if (game_slug) {
      fetchData();
    }
  }, [game_slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!game) {
    return null; // Return nothing if no game is available
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white font-sans z-[-1]">
      {/* Game Banner */}
      <div className="relative w-full h-[110vh] mb-[-30px] text-1xl">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover shadow-lg mask-gradient"
        />
        <div className="absolute top-[5vh] left-5 bg-black/70 text-white p-8 w-[25%] h-[40vh] rounded-xl shadow-xl z-9">
          <h1 className="text-2xl font-bold">{game.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {game.platforms?.map((platform, index) => (
              <span
                key={index}
                className="platform bg-gray-800 px-2 py-1 rounded text-sm"
              >
                {platform.platform.name}
              </span>
            ))}
          </div>
          <Button variant="outline" className="bg-black mt-[10px]">
            Borrow game
          </Button>
        </div>
      </div>

      {/* Game Details Grid */}
      <div className="mt-[-10vh] w-[70%] max-w-4xl mx-auto px-6 py-8 bg-black bg-opacity-70 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Genres */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">Genres</h2>
            <div className="space-y-2">
              {game.genres?.map((genre) => (
                <p
                  key={genre.name}
                  className="platform bg-gray-800 px-2 py-1 rounded text-sm"
                >
                  {genre.name}
                </p>
              ))}
            </div>
          </div>

          {/* Release Date */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">Release Date</h2>
            <p className="text-gray-300">
              {new Date(game.released).toLocaleDateString()}
            </p>
          </div>

          {/* Available Stores */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">
              Available Stores
            </h2>
            <div className="space-y-2">
              {game.stores?.map((store) => (
                <p key={store.store.id} className="text-gray-300 text-center">
                  {store.store.name}
                </p>
              ))}
            </div>
          </div>

          {/* Average Playtime */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">
              Average Playtime
            </h2>
            <p className="text-gray-300">{game.playtime} hours</p>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">Rating</h2>
            <p className="text-gray-300">
              {game.rating ? `${game.rating} / 5` : "No rating available"}
            </p>
          </div>

          {/* Developers */}
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-semibold text-center">Developers</h2>
            {game.developers.length > 0 ? (
              <div className="space-y-2">
                {game.developers.map((dev) => (
                  <p key={dev.id} className="text-gray-300 text-center">
                    {dev.name}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-300 text-center">
                No developers available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Game Description */}
      <div className="max-w-3xl mx-auto px-6 py-8 bg-black bg-opacity-70 rounded-lg shadow-lg mt-4">
        <h1 className="text-3xl font-bold mb-4">Description</h1>
        <p className="mb-4">{game.description_raw}</p>
      </div>

      {/* Recommended Games */}
      <div className="max-w-3xl mx-auto px-6 py-8 mt-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">We think you would like</h2>
       
      </div>
      <div className="w-[100%]">
      <SmallCarousel
                  games={recommendedGames}
                  platforms={platforms}
                  setPlatforms={setPlatforms}
                />
      </div>
      
    </div>
    
  );
};

export default GamePage;
