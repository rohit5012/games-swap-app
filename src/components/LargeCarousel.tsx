import { Card, CardContent } from "@/components/ui/Card";
import { Game } from "@/rawgApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function LargeCarousel(props: { games: Game[] }) {
  return (
    <div className="flex justify-center items-center">
      <Carousel className="w-[75%] max-w-[1200px] h-[600px] max-h-[90vh] mx-auto mt-[20px]">
        <CarouselContent className="flex gap-4">
          {props.games.map((game) => (
            <CarouselItem key={game.id} className="flex-shrink-0 w-full h-full">
              <Link to={`/game/${game.slug}`} className="w-full h-full">
                <Card className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                  <CardContent className="relative h-full p-0">
                    {/* Image Container */}
                    <div className="w-full h-[35rem] overflow-hidden relative">
                      {/* Background Image */}
                      <img
                        src={game.background_image}
                        alt={`${game.name} background`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay for Text */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">
                        {game.name}
                      </h3>
                      {game.released && (
                        <p className="text-sm text-gray-300">
                          Released: {game.released}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
      </Carousel>
    </div>
  );
}
