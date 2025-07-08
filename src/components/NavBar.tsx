import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center max-w-[327px] md:max-w-[689px] lg:max-w-[1110px] mt-400 md:mt-[37px] mx-auto">
      <div>
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/assets/memory-logo-lg.png"
          />
          <img src="/assets/memory-logo-sm.png" alt="Memory Game Logo" />
        </picture>
      </div>
      <div className="flex">
        <div>
          <button
            type="button"
            className="md:hidden bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer"
          >
            Menu
          </button>
        </div>
        <div className="hidden md:flex gap-200 md:text-[20px]">
          <button
            className="bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer"
            type="button"
          >
            Restart
          </button>
          <Link
            to="/"
            className="bg-blue-100 rounded-full py-[13px] px-[28px] text-blue-800 font-bold cursor-pointer"
            type="button"
          >
            New Game
          </Link>
        </div>
      </div>
    </nav>
  );
};
