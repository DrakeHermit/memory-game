import { ResultsModal } from "../components/ResultsModal";
import { NavBar } from "../components/NavBar";
import { MultiplayerFooter } from "../components/MultiplayerFooter";
import useLobbyStore from "../store/useLobbyStore";
import gameStateStore from "../store/gameStateStore";
import { useSocketStore } from "../store/socketStore";
import { MultiplayerGameBoard } from "../components/MultiplayerGameBoard";
interface gridClasses {
  [key: number]: string;
}

export const MultiplayerGamePage = () => {
  const { formData } = useLobbyStore();
  const { gamePhase } = gameStateStore();
  const { players, gameState } = useSocketStore();

  const size = gameState?.gridSize || 4;
  const coins = gameState?.coins || [];

  const gridClasses: gridClasses = {
    4: "grid-cols-4",
    6: "grid-cols-6",
  };

  return (
    <>
      {gamePhase === "gameOver" && <ResultsModal />}
      <div className="bg-white relative">
        <NavBar />
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
              className={
                formData.players === "2"
                  ? "w-full md:w-[271px]"
                  : "w-full md:w-[542px]"
              }
              hasTurn={player.hasTurn}
            />
          ))}
        </div>
      </div>
    </>
  );
};
