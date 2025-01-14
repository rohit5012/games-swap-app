import { useEffect, useState } from "react";

import { getUpcomingGames, Game } from "../api";
import LargeCarousel from "../components/LargeCarousel";
import PopularGames from "../components/PopularGames";


export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);

  return (
    
    <>
      <LargeCarousel games={upcomingGames}></LargeCarousel>

      <div>
        <PopularGames />
      </div>

   
      {upcomingGames.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </>
  );
}
