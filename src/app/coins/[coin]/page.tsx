/*
As of Next.js version 15, the params prop is now a promise and we must use async/await to access its values
 */

async function Page({ params }: { params: Promise<{ coin: string }> }) {
  const coinId = (await params).coin;

  return <div>{coinId}</div>;
}

export default Page;
