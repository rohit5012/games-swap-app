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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const OtherPPLWishlist = ({ userId, username }) => {
  const [ownedGames, setOwnedGames] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(`Hello ${username}`);
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
                </Link>

                <Dialog>
                  <DialogTrigger className="inline-block z-10 bg-black text-white justify-center flex items-center min-w-28 max-h-[90vh]">
                    {game.lendable ? (
                      <strong>Ask to Borrow</strong>
                    ) : (
                      <strong>Message</strong>
                    )}
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto p-6 bg-white rounded-md shadow-lg">
                    <DialogHeader>
                      <DialogTitle>
                        {game.lendable ? (
                          <p>
                            Would you like to borrow {game.gameName} from{" "}
                            {username}?
                          </p>
                        ) : (
                          <p>Hmmm... seems like this is unavailable</p>
                        )}
                      </DialogTitle>
                      <DialogDescription>
                        {game.lendable ? (
                          <div>
                            {" "}
                            <p>Terms and conditions</p>
                            <ol className="list-decimal ml-6">
                              <li>
                                Borrowing Agreement: By initiating a borrowing
                                request, you acknowledge and agree to comply
                                with these terms and any additional rules set by
                                the lending user. Borrowed games are intended
                                for personal, non-commercial use only.
                              </li>
                              <li>
                                Condition of Borrowed Games: The lending user is
                                responsible for ensuring the game is functional
                                and in good condition at the time of lending.
                                Borrowers are encouraged to inspect games upon
                                receipt and notify the lender of any noticeable
                                damage or issues immediately.
                              </li>
                              <li>
                                Responsibility for Damage: As the borrower, you
                                are fully responsible for any damage, loss, or
                                theft of the borrowed game while it is in your
                                possession. If the game is returned in a damaged
                                condition, the lender may request compensation
                                for repairs or replacement, as agreed upon
                                between you and the lender.
                              </li>
                              <li>
                                Liability Disclaimer: Our platform facilitates
                                connections between users and does not own or
                                inspect the games shared. We are not liable for:
                                Damage to games caused by borrowers. Issues
                                arising from the misuse of a game. Personal
                                injuries, property damage, or other harm
                                resulting from a game obtained through our
                                platform.
                              </li>
                              <li>
                                Return Policy: Borrowed games must be returned
                                to the lender by the agreed-upon date. Late
                                returns may result in penalties as outlined by
                                the lender or platform policies. Games should be
                                returned in the same condition as received,
                                apart from reasonable wear and tear.
                              </li>
                              <li>
                                Code of Conduct: Respectful communication is
                                required between borrowers and lenders.
                                Borrowers must not engage in fraudulent
                                activities, including failing to return games or
                                returning altered or substituted items.
                              </li>
                              <li>
                                Dispute Resolution: In case of disputes,
                                borrowers and lenders should first attempt to
                                resolve the issue amicably. If a resolution
                                cannot be reached, our platform may provide
                                guidance, but we do not mediate disputes or
                                enforce agreements between users. By using the
                                platform, you agree to indemnify and hold us
                                harmless from any claims, damages, or
                                liabilities arising from your borrowing
                                activities.
                              </li>
                              <li>
                                Platform Role and Indemnification: Our platform
                                acts solely as a facilitator for connections
                                between users and does not guarantee the
                                quality, condition, or authenticity of any
                                games.
                              </li>
                              <li>
                                Termination of Access: Violation of these terms
                                may result in suspension or termination of your
                                account.
                              </li>
                            </ol>
                            <p>
                              By borrowing a game, you confirm that you have
                              read, understood, and agreed to these terms. If
                              you have any questions or concerns, please contact
                              our support team. Happy gaming! 🎮
                            </p>
                          </div>
                        ) : (
                          <p>
                            {" "}
                            If you wish to borrow {game.gameName} from{" "}
                            {username} you might have to wait for this to be
                            available again, feel free to send them a message!
                          </p>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link to={`/messages`} key="link">
                        <Button
                          type="submit"
                          onClick={() =>
                            console.log(
                              "Success! You are on your way to borrowing."
                            )
                          }
                        >
                          Confirm
                        </Button>
                      </Link>
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
