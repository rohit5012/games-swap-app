import { useEffect, useState } from "react";
import { getUpcomingGames, Game, getPopularGames } from "../rawgApi";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";
import { Card } from "@/components/ui/Card";
import PlatformButton from "@/components/ui/PlatformButton";
import PlatformSelector from "@/components/PlatformRedirectIcons";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [platforms, setPlatforms] = useState("");

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

  const handlePlatformSelect = (
    platform: "PS4" | "PS5" | "Xbox One" | "Xbox Series X/S" | "Switch"
  ) => {
    console.log("Selected platform:", platform);
  };

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
          <PlatformSelector onSelect={handlePlatformSelect} />
        </div>
        <SmallCarousel games={popularGames} carouselTitle="Popular Games" />
      </div>
    </>
  );
}
