import { useEffect, useState } from "react";
import { Game, getAllGames, getPaginatedGames } from "@/rawgApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { updateWishlist } from "@/services/wishlistServices"; 
import Pagination from "../components/ui/Pagination"; 

export default function BrowseGames() {
  const { user } = useAuth(); 
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGames, setTotalGames] = useState(0); 
  const itemsPerPage = 8; 

  // useEffect(() => {
  //   getAllGames().then((gameData) => {
  //     setDisplayedGames(gameData);
  //   });
  // }, []);
  useEffect(() => {
    getPaginatedGames(currentPage, itemsPerPage).then((gameData) => {
      setDisplayedGames(gameData.results);
      setTotalGames(gameData.count); 
    });
  }, [currentPage]); 

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="flex flex-col items-center justify-center mb-11">
      <h2 className="text-center text-3xl mb-6">All Games</h2>
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

      <Pagination
        totalItems={displayedGames.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
