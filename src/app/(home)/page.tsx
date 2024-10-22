import CoinCarousel from "./_components/CoinCarousel";
import CoinsTable from "./_components/CoinsTable";
import IntervalSelector from "./_components/IntervalSelector";
import CoinVisualOverview from "./_components/CoinVisualOverview";

export default async function Home() {
  return (
    <main className="">
      <div className="flex flex-col gap-6">
        <CoinCarousel />
        <CoinVisualOverview currency={"usd"} />
        <IntervalSelector />
      </div>
      <div className="my-8">
        <CoinsTable currency={"usd"} />
      </div>
    </main>
  );
}
