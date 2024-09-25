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
import { CoinDescriptionShort } from "@/lib/types";

type CoinCarouselProps = {
  coinsData: Array<CoinDescriptionShort>;
};

function CoinCarousel({ coinsData }: CoinCarouselProps) {
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const testCoinData = coinsData.slice(0, 20);
  const selectedCoin = useSelector(getCoin);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <Carousel className="w-[85%]">
        <CarouselContent className="-ml-1">
          {testCoinData.map((el, index) => (
            <CarouselItem key={el.id} className="basis-[1/3] pl-1">
              <button
                className={`flex w-[90px] items-center justify-center gap-1 rounded-md p-2 ${
                  el.id === selectedCoin.id
                    ? "bg-cryptoblue-790"
                    : "bg-cryptodark-810"
                }`}
                onClick={() => dispatch(setCoin(el))}
              >
                <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                  <Image
                    alt={`Image of ${el.name}`}
                    src={el.image}
                    className="object-cover"
                    fill
                  />
                </div>
                <span className="text-sm uppercase">{el.symbol}</span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden bg-cryptoblue-250 min-[935px]:inline-flex" />
        <CarouselNext className="hidden bg-cryptoblue-250 min-[935px]:inline-flex" />
      </Carousel>
    </div>
  );
}

export default CoinCarousel;
