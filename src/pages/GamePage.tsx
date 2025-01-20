import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchGameDetails, Game, getGamesByGenre } from "../rawgApi";
import { Button } from "@/components/ui/Button";
import SmallCarousel from "@/components/SmallCarousel";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"; //TODO: implement wishlist from
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateWishlist } from "@/services/wishlistServices";
import { UserContext } from "@/context/Usercontext";
import { useAuth } from "@/hooks/useAuth";
import { updateOwnedGamesList } from "@/services/ownedListService";

const GamePage = () => {
  const { game_slug } = useParams<{ game_slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [platforms, setPlatforms] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGameDetails(game_slug);
        const smallCarouselGames = await getGamesByGenre(
          response.genres.map((genre) => genre.slug)
        );
        setRecommendedGames(smallCarouselGames);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!game) {
    return null; // Return nothing if no game is available
  }
  console.log("this is the user id" + user);
  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-sans">
      {/* Background Image */}
      <div className="relative w-full">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover shadow-lg mask-gradient"
        />
        <div className="absolute top-[70vh] left-8 sm:left-16 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg max-w-sm shadow-2xl z-9">
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {game.platforms?.map((platform, index) => (
              <span
                key={index}
                className="platform bg-gray-700 px-3 py-1 rounded text-sm text-gray-300"
              >
                {platform.platform.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 z-9">
            <Button
              variant="outline"
              className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-2/3"
            >
              Borrow Game
            </Button>
            <div className="relative flex flex-col items-center group cursor-pointer">
              <FontAwesomeIcon
                icon={faRegularHeart}
                className="text-xl text-gray-400 group-hover:text-red-500 group-hover:scale-125 transition-all"
                onClick={() => {
                  const newWishlistItem = {
                    gameName: game.name,
                    slug: game.slug,
                    backgroundImg: game.background_image,
                    releaseDate: game.released,
                  };
                  updateWishlist(user.uid, newWishlistItem).then(() =>
                    console.log("success!")
                  );
                }}
              />
              <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 group-hover:text-red-500 transition-all">
                Wishlist
              </span>
            </div>
            {/* TODO Potentially needs extra info (state of game/whether is lent...)*/}
            <Button
              variant="outline"
              className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-2/3"
              onClick={() => {
                const newOwnedItem = {
                  gameName: game.name,
                  slug: game.slug,
                  backgroundImg: game.background_image,
                  releaseDate: game.released,
                };
                updateOwnedGamesList(user.uid, newOwnedItem).then(() =>
                  console.log("success!")
                );
              }}
            >
              I own this game
            </Button>
          </div>
        </div>
      </div>

      {/* Game Details */}
      <div className="relative z-9 -mt-10 px-6 md:px-16">
        <div className="bg-black/80 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Genres */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Genres</h2>
              <div className="mt-2 space-y-1">
                {game.genres?.map((genre) => (
                  <p
                    key={genre.name}
                    className="bg-gray-800 px-3 py-1 rounded text-sm"
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Release Date */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Release Date</h2>
              <p className="mt-2 text-gray-300">
                {new Date(game.released).toLocaleDateString()}
              </p>
            </div>

            {/* Available Stores */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Available Stores</h2>
              <div className="mt-2 space-y-1">
                {game.stores?.map((store) => (
                  <p key={store.store.id} className="text-gray-300">
                    {store.store.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Average Playtime */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Average Playtime</h2>
              <p className="mt-2 text-gray-300">{game.playtime} hours</p>
            </div>

            {/* Rating */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Rating</h2>
              <p className="mt-2 text-gray-300">
                {game.rating ? `${game.rating} / 5` : "No rating available"}
              </p>
            </div>

            {/* Developers */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">Developers</h2>
              <div className="mt-2 space-y-1">
                {game.developers.length > 0 ? (
                  game.developers.map((dev) => (
                    <p key={dev.id} className="text-gray-300">
                      {dev.name}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300">No developers available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Description */}
      <div className="relative z-9 mt-8 px-6 md:px-16">
        <div className="bg-black/80 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Description</h1>
          <p>{game.description_raw}</p>
        </div>
      </div>

      {/* Recommended Games */}
      <div className="relative z-9 mt-8 px-6 md:px-16">
        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">We Think You'd Like</h2>
          <SmallCarousel
            games={recommendedGames}
            platforms={platforms}
            setPlatforms={setPlatforms}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
