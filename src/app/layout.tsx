import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Space_Grotesk } from "next/font/google";
import "@/app/styles/globals.css";
import { Providers } from "@/app/Providers";
import NavigationBar from "./_components/NavigationBar";
import HighlightBar from "./_components/HighlightBar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto App",
  description: "Crypto App made by William",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} dark:bg-dark-300`}>
        <Providers>
          <HighlightBar />
          <NavigationBar />
          <div className="p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
