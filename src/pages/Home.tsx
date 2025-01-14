import { useEffect, useState } from "react";
import { getUpcomingGames, Game } from "../api";
import LargeCarousel from "../components/LargeCarousel";

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
      {upcomingGames.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </>
  );
}
