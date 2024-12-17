import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/styles/globals.css";
import { Providers } from "@/app/Providers";
import NavigationBar from "./_components/NavigationBar";
import HighlightBar from "./_components/HighlightBar";
import BottomNav from "./_components/BottomNav";
import { getMarketSummary } from "./_services/apiCoinData";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "CoinFolio",
  description: "An app by William",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketData = await getMarketSummary();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} bg-[#f3f5f9] dark:bg-dark-300`}
      >
        <Providers>
          <HighlightBar data={marketData} />
          <NavigationBar />
          <div className="p-4">{children}</div>
          <BottomNav className="md-plus:hidden" />
        </Providers>
      </body>
    </html>
  );
}
