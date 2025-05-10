import { CryptoCard } from "@/features/crypto";
import Header from "@/shared/layout/header";

const Home = () => {
  return (
    <section className="section_wrapper">
      <div className="flex-center gap-2">
        <Header>
          <h1>Live Feed</h1>
        </Header>
        <p className="font-grotesk max-w-prose text-center text-sm font-light">
          Monitor your favorite cryptocurrencies in real-time. Click on a coin
          to view insights.
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mt-[50px] grid grid-cols-1 gap-y-16 px-4 sm:grid-cols-2 sm:px-12 md:grid-cols-3 md:px-16">
          <CryptoCard />
          <CryptoCard />
          <CryptoCard />
          <CryptoCard />
          <CryptoCard />
          <CryptoCard />
        </div>
      </div>
    </section>
  );
};

export default Home;
