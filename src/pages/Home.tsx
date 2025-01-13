import { useEffect, useState } from "react";
import { getUpcomingGames, Game } from "../api";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);

  return (
    <>
      {upcomingGames.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </>
  );
}
