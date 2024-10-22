"use client"; //For now, this is a client component
import { useState } from "react";
import Carousel from "./_components/Carousel";
import CoinsTable from "./_components/CoinsTable";
import IntervalSelector from "./_components/IntervalSelector";
import CoinVisualOverview from "./_components/CoinVisualOverview";

export default function Home() {
  const [coinId, setCoinId] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState(1);

  return (
    <main className="">
      <Carousel />
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
      </form>
      <CoinVisualOverview coinId={coinId} currency={currency} days={days} />
      <IntervalSelector />
      <CoinsTable />
    </main>
  );
}
