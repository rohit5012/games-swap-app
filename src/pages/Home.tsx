import { useEffect, useState } from "react";
import { getUpcomingGames, Game } from "../rawgApi";
import LargeCarousel from "../components/LargeCarousel";
import SmallCarousel from "@/components/SmallCarousel";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";

export default function Home() {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);

  useEffect(() => {
    getUpcomingGames().then((gameData) => {
      setUpcomingGames(gameData);
    });
  }, []);

  return (
    <>
      <LargeCarousel games={upcomingGames} />
      {/* needs to be based on featured games from Firebase */}
      <div className="w-full flex justify-center items-center">
        <Link to="/browse-games" className={buttonVariants({ variant: "default" })} >Browse All Games</Link >
      </div>
      <div>
        <SmallCarousel
          games={upcomingGames}
          carouselTitle="Upcoming Releases"
        />
      </div>
    </>
  );
}
