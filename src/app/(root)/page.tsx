import { CryptoCard, CryptoSearchForm } from "@/features/crypto";
import { fetchCryptoData } from "@/features/crypto/api/crypto-data/route";
import { CRYPTO_DATA_QUERY_KEY } from "@/features/crypto/hooks/use-crypto-data";
import { queryClient } from "@/lib/react-query";
import Header from "@/shared/layout/header";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Home = async () => {
  try {
    await queryClient.prefetchQuery({
      queryKey: CRYPTO_DATA_QUERY_KEY,
      queryFn: fetchCryptoData,
    });

    return (
      <section className="section_wrapper">
        <div className="flex-center gap-2">
          <CryptoSearchForm />

          <div className="mt-[50px] flex w-full flex-col items-center justify-center">
            <Header>
              <h1>Live Feed</h1>
            </Header>
          </div>
          <p className="font-grotesk max-w-prose text-center text-sm font-light">
            Monitor your favorite cryptocurrencies in real-time. Click on a coin
            to view insights.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CryptoCard />
          </HydrationBoundary>
        </div>
      </section>
    );
  } catch (error) {
    return <p>Failed to load crypto prices: {(error as Error).message}</p>;
  }
};

export default Home;
