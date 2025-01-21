import { fetchWishlist } from "@/services/wishlistServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-8">Your Wishlist</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap gap-6 justify-center ">
            {Object.values(wishlist.games).map((game) => (
              <Link to={`/game/${game.slug}`} key={game.slug}>
                <div className="flex bg-white shadow-md rounded-lg overflow-hidden w-full transition-transform transform hover:scale-105">
                  <img
                    src={game.backgroundImg}
                    alt={game.gameName}
                    className="w-1/3 h-auto object-cover"
                  />
                  <div className="p-4 flex flex-col justify-center items-center w-2/3 text-center">
                    <h3 className="text-lg font-bold mb-2 text-black">
                      {game.gameName}
                    </h3>
                    <p className="text-gray-600">
                      Release Date:{" "}
                      {new Date(game.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button> Borrow near me</Button>
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
