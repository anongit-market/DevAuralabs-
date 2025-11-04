
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { showcaseImages } from '@/lib/showcase-data';

export default function ShowcaseSection() {
  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <section id="showcase" className="py-12 md:py-16 w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {showcaseImages.map((image, index) => (
            <CarouselItem key={index} className="basis-full pl-4">
              <div className="flex flex-col items-center">
                <div className="relative aspect-video w-full h-full overflow-hidden rounded-lg border-2 border-dashed border-primary/50 p-2">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="mt-4">
                    <div className="bg-black/50 backdrop-blur-sm py-2 px-6 rounded-full border border-white/10">
                        <p className="text-sm md:text-base font-bold text-white whitespace-nowrap">{image.alt}</p>
                    </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
