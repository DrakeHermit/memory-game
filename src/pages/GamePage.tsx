import { useMemo, useEffect } from "react";
import { GameBoard } from "../components/GameBoard";
import { NavBar } from "../components/NavBar";
import { TimeComponent } from "../components/TimeComponent";
import useLobbyStore from "../store/useLobbyStore";
import gameStateStore from "../store/gameStateStore";
import { useUserStore } from "../store/userStore";
import { generateGrid, getGridSize } from "../utils/gameUtils";
import { ResultsModal } from "../components/ResultsModal";
import { generateUsers } from "../utils/gameUtils";
import { MultiplayerFooter } from "../components/MultiplayerFooter";

interface gridClasses {
  [key: number]: string;
}

const GamePage = () => {
  const { formData } = useLobbyStore();
  const { moves, setCoins, gamePhase } = gameStateStore();
  const { setConnectedPlayers } = useUserStore();
  const size = getGridSize(formData.gridSize);
  const coins = useMemo(() => generateGrid(formData.gridSize, formData.theme), [
    formData.gridSize,
    formData.theme,
  ]);
  const users = useMemo(() => generateUsers(formData.players), [
    formData.players,
  ]);

  const gridClasses: gridClasses = {
    4: "grid-cols-4",
    6: "grid-cols-6",
  };

  useEffect(() => {
    setCoins(coins);
  }, [coins, setCoins]);

  useEffect(() => {
    setConnectedPlayers(users);
  }, [users, setConnectedPlayers]);

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
            <GameBoard coin={coin} key={coin.id} />
          ))}
        </div>
        {formData.players === "1" ? (
          <div
            className={`grid grid-cols-2 place-self-center min-w-[326px] md:min-w-[542px] ${
              size === 4 && "md:mt-[100px]"
            } md:mt-[100px] lg:mt-[106px] mt-[125px] gap-200 md:gap-400`}
          >
            <TimeComponent />
            <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md">
              Moves <span className="text-[32px] text-blue-800">{moves}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 max-w-[327px] gap-400 md:max-w-[689px] lg:max-w-[1110px] mt-400 md:mt-[80px] lg:mt-[83px] mx-auto">
            <div className="flex justify-center gap-200 md:gap-400 md:max-w-[689px] lg:max-w-[1110px] mt-400 mx-auto">
              {users.map((user) => (
                <MultiplayerFooter
                  key={user.id}
                  id={user.id}
                  moves={user.moves}
                  playerCount={formData.players}
                  className={
                    formData.players === "2"
                      ? "w-full md:w-[271px]"
                      : "w-full md:w-[542px]"
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamePage;
