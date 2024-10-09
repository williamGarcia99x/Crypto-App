import { CoinDescriptionShort } from "@/lib/types";
import Image from "next/image";
import React from "react";

type CoinsTableProps = {
  coinsData: Array<CoinDescriptionShort & { current_price: string }>;
};

function CoinsTable({ coinsData }: CoinsTableProps) {
  const testCoinData = coinsData.slice(0, 15);

  return (
    <div>
      {/* Define the grid container for the header */}
      <header className="grid min-w-max grid-cols-[150px_100px_1fr] gap-4 p-3 min-[450px]:grid-cols-[150px_100px_1fr_1fr]">
        <TableHeader>Coin</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>1h%</TableHeader>
        <TableHeader className="hidden min-[450px]:block">24h%</TableHeader>
        <TableHeader className="hidden">7d%</TableHeader>
        <TableHeader className="hidden">24h Volume/Market Cap</TableHeader>
        <TableHeader className="hidden">Circulating/ Total Supply</TableHeader>
        <TableHeader className="hidden">Last 7d</TableHeader>
      </header>
      {/* Define the grid container for the table content */}
      <section className="flex flex-col gap-3">
        {testCoinData.map((el) => (
          <div
            key={el.id}
            className="grid grid-cols-[150px_100px_1fr] items-center gap-4 rounded-xl bg-white p-3 min-[450px]:grid-cols-[150px_100px_1fr_1fr]"
          >
            <TableDescription className="flex items-center gap-4">
              <figure className="relative block h-8 w-8">
                <Image
                  alt={`image of ${el.image}`}
                  src={el.image}
                  fill
                  className="object-contain"
                />
              </figure>
              <div className="flex flex-col">
                <p className="text-start uppercase">{el.symbol}</p>
                <p className="text-start text-xs">{el.name}</p>
              </div>
            </TableDescription>
            <TableDescription className="">{el.current_price}</TableDescription>
            <TableDescription className="">
              {Number.parseFloat(
                el.price_change_percentage_1h_in_currency,
              ).toFixed(2)}
            </TableDescription>
            <TableDescription className="hidden min-[450px]:block">
              {Number.parseFloat(
                el.price_change_percentage_1h_in_currency,
              ).toFixed(2)}
            </TableDescription>
            {/* <TableDescription>Chique</TableDescription>
            <TableDescription>Maravilhoso</TableDescription>
            <TableDescription>---------</TableDescription>
            <TableDescription>********</TableDescription>
            <TableDescription>++++++++++</TableDescription>
            <TableDescription>&&&&&&&&&&</TableDescription> */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default CoinsTable;

function TableHeader({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div className="" {...props}>
      {children}
    </div>
  );
}

function TableDescription({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="" {...props}>
      {children}
    </div>
  );
}
