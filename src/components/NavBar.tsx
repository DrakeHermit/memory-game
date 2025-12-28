import { Link, useNavigate } from "react-router-dom";
import GameStateStore from "../store/gameStateStore";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { TabletDropdown } from "./TabletDropdown";
import { useSocketStore } from "../store/socketStore";

interface NavBarProps {
  isMultiplayer?: boolean;
}

export const NavBar = ({ isMultiplayer = false }: NavBarProps) => {
  const { resetGameState } = GameStateStore();
  const {
    isRoomCreator,
    resetGame,
    roomId,
    pauseGame,
    leaveRoom,
  } = useSocketStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletDropdownOpen, setIsTabletDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLeaveGame = () => {
    leaveRoom(roomId);
    navigate("/");
  };

  const handlePauseGame = () => {
    if (roomId) {
      pauseGame(roomId);
    }
  };

  const handleMultiplayerRestart = () => {
    if (isRoomCreator && roomId) {
      resetGame(roomId);
    }
  };

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
      <div className="flex relative">
        <div className="md:hidden">
          <button
            type="button"
            className="bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Menu
          </button>
          {isMobileMenuOpen && (
            <MobileMenu
              onClose={() => setIsMobileMenuOpen(false)}
              isMultiplayer={isMultiplayer}
            />
          )}
        </div>

        <div className="hidden md:block lg:hidden relative">
          <button
            type="button"
            className="bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer flex items-center gap-2"
            onClick={() => setIsTabletDropdownOpen(!isTabletDropdownOpen)}
          >
            Game Menu
            <svg
              className={`w-4 h-4 transition-transform ${
                isTabletDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isTabletDropdownOpen && (
            <TabletDropdown
              onClose={() => setIsTabletDropdownOpen(false)}
              isMultiplayer={isMultiplayer}
            />
          )}
        </div>

        {!isMultiplayer && (
          <div className="hidden lg:flex gap-200 text-[20px]">
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
        )}
        {isMultiplayer && (
          <div className="hidden lg:flex gap-200 text-[20px]">
            {isRoomCreator && (
              <button
                onClick={handleMultiplayerRestart}
                className="bg-orange-400 rounded-full py-[13px] px-[28px] text-white font-bold cursor-pointer"
                type="button"
              >
                Restart
              </button>
            )}
            <button
              onClick={handlePauseGame}
              className="bg-blue-100 rounded-full py-[13px] px-[28px] text-blue-800 font-bold cursor-pointer"
              type="button"
            >
              Pause Game
            </button>
            <button
              onClick={handleLeaveGame}
              className="bg-blue-100 rounded-full py-[13px] px-[28px] text-blue-800 font-bold cursor-pointer"
              type="button"
            >
              Leave Game
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
