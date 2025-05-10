import { IconBrandGithub, IconSearch } from "@tabler/icons-react";

const Nav = () => {
  return (
    <nav className="flex-between-center px-4 py-4 md:px-8">
      <div className="center-items w-full gap-2">
        <IconSearch width={30} height={30} color="white" />
        <h3 className="font-bebas text-xl text-white">Crypto-Tracker</h3>
      </div>

      <div>
        <IconBrandGithub
          width={30}
          height={30}
          color="white"
          className="transition-all duration-300 hover:scale-105 active:scale-95"
        />
      </div>
    </nav>
  );
};

export default Nav;
