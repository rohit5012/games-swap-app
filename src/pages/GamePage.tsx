import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  fetchGameDetails,
  Game,
  getGamesByGenre,
  getGameScreenshots,
} from "../rawgApi";
import { Button } from "@/components/ui/Button";
import SmallCarousel from "@/components/SmallCarousel";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchWishlist, removeFromWishlist, updateWishlist } from "@/services/wishlistServices";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { updateOwnedGamesList } from "@/services/ownedListService";
import { fetchYouTubeTrailers } from "@/YoutubeApi";
import YouTube from "react-youtube";

const GamePage = () => {
  const { game_slug } = useParams<{ game_slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [platforms, setPlatforms] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [screenshots, setScreenshots] = useState<[]>([]);
  const [videos, setVideos] = useState({});
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isWishlisted, setWishlisted] = useState(false)
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGameDetails(game_slug);
        const fetchedScreenShots = await getGameScreenshots(response.id);

        
        // Fetch wishlist and log the result
        if (user && user.uid) {
          const wishlist = await fetchWishlist(user.uid);
          if (wishlist[0].games[game_slug]){
            setWishlisted(true)
          }
        }
  
        const smallCarouselGames = await getGamesByGenre(
          response.genres.map((genre) => genre.slug)
        );
  
        setRecommendedGames(smallCarouselGames);
        setScreenshots(fetchedScreenShots);
        if (fetchedScreenShots.length > 0) {
          setSelectedScreenshot(fetchedScreenShots[0].image);
        }
  
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
  }, [game_slug, user]); 
  
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

  const handleThumbnailClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };


  const handleAddToOwnedGames = () => {
    const newOwnedItem = {
      gameName: game.name,
      slug: game.slug,
      backgroundImg: game.background_image,
      releaseDate: game.released,
    };

    toast.success(
      <div className="flex items-center space-x-4">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-12 h-12 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold">{game.name} added to owned games</p>
        </div>
      </div>,
      {
        duration: 2000,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo owned games action"),
        },
      }
    );

    updateOwnedGamesList(user.uid, newOwnedItem).then(() => console.log("success!"));
  };




  const handleAddToWishlist = () => {
    const newWishlistItem = {
      gameName: game.name,
      slug: game.slug,
      backgroundImg: game.background_image,
      releaseDate: game.released,
    };

    toast.success(
      <div className="flex items-center space-x-4">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-12 h-12 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold">{game.name} added to wishlist</p>
        </div>
      </div>,
      {
        duration: 2000,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo wishlist action"),
        },
      }
    );

    updateWishlist(user.uid, newWishlistItem)
      .then(() => console.log("success!"))
      .catch((error) => {
        toast.error("Failed to add game to wishlist.", { description: error.message });
        console.error("Error updating wishlist:", error);
      });
  };


  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-sans">
      {/* Background Image */}
      <div className="relative w-full">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover shadow-lg mask-gradient"
        />

        {/* Game Info Container (conditionally rendered) */}
        {/* Desktop view */}
        <div className="absolute left-8 top-[70vh] sm:left-16 lg:block hidden p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg max-w-sm shadow-2xl z-10">
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
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
            <Button
              variant="outline"
              className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-full sm:w-2/3"
            >
              Borrow Game
            </Button>
            <Button
              variant="outline"
              className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-full sm:w-2/3 mt-5 sm:mt-0 sm:ml-5"
              onClick={() => handleAddToOwnedGames()}

              
            >
              I own this game
            </Button>
            <div className="relative flex flex-col items-center group cursor-pointer mt-5 sm:mt-0 ml-5">

  <FontAwesomeIcon
    icon={isWishlisted ? faSolidHeart : faRegularHeart} // Use solid heart if wishlisted
    className={`text-xl ${
      isWishlisted ? "text-red-500" : "text-gray-400"
    } group-hover:scale-125 transition-all `}
    onClick={() => {
      if (isWishlisted) {
        // Remove from wishlist
        setWishlisted(false)
        removeFromWishlist(user?.uid, game.slug).then(() => console.log("success!"))
      } else {
        // Add to wishlist
        handleAddToWishlist();
        setWishlisted(true); // Update state after adding
      }
    }}
  />
  <span
    className={`text-xs mt-1 ${
      isWishlisted ? "text-red-500" : "text-gray-400 opacity-0 group-hover:opacity-100 "
    } transition-all`}
  >
    {"Wishlist"}
  </span>
</div>

          </div>
        </div>
  







  
        {/* Mobile view */}
<div className="lg:hidden block p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg max-w-sm mx-auto shadow-2xl z-10 mt-4">
  <h1 className="text-3xl font-bold mb-4 text-center">{game.name}</h1>
  <div className="mt-2 flex flex-wrap gap-2 justify-center">
    {game.platforms?.map((platform, index) => (
      <span
        key={index}
        className="platform bg-gray-700 px-3 py-1 rounded text-sm text-gray-300"
      >
        {platform.platform.name}
      </span>
    ))}
  </div>

  <div className="flex flex-col items-center justify-between mt-6">
    {/* Borrow Game Button */}
    <Button
      variant="outline"
      className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-full mb-4"
      onClick={() => {
        // Add any specific logic for borrowing the game
      }}
    >
      Borrow Game
    </Button>

    {/* I Own This Game Button */}
    <Button
      variant="outline"
      className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all w-full mb-4"
      onClick={() => handleAddToOwnedGames()}
    >
      I own this game
    </Button>

    {/* Wishlist Icon and Text */}
    <div className="relative flex flex-col items-center group cursor-pointer mt-5">
      <FontAwesomeIcon
        icon={isWishlisted ? faSolidHeart : faRegularHeart} // Use solid heart if wishlisted
        className={`text-xl ${
          isWishlisted ? "text-red-500" : "text-gray-400"
        } group-hover:scale-125 transition-all`}
        onClick={() => {
          if (isWishlisted) {
            // Remove from wishlist
            setWishlisted(false);
            removeFromWishlist(user?.uid, game.slug).then(() =>
              console.log("Game removed from wishlist!")
            );
          } else {
            // Add to wishlist
            handleAddToWishlist();
            setWishlisted(true); // Update state after adding
          }
        }}
      />
      <span
        className={`text-xs mt-1 ${
          isWishlisted
            ? "text-red-500"
            : "text-gray-400 opacity-0 group-hover:opacity-100"
        } transition-all`}
      >
        Wishlist
      </span>
    </div>
  </div>
</div>


      </div>

      {/* Game Details */}
      <div className="relative z-9 mt-10 px-6 md:px-16">
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

      {/* Screenshots Section */}
      <div className="relative z-9 mt-8 px-6 md:px-16 flex justify-center">
        <div className="bg-black/80 p-8 rounded-lg shadow-lg max-w-5xl w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Screenshots
          </h2>
          {screenshots.length > 0 ? (
            <div className="flex flex-col md:flex-row justify-center items-center">
              {/* Thumbnails (Vertical Sidebar for Desktop, Top Bar for Mobile) */}
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-96 pr-4 md:p-5">
                {screenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.id}
                    onClick={() => setSelectedScreenshot(screenshot.image)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden shadow-md transition-transform ${
                      selectedScreenshot === screenshot.image
                        ? "ring-2 ring-blue-500 scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    <img
                      src={screenshot.image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Screenshot Display */}
              <div className="flex justify-center items-center mt-4 md:mt-0 md:ml-8 w-full max-w-3xl p-4 bg-black/70 rounded-lg shadow-lg">
                <img
                  src={selectedScreenshot}
                  alt="Selected Screenshot"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No screenshots available.
            </p>
          )}
        </div>
      </div>

      <div className="relative z-9 mt-8 px-6 md:px-16 flex justify-center">
        <div className="bg-black/80 p-8 rounded-lg shadow-lg w-full max-w-7xl h-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">
            YouTube Trailers
          </h2>
          {videos.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-96 md:max-w-[150px]">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(video.videoId)}
                    className={`min-w-[75px] min-h-[75px] md:min-w-[100px] md:min-h-[100px] aspect-square rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-110 
                    ${
                      selectedVideoId === video.videoId
                        ? "ring-4 ring-blue-500"
                        : ""
                    }`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                      alt={`Thumbnail for ${video.title}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>

              {/* Main Video Display */}
              <div class="bg-black/70 rounded-lg shadow-lg h-96">
                {selectedVideoId ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <YouTube
                      videoId={selectedVideoId}
                      opts={{ height: "100%", width: "100%" }}
                    />
                  </div>
                ) : (
                  <div className="p-4 flex items-center justify-center">
                    <p className="text-gray-400 text-center">
                      Select a trailer to watch.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No trailers available. (WIP) permissions are hard...
            </p>
          )}
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
