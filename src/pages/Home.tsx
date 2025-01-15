import { useEffect, useState } from "react";
import { getUpcomingGames, Game } from "../rawgApi";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";
import UserDetails from "@/components/ui/UserDetails";

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
      {/* needs to be based on featured games from Firebase */}
      <div>
        <SmallCarousel
          games={upcomingGames}
          platforms={platforms}
          setPlatforms={setPlatforms}
        />
      </div>
      <UserDetails />
    </>
  );
}
