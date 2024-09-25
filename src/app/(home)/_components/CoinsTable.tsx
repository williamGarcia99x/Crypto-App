import { CoinDescriptionShort } from "@/lib/types";
import Image from "next/image";
import React from "react";

type CoinsTableProps = {
  coinsData: Array<CoinDescriptionShort>;
};

function CoinsTable({ coinsData }: CoinsTableProps) {
  const testCoinData = coinsData.slice(0, 20);

  return (
    <div className="overflow-x-scroll">
      {/* Define the grid container for the header */}
      <div className="grid min-w-max grid-cols-[150px_1fr_1fr] gap-4">
        <TableHeader>Name</TableHeader>
        <TableHeader>Price</TableHeader>
        <TableHeader>1h%</TableHeader>
        <TableHeader className="hidden">24h%</TableHeader>
        <TableHeader className="hidden">7d%</TableHeader>
        <TableHeader className="hidden">24h Volume/Market Cap</TableHeader>
        <TableHeader className="hidden">Circulating/ Total Supply</TableHeader>
        <TableHeader className="hidden">Last 7d</TableHeader>
      </div>

      {/* Define the grid container for the table content */}
      <div className="grid grid-cols-[150px_1fr_1fr] gap-4 text-nowrap">
        {testCoinData.map((el) => (
          <React.Fragment key={el.id}>
            <TableDescription className="flex items-center gap-2">
              <figure className="relative block h-8 w-8">
                <Image
                  alt={`image of ${el.image}`}
                  src={el.image}
                  fill
                  className="object-contain"
                />
              </figure>
              <div className="flex flex-col">
                <p>{el.symbol}</p>
                <p>{el.name}</p>
              </div>
            </TableDescription>
            <TableDescription>10</TableDescription>
            <TableDescription>Awesome</TableDescription>
            {/* <TableDescription>Chique</TableDescription>
            <TableDescription>Maravilhoso</TableDescription>
            <TableDescription>---------</TableDescription>
            <TableDescription>********</TableDescription>
            <TableDescription>++++++++++</TableDescription>
            <TableDescription>&&&&&&&&&&</TableDescription> */}
          </React.Fragment>
        ))}
      </div>
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

// function CoinsTable({ coinsData }: CoinsTableProps) {
//   const testCoinData = coinsData.slice(0, 20);

//   return (
//     <div className="overflow-x-scroll">
//       <table>
//         <thead>
//           <tr>
//             <TableHeader>#</TableHeader>
//             <TableHeader>Name</TableHeader>
//             <TableHeader>Price</TableHeader>
//             <TableHeader>1h%</TableHeader>
//             <TableHeader>24h%</TableHeader>
//             <TableHeader>7d%</TableHeader>
//             <TableHeader>24h Volume/Market Cap</TableHeader>
//             <TableHeader>Circulating/ Total Supply</TableHeader>
//             <TableHeader>Last 7d</TableHeader>
//             {/* <th className="hidden">1h%</th>
//           <th className="hidden">24h%</th>
//           <th className="hidden">7d%</th>
//           <th className="hidden">24h Volume/Market Cap</th>
//           <th className="hidden">Circulating/ Total Supply</th>
//           <th className="hidden">Last 7d</th> */}
//           </tr>
//         </thead>
//         <tbody className="">
//           {testCoinData.map((el, i) => (
//             <tr key={el.id} className="p-1">
//               <TableDescription>{i + 1}</TableDescription>
//               <TableDescription className="flex items-center gap-3">
//                 <figure className="relative block h-8 w-8">
//                   <Image
//                     alt={`image of ${el.image}`}
//                     src={el.image}
//                     fill
//                     className="object-contain"
//                   />
//                 </figure>
//                 {el.name}
//               </TableDescription>
//               <TableDescription>Awesome</TableDescription>
//               <TableDescription>Chique</TableDescription>
//               <TableDescription>Maravilhoso</TableDescription>
//               <TableDescription>---------</TableDescription>
//               <TableDescription>********</TableDescription>
//               <TableDescription>++++++++++</TableDescription>
//               <TableDescription>&&&&&&&&&&</TableDescription>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// {
//   /* The maximum number of rows that can be displayed at a time is 20 rows. If the number of rows to display exceeeds the limit, user must use pagination to access the next 20 results  */
// }
// export default CoinsTable;

// function TableHeader({ children, ...props }) {
//   return (
//     <th
//       className="sticky left-0 top-0 border-collapse bg-dark-300 p-4"
//       {...props}
//     >
//       {children}
//     </th>
//   );
// }

// function TableDescription({ children, ...props }) {
//   return (
//     <td className="border-collapse" {...props}>
//       {children}
//     </td>
//   );
// }
