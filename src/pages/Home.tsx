import { useEffect, useState } from "react";
import { getUpcomingGames } from "../api";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState([]);
  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);
  console.log(upcomingGames);

  return (
    <>
      {upcomingGames.map((game) => <p key={game.id}>{game.name}</p>)}
    </>
  );
}
