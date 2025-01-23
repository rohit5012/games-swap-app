import { fetchWishlist, removeFromWishlist } from "@/services/wishlistServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/hooks/useAuth";

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchWishlistData() {
      try {
        const fetchedWishlist = await fetchWishlist(userId);
        setWishlist(fetchedWishlist[0]);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlistData();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  if (
    !wishlist ||
    !wishlist.games ||
    Object.keys(wishlist.games).length === 0
  ) {
    return (
      <div className="text-center text-lg py-10">No games in wishlist</div>
    );
  }

  const handleRemoveFromWishlist = async (gameSlug: string) => {
    try {
      // Remove the game from the wishlist
      await removeFromWishlist(userId, gameSlug); // Call the remove function

      // Update the wishlist state to reflect the removed game
      setWishlist((prevWishlist) => {
        // Make a shallow copy of the wishlist object
        const updatedWishlist = { ...prevWishlist };

        // Remove the game from the wishlist by deleting the key (game slug)
        delete updatedWishlist.games[gameSlug];

        // Return the updated wishlist state
        return { ...updatedWishlist };
      });
     
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-semibold text-center mb-8 ">Your Wishlist</h2>
      <div className="flex justify-center ">
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap gap-6 justify-center ">
            {Object.values(wishlist.games).map((game) => (
              <Link className="w-full" to={`/game/${game.slug}`} key={game.slug}>
                <div className="relative flex bg-white shadow-md rounded-lg overflow-hidden w-full transition-transform transform hover:scale-105">
                  {user?.uid === userId && (
                    <div className="absolute top-[-5px] right-0 mt-2 mr-2 group cursor-pointer">
                      <div className="flex items-center opacity-30 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                        {/* Text next to the icon */}
                        <span className="text-gray-400 text-sm mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Remove from wishlist
                        </span>

                        {/* Trash Icon */}
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-gray-800 hover:text-red-500 text-lg"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to the game page
                            handleRemoveFromWishlist(game.slug);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Game Image */}
                  <div className="w-1/3 h-44">
                    <img
                      src={game.backgroundImg}
                      alt={game.gameName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Game Info */}
                  <div className="p-4 flex flex-col justify-center items-center w-2/3 text-center">
                    <h3 className="text-lg font-bold mb-2 text-black">
                      {game.gameName}
                    </h3>
                    <p className="text-gray-600">
                      Release Date:{" "}
                      {new Date(game.releaseDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Borrow Button */}
                  {/* <Button> Borrow near me </Button> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
