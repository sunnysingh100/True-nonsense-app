"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import messages from "../../../messages.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
function HomePage() {
  return (
    <>
      {/* Main content */}
      <main className="flex flex-grow flex-col items-center justify-center bg-blue-300 px-4 py-12 text-gray-800 md:px-24">
        <section className="mb-8 text-center md:mb-12">
          <h1 className="text-3xl font-bold md:text-5xl">
            Plunge into the Realm of Faceless Opinions
          </h1>
          <p className="mt-3 text-base md:mt-4 md:text-lg">
            True Nonsense - Your Identity is a Hidden Treasure!
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-[90vw] max-w-lg justify-self-center md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-start space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-muted-foreground text-xs">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="bg-blue-400 p-4 text-center text-gray-900 md:p-6">
        © {new Date().getFullYear()} True Nonsense. All rights reserved.
      </footer>
    </>
  );
}

export default HomePage;
