import { IconSearch } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="section_wrapper">
      <div className="flex-center gap-4">
        <div className="center-items flex-center w-full gap-2">
          <IconSearch width={30} height={30} color="white" />
          <h3 className="font-bebas text-xl text-white">Crypto-Tracker</h3>
        </div>

        <p className="font-grotesk text-sm font-light text-neutral-400">
          2025. Copyright All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
