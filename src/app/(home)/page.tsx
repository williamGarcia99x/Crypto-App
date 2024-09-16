import CoinCarousel from "./_components/CoinCarousel";
import CoinsTable from "./_components/CoinsTable";
import IntervalSelector from "./_components/IntervalSelector";
import CoinVisualOverview from "./_components/CoinVisualOverview";
import { getCoinList } from "../_services/apiCoinData";

export default async function Home() {
  const data = await getCoinList();

  return (
    <main className="">
      <CoinCarousel coinsData={data} />
      <CoinVisualOverview currency={"usd"} />
      <IntervalSelector />
      <CoinsTable />
    </main>
  );
}

/* 
    const [coinId, setCoinId] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState(1);
  
  <form className="flex gap-2">
        <select value={coinId} onChange={(e) => setCoinId(e.target.value)}>
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereum</option>
          <option value="excelon">excelon</option>
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="gbp">GBP</option>
          <option value="eur">EUR</option>
        </select>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={1}>1D</option>
          <option value={7}>7D</option>
          <option value={14}>14D</option>
          <option value={30}>1M</option>∂<option value={365}>1Y</option>
        </select>
      </form> */
