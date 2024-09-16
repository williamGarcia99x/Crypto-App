"use client";

import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getCoin, setCoin } from "../homeSlice";
import { AppDispatch } from "@/app/store";

type CoinCarouselProps = {
  coinsData: Array<{ id: string; symbol: string; name: string; image: string }>;
};

function CoinCarousel({ coinsData }: CoinCarouselProps) {
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const testCoinData = coinsData.slice(0, 12);
  const selectedCoin = useSelector(getCoin);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <Carousel className="w-[85%]">
        <CarouselContent className="-ml-1">
          {testCoinData.map((el, index) => (
            <CarouselItem key={el.id} className="basis-[1/3] pl-1 ">
              <button
                className={`flex justify-center gap-1 p-2 rounded-md w-[90px] items-center ${
                  el.id === selectedCoin
                    ? "bg-cryptoblue-790"
                    : "bg-cryptodark-810"
                }`}
                onClick={() => dispatch(setCoin(el.id))}
              >
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 bg-cryptoblue-100">
                  <Image
                    alt={`Image of ${el.name}`}
                    src={el.image}
                    className="object-cover"
                    fill
                  />
                </div>
                <span className="uppercase text-sm">{el.symbol}</span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-cryptoblue-250 hidden min-[935px]:inline-flex" />
        <CarouselNext className="bg-cryptoblue-250 hidden min-[935px]:inline-flex" />
      </Carousel>
    </div>
  );
}

export default CoinCarousel;
