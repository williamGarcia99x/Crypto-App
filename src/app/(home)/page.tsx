import CoinCarousel from "./_components/CoinCarousel";
import CoinsTable from "./_components/CoinsTable";
import IntervalSelector from "./_components/IntervalSelector";
import CoinVisualOverview from "./_components/CoinVisualOverview";
import { getCoinList } from "../_services/apiCoinData";

export default async function Home() {
  const data = await getCoinList();

  return (
    <main className="">
      <div className="flex flex-col gap-6">
        <CoinCarousel coinsData={data} />
        <CoinVisualOverview currency={"usd"} />
        <IntervalSelector />
      </div>
      <div className="my-8">
        <CoinsTable currency={"usd"} />
      </div>
    </main>
  );
}
