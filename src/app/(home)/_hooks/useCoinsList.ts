import { getCoins } from "@/app/_services/apiCoinData";
import { CoinDescriptionShort } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useCoinsList(
  currency: string = "usd",
  sortOrder: string = "market_cap_desc",
  currentPage: number = 1,
): {
  isPending: boolean;
  error: Error | null;
  data: Array<CoinDescriptionShort>;
} {
  const { isPending, error, data } = useQuery({
    queryKey: ["coin_list", currency, sortOrder, currentPage],
    queryFn: () => {
      return getCoins(currency, sortOrder, currentPage);
    },
    staleTime: 60000,
  });

  return { isPending, error, data };
}
