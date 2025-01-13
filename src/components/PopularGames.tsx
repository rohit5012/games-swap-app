import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Game {
  id: number;
  name: string;
  background_image: string;
  slug: string;
}

const PopularGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platform, setPlatform] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleGames, setVisibleGames] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: import.meta.env.VITE_RAWG_API_KEY,
            ordering: "-rating",
            page_size: 10,
            platforms: platform,
          },
        });
        setGames(response.data.results);
      } catch (error) {
        console.error("Error fetching popular games:", error);
      }
    };

    fetchGames();
  }, [platform]);

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

  return (
    <section className="my-6">
      <h2 className="text-center text-xl mb-4">Popular Games</h2>

      {/* Filter by Platform */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setPlatform("18")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            platform === "18" ? "bg-gray-400" : ""
          }`}
        >
          Playstation 4
        </button>

        <button
          onClick={() => setPlatform("187")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            platform === "187" ? "bg-gray-400" : ""
          }`}
        >
          Playstation 5
        </button>

        <button
          onClick={() => setPlatform("186")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            platform === "186" ? "bg-gray-400" : ""
          }`}
        >
          Xbox Series S | X
        </button>

        <button
          onClick={() => setPlatform("7")}
          className={`bg-gray-200 px-4 py-2 rounded ${
            platform === "7" ? "bg-gray-400" : ""
          }`}
        >
          Switch
        </button>
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
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0"
              style={{
                width: `${100 / visibleGames}%`,
                flex: "0 0 auto",
              }}
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="rounded mb-2 w-full h-56 object-cover"
              />
              <p className="text-center text-sm">{game.name}</p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded mt-2 w-full">
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

      {/* Popular Games - FullList */}
      <div className="flex justify-end mt-4 px-4">
        <button
          onClick={() => navigate("/popular-games")}
          className="bg-gray-200 text-black px-4 py-2 rounded"
        >
          Popular Games: Full List
        </button>
      </div>
    </section>
  );
};

export default PopularGames;
