import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AboutData } from "@/constants";
import Image from "next/image";

const AboutTree: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <Carousel>
        <CarouselPrevious className="text-4xl text-white">Previous</CarouselPrevious>
        <CarouselContent className="flex space-x-4 ">
          {AboutData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 flex-shrink-0 ">
              <div className="bg-[#00E0D3] p-6 rounded-lg shadow-lg text-center border-2 border-white">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={200} 
                  height={100} 
                  className="mx-auto mb-4 rounded-3xl"
                />
                <h3 className="text-2xl text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-md text-black font-medium">{item.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="text-4xl text-white">Next</CarouselNext>
      </Carousel>
    </div>
  );
};

export default AboutTree;
