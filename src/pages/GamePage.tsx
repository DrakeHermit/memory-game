import { GameBoard } from "../components/GameBoard";
import { NavBar } from "../components/NavBar";
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
    </div>
  );
};

export default GamePage;
