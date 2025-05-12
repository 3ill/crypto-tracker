"use client";

import React from "react";

const SkeletonItem = () => (
  <div key={Math.random()}>
    <div className="crypto_card_container px-2 py-4">
      {/* 24hr Change */}
      <div className="flex w-full flex-col">
        <div className="h-5 w-16 rounded-md bg-neutral-600 animate-pulse self-end" />
      </div>

      {/* Name & Price */}
      <div className="flex flex-col gap-[50px]">
        <div className="center-items mt-2 justify-between">
          {/* Crypto image skeleton */}
          <div className="h-[50px] w-[50px] rounded-full bg-neutral-600 animate-pulse" />

          <div className="flex flex-col">
            {/* Crypto name skeleton */}
            <div className="h-6 w-32 rounded-md bg-neutral-600 animate-pulse mb-1" />
            {/* Price skeleton */}
            <div className="h-5 w-24 rounded-md bg-neutral-600 animate-pulse" />
          </div>
        </div>

        {/* 24h highs and lows */}
        <div className="center-items justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-16 rounded-md bg-neutral-600 animate-pulse" />
            <div className="h-4 w-16 rounded-md bg-neutral-600 animate-pulse" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="h-4 w-16 rounded-md bg-neutral-600 animate-pulse" />
            <div className="h-4 w-16 rounded-md bg-neutral-600 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CryptoCardSkeleton = () => {
  return (
    <section className="">
      <div className="mt-[50px] grid w-full grid-cols-1 gap-y-16 sm:grid-cols-2 sm:pl-12 md:grid-cols-3 lg:pl-[80px]">
        {[...Array(6)].map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
    </section>
  );
};

export default CryptoCardSkeleton;