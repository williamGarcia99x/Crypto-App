import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/styles/globals.css";
import { Providers } from "@/app/Providers";
import NavigationBar from "./_components/NavigationBar";
import HighlightBar from "./_components/HighlightBar";
import BottomNav from "./_components/BottomNav";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinFolio",
  description: "An app by William",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} bg-[#f3f5f9] dark:bg-dark-300`}
      >
        <Providers>
          <HighlightBar />
          <NavigationBar />
          <div className="p-4">{children}</div>
          <BottomNav className="md-plus:hidden" />
        </Providers>
      </body>
    </html>
  );
}
