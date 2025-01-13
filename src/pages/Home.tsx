import { useEffect, useState } from "react";
import { getUpcomingGames } from "../api";
import PopularGames from "../components/PopularGames";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState([]);
  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);

  return (
    <>
      <div>
        <PopularGames />
      </div>
      {upcomingGames.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </>
  );
}
