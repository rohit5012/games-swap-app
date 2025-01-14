import { useEffect, useState } from "react";
import { getUpcomingGames, Game } from "../api";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState<string | null>(null);
  useEffect(() => {
    getUpcomingGames(platforms).then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, [platforms]);

  return (
    <>
      <LargeCarousel games={upcomingGames} />
      <div>
        <SmallCarousel
          games={upcomingGames}
          platforms={platforms}
          setPlatforms={setPlatforms}
        />
      </div>
      {upcomingGames.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </>
  );
}
