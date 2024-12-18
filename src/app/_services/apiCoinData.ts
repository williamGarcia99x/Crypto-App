import { CoinDescriptionShort } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_CG_BASE_URL;
const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_CG_API_KEY as string,
  },
};

export async function getCoinHistoricalChartData(
  coinId: string,
  currency: string,
  days: string,
): Promise<{
  prices: number[][];
  marketCaps: number[][];
  totalVolumes: number[][];
}> {
  try {
    // Make the fetch request
    const res = await fetch(
      `
        ${baseUrl}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,
      defaultOptions,
    );

    // Check if the response is not OK (i.e., status code not in the range 200-299)
    if (!res.ok) {
      //get the error message
      const { error } = await res.json();
      throw new Error(`Error fetching data: ${res.status} ${error}`);
    }

    // Parse the response as JSON
    const data = await res.json();

    // Destructure the necessary data from the response
    const {
      prices,
      market_caps: marketCaps,
      total_volumes: totalVolumes,
    } = data;

    // Return the structured data
    return { prices, marketCaps, totalVolumes };
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    // eslint-disable-next-line no-console
    console.error("Error in getCoinHistoricalChartData. ", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}

/**
 *
 * @param currency
 * @param sortOrder
 * @param currentPage
 * @returns list of coin data that is displayed by the CoinsTable component
 */
export async function getCoins(
  currency: string,
  sortOrder: string,
  currentPage: number,
) {
  try {
    // Make the fetch request
    const res = await fetch(
      `
        ${baseUrl}/coins/markets?vs_currency=${currency}&order=${sortOrder}&per_page=20&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      defaultOptions,
    );
    //
    // Check if the response is not OK (i.e., status code not in the range 200-299)
    if (!res.ok) {
      //get the error message
      const { error } = await res.json();
      throw new Error(`Error fetching data: ${res.status} ${error}`);
    }

    // Parse the response as JSON
    const data = await res.json();

    // Return the structured data
    return data;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    // eslint-disable-next-line no-console
    console.error("Error in getCoins", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}

/**
 *
 * @returns Market summary data that is displayed in the hightlight bar
 */
export async function getMarketSummary() {
  try {
    const res = await fetch(`${baseUrl}/global`, defaultOptions);

    if (!res.ok) {
      //get the error message
      const { error } = await res.json();
      throw new Error(
        `Error fetching market summary data: ${res.status} ${error}`,
      );
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    // eslint-disable-next-line no-console
    console.error("Error in getMarketSummary", error);
    throw error; // Re-throw the error so it can be handled by the calling function}
  }
}

/**
 *
 * @param query
 * @returns
 */
export async function searchCoins(
  query: string,
): Promise<Array<Omit<CoinDescriptionShort, "image">>> {
  try {
    const res = await fetch(`${baseUrl}/search?query=${query}`, defaultOptions);

    if (!res.ok) {
      //get the error message
      const { error } = await res.json();
      throw new Error(
        `Error performing search by query: ${res.status} ${error}`,
      );
    }

    const data = await res.json();

    return data.coins;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    // eslint-disable-next-line no-console
    console.error("Error in searchCoins", error);
    throw error; // Re-throw the error so it can be handled by the calling function}
  }
}
