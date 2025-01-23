import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { fetchOwnedList, removeFromOwnedlist, toggleLendable } from "@/services/ownedListService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const OwnedList = ({ userId }) => {
  const [ownedGames, setOwnedGames] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwnedGamesData() {
      try {
        const fetchedOwnedlist = await fetchOwnedList(userId);
        setOwnedGames(fetchedOwnedlist[0]);
      } catch (error) {
        console.error("Error fetching owned games list:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOwnedGamesData();
  }, [userId]);

  const handleToggleLendable = async (slug) => {
    try {
      const updatedStatus = await toggleLendable(userId, slug);

      //rerenders page with information
      setOwnedGames((prev) => ({
        ...prev,
        games: {
          ...prev.games,
          [slug]: {
            ...prev.games[slug],
            lendable: updatedStatus,
          },
        },
      }));
    } catch (error) {
      console.error("Error toggling lendable status:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  if (
    !ownedGames ||
    !ownedGames.games ||
    Object.keys(ownedGames.games).length === 0
  ) {
    return (
      <div className="text-center text-lg py-10">
        No games in owned games list
      </div>
    );
  }

  const handleRemoveFromOwnedList = async (gameSlug: string) => {
      try {
        // Remove the game from the wishlist
        await removeFromOwnedlist(userId, gameSlug); // Call the remove function
  
        // Update the wishlist state to reflect the removed game
        setOwnedGames((prevOwnedlist) => {
          // Make a shallow copy of the wishlist object
          const updatedOwnedGames = { ...prevOwnedlist };
  
          // Remove the game from the wishlist by deleting the key (game slug)
          delete updatedOwnedGames.games[gameSlug];
  
          // Return the updated wishlist state
          return { ...updatedOwnedGames };
        });
       
      } catch (error) {
        console.error("Error:", error);
      }
    };



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Your Owned Games
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.values(ownedGames.games).map((game) => (
              <div
                key={game.slug}
                className="flex bg-white shadow-md rounded-lg overflow-hidden w-full transition-transform transform hover:scale-105"
              >



<div className="absolute top-[-5px] left-[70%] mt-2 mr-2 group cursor-pointer">
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
                                          handleRemoveFromOwnedList(game.slug);
                                        }}
                                      />
                                    </div>
                                  </div>

                
                <Link to={`/game/${game.slug}`} className="w-1/3 h-44">
                  <img
                    src={game.backgroundImg}
                    alt={game.gameName}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <Link
                  to={`/game/${game.slug}`}
                  className="p-4 flex flex-col justify-center items-center w-2/3 text-center"
                >
                  <h3 className="text-lg font-bold mb-2 text-black">
                    {game.gameName}
                  </h3>
                  <p className="text-gray-600">
                    Release Date:{" "}
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    {game.lendable ? (
                      <span className="text-green-600 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} />
                        Lendable
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTimes} />
                        Not Lendable
                      </span>
                    )}
                  </div>
                </Link>

                <Dialog>
                  
                  <DialogTrigger className="inline-block z-10 bg-black text-white justify-center flex items-center min-w-28">
                    {game.lendable ? (
                      <strong>Unlist item</strong>
                    ) : (
                      <strong>Lend your game</strong>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Would you like to lend your game?
                      </DialogTitle>
                      <DialogDescription>
                        Terms and conditions?#placeholder
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleToggleLendable(game.slug)}
                        >
                          Confirm
                        </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedList;
