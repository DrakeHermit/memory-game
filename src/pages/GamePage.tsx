import { GameBoard } from "../components/GameBoard";
import { NavBar } from "../components/NavBar";
import { TimeComponent } from "../components/TimeComponent";
import useLobbyStore from "../store/useLobbyStore";
import { generateGrid, getGridSize } from "../utils/gameUtils";

interface gridClasses {
  [key: number]: string;
}

const GamePage = () => {
  const { formData } = useLobbyStore();
  const size = getGridSize(formData.gridSize);
  const coins = generateGrid(formData.gridSize);

  const gridClasses: gridClasses = {
    4: "grid-cols-4",
    6: "grid-cols-6",
  };

  return (
    <div className="bg-white">
      <NavBar />
      <div
        className={`grid place-self-center ${
          size === 4 ? "gap-[8px] md:gap-400" : "gap-[8px] md:gap-200"
        } ${gridClasses[size]} mt-1000 md:mt-[8.5rem] lg:mt-[6.2rem]`}
      >
        {coins.map((coin) => (
          <GameBoard key={coin.id} />
        ))}
      </div>
      <div>
        <div
          className={`grid grid-cols-2 place-self-center min-w-[326px] md:min-w-[542px] ${
            size === 4 && "md:mt-[100px]"
          } md:mt-[100px] lg:mt-[106px] mt-[125px] gap-200 md:gap-400`}
        >
          <TimeComponent />
          <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md">
            Moves <span className="text-[32px] text-blue-800">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
