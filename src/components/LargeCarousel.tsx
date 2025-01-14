import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function LargeCarousel({games}) {
  return (
    <div className="flex justify-center items-center">
    <Carousel className="w-[75%] max-w-[1200px] h-[600px] max-h-[90vh] mx-auto mt-[20px]">
  <CarouselContent className="flex gap-4">
    {games.map((game) => (
      <CarouselItem key={game.id} className="flex-shrink-0 w-full h-full">
        <Card className="w-full h-full rounded-lg overflow-hidden shadow-lg">
          <CardContent className="relative h-full p-0">
            {/* Image Container */}
            <div className="w-full h-[400px] overflow-hidden relative">
              {/* Background Image */}
              <img
                src={game.background_image}
                alt={`${game.name} background`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay for Text */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-lg font-bold text-white">{game.name}</h3>
              {game.released && (
                <p className="text-sm text-gray-300">Released: {game.released}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
    
  </CarouselContent>
  <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white" />
  <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
</Carousel>

    </div>
  )
}
