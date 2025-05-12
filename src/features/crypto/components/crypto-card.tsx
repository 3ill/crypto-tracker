"use client";

import Image from "next/image";
import { useCryptoData } from "../hooks/use-crypto-data";
import CryptoCardSkeleton from "./crypto-card-skeleton";

const CryptoCard = () => {
  const { data, isLoading, isError, error } = useCryptoData();

  if (isLoading) {
    return <CryptoCardSkeleton />;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  console.log(`Crypto Data: ${data?.length}`);

  return (
    <section className="">
      <div className="mt-[50px] grid w-full grid-cols-1 gap-y-16 sm:grid-cols-2 sm:pl-12 md:grid-cols-3 lg:pl-[80px]">
        {data?.map((crypto) => (
          <div key={crypto.id}>
            <div className="crypto_card_container px-2 py-4">
              {/*24hr Change */}
              <div className="flex w-full flex-col">
                <p
                  className={`${crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"} font-grotesk self-end text-sm font-light`}
                >
                  {crypto.price_change_percentage_24h}
                </p>
              </div>

              {/*Name & Price */}
              <div className="flex flex-col gap-[50px]">
                <div className="center-items mt-2 justify-between">
                  <Image
                    src={crypto.image}
                    width={50}
                    height={50}
                    alt={crypto.name}
                    quality={90}
                    priority={true}
                  />

                  <div className="flex flex-col">
                    <h3 className="font-grotesk text-lg font-medium text-white capitalize">
                      {crypto.name}{" "}
                      <span className="font-bold uppercase">
                        {crypto.symbol}
                      </span>{" "}
                    </h3>
                    <p className="text-md font-grotesk font-normal">
                      $<span>{crypto.current_price}</span>
                    </p>
                  </div>
                </div>

                <div className="center-items justify-between">
                  <div className="font-grotesk text-sm font-medium">
                    <p className="uppercase">24h max: </p>{" "}
                    <p className="text-green-500">{crypto.high_24h}</p>
                  </div>

                  <div className="font-grotesk text-sm font-medium">
                    <p className="uppercase">24h low: </p>{" "}
                    <p className="text-red-500">{crypto.high_24h}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptoCard;
