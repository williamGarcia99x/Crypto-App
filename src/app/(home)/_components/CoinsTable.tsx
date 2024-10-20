"use client";

import AnimatedCircles from "@/app/_components/AnimatedCircles";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import React, { useState } from "react";
import useCoinsList from "../_hooks/useCoinsList";
import TableRow from "./TableRow";
import { ColorChartSpecs } from "@/lib/types";
import { useTheme } from "next-themes";
import ChevronLeft from "@/app/_icons/ChevronLeft";
import ChevronRight from "@/app/_icons/ChevronRight";

type CoinsTableProps = {
  currency: string;
};

//Each table row will have a color associated with it. The CoinsTable will only display 20 results at a time.

const cryptoCharts: ColorChartSpecs[] = [
  {
    borderColor: "#C27721",
    gradientStart: "rgba(194, 119, 33, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(194, 119, 33, 0.5)",
  },
  {
    borderColor: "#6374C3",
    gradientStart: "rgba(99, 116, 195, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(99, 116, 195, 0.5)",
  },
  {
    borderColor: "#30E0A1",
    gradientStart: "rgba(48, 224, 161, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(48, 224, 161, 0.5)",
  },
  {
    borderColor: "#F5AC37",
    gradientStart: "rgba(245, 172, 55, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(245, 172, 55, 0.5)",
  },
  {
    borderColor: "#F3EB2F",
    gradientStart: "rgba(243, 235, 47, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(243, 235, 47, 0.5)",
  },
  {
    borderColor: "#638FFE",
    gradientStart: "rgba(99, 143, 254, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(99, 143, 254, 0.5)",
  },
  {
    borderColor: "#4DEEE5",
    gradientStart: "rgba(77, 238, 229, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(77, 238, 229, 0.5)",
  },
  {
    borderColor: "#F06142",
    gradientStart: "rgba(240, 97, 66, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(240, 97, 66, 0.5)",
  },
  {
    borderColor: "#5082CF",
    gradientStart: "rgba(80, 130, 207, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(80, 130, 207, 0.5)",
  },
  {
    borderColor: "#C27721",
    gradientStart: "rgba(194, 119, 33, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(194, 119, 33, 0.5)",
  },
  {
    borderColor: "#6374C3",
    gradientStart: "rgba(99, 116, 195, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(99, 116, 195, 0.5)",
  },
  {
    borderColor: "#30E0A1",
    gradientStart: "rgba(48, 224, 161, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(48, 224, 161, 0.5)",
  },
  {
    borderColor: "#F5AC37",
    gradientStart: "rgba(245, 172, 55, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(245, 172, 55, 0.5)",
  },
  {
    borderColor: "#F3EB2F",
    gradientStart: "rgba(243, 235, 47, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(243, 235, 47, 0.5)",
  },
  {
    borderColor: "#638FFE",
    gradientStart: "rgba(99, 143, 254, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(99, 143, 254, 0.5)",
  },
  {
    borderColor: "#4DEEE5",
    gradientStart: "rgba(77, 238, 229, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(77, 238, 229, 0.5)",
  },
  {
    borderColor: "#F06142",
    gradientStart: "rgba(240, 97, 66, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(240, 97, 66, 0.5)",
  },
  {
    borderColor: "#5082CF",
    gradientStart: "rgba(80, 130, 207, 1)",
    gradientStop: "",
    progressBarBgColor: "rgba(80, 130, 207, 0.5)",
  },
  {
    borderColor: "#C27721",
    gradientStart: "rgba(194, 119, 33, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(194, 119, 33, 0.5)",
  },
  {
    borderColor: "#6374C3",
    gradientStart: "rgba(99, 116, 195, 0.6)",
    gradientStop: "",
    progressBarBgColor: "rgba(99, 116, 195, 0.5)",
  },
];

function CoinsTable({ currency }: CoinsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("market_cap_desc");
  const { theme } = useTheme();

  const { isPending, error, data } = useCoinsList(
    currency,
    sortOrder,
    currentPage,
  );
  for (let i = 0; i < cryptoCharts.length; i++) {
    if (theme === "light")
      cryptoCharts[i].gradientStop = "rgba(255, 255, 255, 0.22)";
    else cryptoCharts[i].gradientStop = "rgba(35, 35, 54, 0)";
  }

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
    <div className="mx-auto max-w-[1500px]">
      {/* Define the grid container for the header */}
      <header className="grid grid-cols-[150px_100px_70px] justify-between p-3 text-[15px] text-coinsTable-headerLight dark:text-coinsTable-headerDark min-[450px]:grid-cols-[150px_100px_70px_70px] min-[530px]:grid-cols-[150px_100px_70px_70px_70px] md:grid-cols-[150px_100px_70px_70px_70px_180px] lg:grid-cols-[150px_100px_70px_70px_70px_180px_180px] xl:grid-cols-[150px_100px_70px_70px_70px_180px_180px_180px]">
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
        {data.map((coin, index) => (
          <React.Fragment key={coin.id}>
            <TableRow coin={coin} rowColor={cryptoCharts[index]} />
          </React.Fragment>
        ))}
      </section>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              <ChevronLeft />
            </button>
          </PaginationItem>
          <PaginationItem className="text-md mx-10">
            <p>Page: {currentPage}</p>
          </PaginationItem>
          <PaginationItem>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              <ChevronRight />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CoinsTable;

function TableHeader({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
