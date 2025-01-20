import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "@/rawgApi";
import PlatformButton from "./ui/PlatformButton";
import { Link } from "react-router-dom";
import { GameListItem } from "@/types/GameListItem";
import { updateWishlist } from "@/services/wishlistServices";
import { UserContext } from "@/context/Usercontext";
import { useAuth } from "@/hooks/useAuth";


export default function SmallCarousel(props: {
  games: Game[];
  platforms: string | null;
  setPlatforms: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleGames, setVisibleGames] = useState(2);
  const navigate = useNavigate();

  const {user} = useAuth()



  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleGames(2);
      } else if (width < 768) {
        setVisibleGames(3);
      } else if (width < 1024) {
        setVisibleGames(4);
      } else {
        setVisibleGames(5 + Math.floor((width - 1024) / 250));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scrolling
  const scrollLeft = () => {
    if (carouselRef.current) {
      const elementWidth = carouselRef.current.offsetWidth / visibleGames;
      carouselRef.current.scrollBy({
        left: -elementWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const elementWidth = carouselRef.current.offsetWidth / visibleGames;
      carouselRef.current.scrollBy({
        left: elementWidth,
        behavior: "smooth",
      });
    }
  };
  async function handleAddToWishlist(game: GameListItem){
    if(user){
      const newWishlistItem = {
        gameName: game.name,
        slug: game.slug,
        backgroundImg: game.background_image,
        releaseDate: game.released   
      }
      await updateWishlist(user.uid, newWishlistItem)
    }
  }
  return (
    <section className="my-6">
      <h2 className="text-center text-xl mb-4">Upcoming Games</h2>

      {/* Filter by Platform */}
      <div className="flex justify-center space-x-4 mb-4">
        <PlatformButton
          name="All Games"
          platforms={props.platforms}
          setPlatforms={props.setPlatforms}
        />
        <PlatformButton
          name="PlayStation 5"
          platforms={props.platforms}
          setPlatforms={props.setPlatforms}
        />
        <PlatformButton
          name="Xbox Series S | X"
          platforms={props.platforms}
          setPlatforms={props.setPlatforms}
        />
        <PlatformButton
          name="Switch"
          platforms={props.platforms}
          setPlatforms={props.setPlatforms}
        />
        {/* <button
          onClick={() => props.setPlatforms(null)}
          className={`bg-gray-200 px-4 py-2 rounded ${
            props.platforms === null ? "bg-gray-400" : ""
          }`}
        >
          All Games
        </button>

        <button
          onClick={() => props.setPlatforms("187")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            props.platforms === "187" ? "bg-gray-400" : ""
          }`}
        >
          Playstation 5
        </button>

        <button
          onClick={() => props.setPlatforms("186")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            props.platforms === "186" ? "bg-gray-400" : ""
          }`}
        >
          Xbox Series S | X
        </button>

        <button
          onClick={() => props.setPlatforms("7")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            props.platforms === "7" ? "bg-gray-400" : ""
          }`}
        >
          Switch
        </button> */}
      </div>

      {/* All games in carousel */}
      <div className="relative overflow-hidden px-4">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded z-10"
        >
          {"<"}
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-scroll no-scrollbar gap-4"
        >
          {props.games.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0"
              style={{
                width: `${100 / visibleGames}%`,
                flex: "0 0 auto",
              }}
            >
            <Link to={`/game/${game.slug}`} className="w-full h-full">
            <img
                src={game.background_image}
                alt={game.name}
                className="rounded mb-2 w-full h-56 object-cover"
                // {"transform hover:scale-y-150 transition delay-150 duration-300 ease-in-out"}?
              /></Link>
              
              <p className="text-center text-sm">{game.name}</p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded mt-2 w-full" onClick={()=> handleAddToWishlist(game)}>
                Wishlist
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded z-10"
        >
          {">"}
        </button>
      </div>

      {/* Upcoming Games - FullList */}
      <div className="flex justify-end mt-4 px-4">
        <button
          onClick={() => navigate("/browse-games")}
          className="bg-gray-200 text-black px-4 py-2 rounded"
        >
          Upcoming Games: Full List
        </button>
      </div>
    </section>
  );
}
