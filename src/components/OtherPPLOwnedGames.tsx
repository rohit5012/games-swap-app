import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { fetchOwnedList, toggleLendable } from "@/services/ownedListService";
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

const OtherPPLWishlist = ({ userId, username }) => {
  const [ownedGames, setOwnedGames] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(`Hello ${username}`)
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-8">
        {`${username.trim()}'s games`}
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.values(ownedGames.games).map((game) => (
              <div
                key={game.slug}
                className="flex bg-white shadow-md rounded-lg overflow-hidden w-full transition-transform transform hover:scale-105"
              >
                <img
                  src={game.backgroundImg}
                  alt={game.gameName}
                  className="w-1/3 h-auto object-cover"
                />
                <div className="p-4 flex flex-col justify-center items-center w-2/3 text-center">
                  <h3 className="text-lg font-bold mb-2">{game.gameName}</h3>
                  <p className="text-gray-600">
                    Release Date:{" "}
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    {game.lendable ? (
                      <span className="text-green-600 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} />
                        This game is available!
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTimes} />
                        This is unavailable...
                      </span>
                    )}
                  </div>
                </div>

                <Dialog>
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="inline-block z-10 bg-black text-white justify-center flex items-center min-w-28"
                  >
                    <DialogTrigger>
                      {game.lendable ? (<strong>Ask to Borrow</strong>) :(<strong>Message</strong>)}
                    </DialogTrigger>
                  </a>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Would you like to borrow {game.gameName}?
                      </DialogTitle>
                      <DialogDescription>
                        Terms and conditions?#placeholder
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => console.log("success! You are on your way to borrowing ")}
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

export default OtherPPLWishlist;
