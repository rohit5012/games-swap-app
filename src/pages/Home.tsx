import { useEffect, useState } from "react";
import { getUpcomingGames, Game, getPopularGames } from "../rawgApi";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";

import PlatformSelector from "@/components/PlatformRedirectIcons";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);

  useEffect(() => {
    getPopularGames().then((gameData) => {
      setPopularGames(gameData);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <LargeCarousel games={upcomingGames} />
      {/* needs to be based on featured games from Firebase */}
      <div>
        <SmallCarousel
          games={upcomingGames}
          carouselTitle="Upcoming Releases"
        />
        <div>
          <PlatformSelector />
        </div>
        <SmallCarousel games={popularGames} carouselTitle="Popular Games" />
      </div>
    </>
  );
}
