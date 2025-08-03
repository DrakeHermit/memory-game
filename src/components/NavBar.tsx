import { Link } from "react-router-dom";
import GameStateStore from "../store/gameStateStore";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

export const NavBar = () => {
  const { resetGameState } = GameStateStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between relative items-center max-w-[327px] md:max-w-[689px] lg:max-w-[1110px] mt-400 md:mt-[37px] mx-auto">
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
          {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
        </div>
        <div className="hidden md:flex gap-200 md:text-[20px]">
          <button
            onClick={resetGameState}
            className="bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer"
            type="button"
          >
            Restart
          </button>
          <Link
            to="/"
            className="bg-blue-100 rounded-full py-[13px] px-[28px] text-blue-800 font-bold cursor-pointer"
            type="button"
            onClick={resetGameState}
          >
            New Game
          </Link>
        </div>
      </div>
    </nav>
  );
};
