import { useEffect, useState } from "react";
import { Game, getAllGames } from "@/rawgApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function BrowseGames() {
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  useEffect(() => {
    getAllGames().then((gameData) => {
      setDisplayedGames(gameData);
    });
  }, []);

  // const [games, setGames] = useState<Game[]>([]);
  // const [visibleGames, setVisibleGames] = useState(2);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;

  //     if (width < 640) {
  //       setVisibleGames(2);
  //     } else if (width < 768) {
  //       setVisibleGames(3);
  //     } else if (width < 1024) {
  //       setVisibleGames(4);
  //     } else {
  //       const blockMinWidth = 200;
  //       const blocks = Math.floor((width - 16) / (blockMinWidth + 16));
  //       setVisibleGames(blocks);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <section>
      <h2 className="text-center text-2xl mb-6">All Games</h2>
      <div>
        {displayedGames.map((game) => {
          return (
            <Link
              to={`/game/${game.slug}`}
              key={game.id}
              className="w-96 inline-flex pb-5"
            >
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{game.name}</CardTitle>
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-80 h-52 object-cover"
                    ></img>
                  </CardHeader>
                  <CardContent>
                    {game.platforms.map((availablePlats) => (
                      <p key={availablePlats.platform.id}>
                        {availablePlats.platform.name}
                      </p>
                    ))}
                  </CardContent>
                  {/* <CardFooter>
                  <p>Card Footer</p>
                </CardFooter> */}
                </Card>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
    // <section className="my-6">
    //   <h2 className="text-center text-2xl mb-6">Popular Games</h2>

    //   <div>
    //     {Array.from({ length: 7 }).map((_, rowIndex) => (
    //       <div
    //         key={rowIndex}
    //         className="flex justify-start gap-4 mb-4 overflow-hidden"
    //       >
    //         {games
    //           .slice(rowIndex * visibleGames, (rowIndex + 1) * visibleGames)
    //           .map((game) => (
    //             <div
    //               key={game.id}
    //               className="flex-shrink-0"
    //               style={{
    //                 width: `calc((100% - ${
    //                   (visibleGames - 1) * 16
    //                 }px) / ${visibleGames})`,
    //               }}
    //             >
    //               <img
    //                 src={game.background_image}
    //                 alt={game.name}
    //                 className="rounded mb-2 w-full h-56 object-cover"
    //               />
    //               <p className="text-center text-sm">{game.name}</p>
    //               <button className="bg-gray-900 text-white px-4 py-2 rounded mt-2 w-full">
    //                 Wishlist
    //               </button>
    //             </div>
    //           ))}
    //       </div>
    //     ))}
    //   </div>
    // </section>
  );
}
