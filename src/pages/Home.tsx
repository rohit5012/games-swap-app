import { useEffect, useState } from "react";
import { getUpcomingGames, Game, getPopularGames } from "../rawgApi";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";
import { Card } from "@/components/ui/Card";
import PlatformButton from "@/components/ui/PlatformButton";

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

  return (
    <>
      <LargeCarousel games={upcomingGames} />
      {/* needs to be based on featured games from Firebase */}
      <div className="w-full pb-5 flex justify-center items-center gap-6">
        {" "}
        <Link
          to="/browse-games"
          className={buttonVariants({ variant: "default" })}
        >
          Browse All Games
        </Link>
      </div>
      <div className="w-full flex justify-center items-center gap-6">
        <PlatformButton
          name="Playstation"
          platform={platforms}
          setPlatforms={setPlatforms}
        />
        <PlatformButton
          name="Xbox"
          platform={platforms}
          setPlatforms={setPlatforms}
        />
        <PlatformButton
          name="Switch"
          platform={platforms}
          setPlatforms={setPlatforms}
        />
      </div>
      <div>
        <SmallCarousel
          games={upcomingGames}
          carouselTitle="Upcoming Releases"
        />
        <div className="w-full flex justify-center items-center">
          <PlatformButton
            name="Playstation 5"
            platform={platforms}
            setPlatforms={setPlatforms}
          />
        </div>
        <SmallCarousel games={popularGames} carouselTitle="Popular Games" />
      </div>
    </>
  );
}
