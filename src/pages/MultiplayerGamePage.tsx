import { NavBar } from "../components/NavBar";
import { MultiplayerFooter } from "../components/MultiplayerFooter";
import { useSocketStore } from "../store/socketStore";
import { MultiplayerGameBoard } from "../components/MultiplayerGameBoard";
import MultiplayerResultModal from "../components/MultiplayerResultModal";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PausedGameModal from "../components/PausedGameModal";
import PlayerLeftModal from "../components/PlayerLeftModal";
interface gridClasses {
  [key: number]: string;
}

export const MultiplayerGamePage = () => {
  const {
    players,
    gameState,
    playerLeftInfo,
    socket,
    connect,
    isConnected,
  } = useSocketStore();
  const navigate = useNavigate();
  const hasAttemptedConnect = useRef(false);

  useEffect(() => {
    if (!isConnected && !hasAttemptedConnect.current) {
      hasAttemptedConnect.current = true;
      connect();
    }
  }, [isConnected, connect]);

  useEffect(() => {
    if (!socket) return;

    socket.on("gameReset", () => {
      navigate("/");
    });

    return () => {
      socket.off("gameReset");
    };
  }, [socket, navigate]);

  const winner = gameState?.winner;

  const size = gameState?.gridSize || 4;
  const coins = gameState?.coins || [];

  const gridClasses: gridClasses = {
    4: "grid-cols-4",
    6: "grid-cols-6",
  };

  return (
    <>
      {playerLeftInfo?.playerLeftDuringGame && <PlayerLeftModal />}
      {gameState?.gamePaused && <PausedGameModal />}
      {gameState?.gameOver && (
        <MultiplayerResultModal
          playerName={winner?.name || ""}
          players={players}
        />
      )}
      <div className="bg-white relative">
        <NavBar isMultiplayer={true} />
        <div
          className={`grid place-self-center ${
            size === 4 ? "gap-[8px] md:gap-400" : "gap-[8px] md:gap-200"
          } ${gridClasses[size]} mt-1000 md:mt-[8.5rem] lg:mt-[6.2rem]`}
        >
          {coins.map((coin) => (
            <MultiplayerGameBoard coin={coin} key={coin.id} />
          ))}
        </div>
        <div className="flex justify-center gap-200 md:gap-400 max-w-[327px] md:max-w-[689px] lg:max-w-[1110px] mt-400 md:mt-[80px] lg:mt-[83px] mx-auto">
          {players.map((player) => (
            <MultiplayerFooter
              key={player.id}
              id={player.name}
              moves={player.moves}
              className="flex-1"
              hasTurn={player.hasTurn}
            />
          ))}
        </div>
      </div>
    </>
  );
};
