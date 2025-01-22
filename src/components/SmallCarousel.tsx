import { useEffect, useState, useRef } from "react";
import { Game } from "@/rawgApi";
import { Link } from "react-router-dom";
import { GameListItem } from "@/types/GameListItem";
import { updateWishlist } from "@/services/wishlistServices";
import { useAuth } from "@/hooks/useAuth";

export default function SmallCarousel(props: {
  games: Game[];
  carouselTitle?: string;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleGames, setVisibleGames] = useState(2);

  const { user } = useAuth();

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
  async function handleAddToWishlist(game: GameListItem) {
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
  return (
    <section className="my-6">
      <h2 className="text-center text-xl mb-2">{props.carouselTitle}</h2>

      {/* Compact Carousel Component */}

      <div className="relative overflow-hidden px-4 bg-white py-4 rounded-lg w-11/12 place-self-center">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-110"
          title="Scroll Left"
        >
          {"<"}
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll no-scrollbar gap-3 py-3 scroll-smooth relative"
        >
          {props.games.map((game, index) => (
            <div
              key={game.id}
              className={`flex-shrink-0 rounded-lg bg-white shadow-lg relative overflow-hidden transition-transform transform hover:scale-105 duration-500 ease-in-out ${
                index % 2 === 0
                  ? "animate-fade-in-left"
                  : "animate-fade-in-right"
              }`}
              style={{
                width: `${90 / visibleGames}%`,
                flex: "0 0 auto",
              }}
            >
              <Link to={`/game/${game.slug}`} className="block relative">
                {/* Image with Overlay */}
                <div className="relative w-full h-40 overflow-hidden">
                  {" "}
                  {/* Reduced height */}
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                </div>
              </Link>

              {/* Game Info */}
              <div className="p-2 text-center">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {game.name}
                </p>

                {/* Wishlist Button */}
                <button
                  className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300 transform hover:scale-105 text-[10px]"
                  onClick={() => handleAddToWishlist(game)}
                >
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-110"
          title="Scroll Right"
        >
          {">"}
        </button>
      </div>
    </section>
  );
}
