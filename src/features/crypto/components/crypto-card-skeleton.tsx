"use client";

import React from "react";

const CryptoCardSkeleton = () => {
  return (
    <div className="crypto_card_container">
      <div className="flex flex-col p-4 h-full w-full gap-4">
        {/* Crypto image skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-600 animate-pulse" />
          {/* Crypto name skeleton */}
          <div className="h-5 w-24 rounded-md bg-neutral-600 animate-pulse" />
        </div>
        
        {/* Crypto price skeleton */}
        <div className="mt-2">
          <div className="h-7 w-32 rounded-md bg-neutral-600 animate-pulse" />
        </div>
        
        {/* Percentage change skeleton */}
        <div className="mt-auto">
          <div className="h-6 w-20 rounded-md bg-neutral-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CryptoCardSkeleton;