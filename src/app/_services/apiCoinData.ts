const apiKey = `x_cg_demo_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}`;
const baseUrl = process.env.NEXT_PUBLIC_CG_BASE_URL;

export async function getCoinHistoricalChartData(
  coinId: string,
  currency: string,
  days: string
): Promise<{
  prices: number[][];
  marketCaps: number[][];
  totalVolumes: number[][];
}> {
  try {
    // Make the fetch request
    const res = await fetch(`
        ${baseUrl}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&${apiKey}`);

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
export async function getCoinList() {
  try {
    // Make the fetch request
    const res = await fetch(`
        ${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h`);

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
    console.error("Error in getCoinList() ", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}
