"use client";

import AnimatedCircles from "@/app/_components/AnimatedCircles";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import Image from "next/image";
import React, { useState } from "react";
import useCoinsList from "../_hooks/useCoinsList";

type CoinsTableProps = {
  currency: string;
};

function CoinsTable({ currency }: CoinsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("market_cap_desc");

  const { isPending, error, data } = useCoinsList(
    currency,
    sortOrder,
    currentPage,
  );

  function handlePageChange(newPage: number) {
    if (newPage === 0) return;
    setCurrentPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (isPending)
    return (
      // Minimum height is required so that the page does not drastically change heights when the user navigates to a new page of uncached results. This allows for smooth scrolling back to the top
      <div className="flex min-h-[1500px] items-center justify-center">
        <div className="w-20 sm:w-24 xl:w-36">
          <AnimatedCircles />
        </div>
      </div>
    );

  if (error) return <p>{error.message}</p>;

  return (
    // Max width is the same as the max width for the CoinVisualOverview component
    <div className="mx-auto max-w-[1500px] px-6">
      {/* Define the grid container for the header */}
      <header className="grid min-w-max grid-cols-[150px_100px_50px] justify-between gap-4 p-3 text-sm min-[450px]:grid-cols-[150px_100px_50px_50px] min-[530px]:grid-cols-[150px_100px_50px_50px_50px] md:grid-cols-[150px_100px_50px_50px_50px_180px] lg:grid-cols-[150px_100px_50px_50px_50px_180px_180px] xl:grid-cols-[150px_100px_50px_50px_50px_180px_180px_180px]">
        <TableHeader>Coin</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>1h%</TableHeader>
        <TableHeader className="hidden min-[450px]:block">24h%</TableHeader>
        <TableHeader className="hidden min-[530px]:block">7d%</TableHeader>
        <TableHeader className="hidden md:block">
          24h Volume/Market Cap
        </TableHeader>
        <TableHeader className="hidden lg:block">
          Circulating/ Total Supply
        </TableHeader>
        <TableHeader className="hidden xl:block">Last 7d</TableHeader>
      </header>
      {/* Define the grid container for the table content */}
      <section className="flex flex-col gap-3 overflow-auto">
        {data.map((el) => (
          <div
            key={el.id}
            className="lg grid grid-cols-[150px_100px_50px] items-center justify-between gap-4 rounded-xl bg-white p-3 min-[450px]:grid-cols-[150px_100px_50px_50px] min-[530px]:grid-cols-[150px_100px_50px_50px_50px] md:grid-cols-[150px_100px_50px_50px_50px_180px] lg:grid-cols-[150px_100px_50px_50px_50px_180px_180px] xl:grid-cols-[150px_100px_50px_50px_50px_180px_180px_180px]"
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
            {/* 2nd column */}
            <TableDescription className="">{el.current_price}</TableDescription>
            {/* 3rd column */}
            <TableDescription className="">
              {Number.parseFloat(
                el.price_change_percentage_1h_in_currency,
              ).toFixed(2)}
            </TableDescription>
            {/* 4th column */}
            <TableDescription className="hidden min-[450px]:block">
              {Number.parseFloat(
                el.price_change_percentage_1h_in_currency,
              ).toFixed(2)}
            </TableDescription>
            <TableDescription className="hidden min-[530px]:block">
              {Number.parseFloat(
                el.price_change_percentage_1h_in_currency,
              ).toFixed(2)}
            </TableDescription>
            <TableDescription className="hidden md:block">
              <progress value="32" max="100" className="w-full">
                {" "}
                32%{" "}
              </progress>
            </TableDescription>
            <TableDescription className="hidden lg:block">
              <progress value="32" max="100" className="w-full">
                {" "}
                32%{" "}
              </progress>
            </TableDescription>
            <TableDescription className="hidden xl:block">
              <progress value="32" max="100" className="w-full">
                {" "}
                32%{" "}
              </progress>
            </TableDescription>
          </div>
        ))}
      </section>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              {"<"}
            </button>
          </PaginationItem>
          <PaginationItem>
            <p>{currentPage}</p>
          </PaginationItem>
          <PaginationItem>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              {">"}
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
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
