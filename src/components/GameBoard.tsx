import useLobbyStore from "../store/useLobbyStore";
import { getGridSize } from "../utils/gameUtils";

export const GameBoard = () => {
  const { formData } = useLobbyStore();
  const size = getGridSize(formData.gridSize);

  return (
    <div
      className={`rounded-full bg-blue-800 ${
        size === 4
          ? "w-[73px] h-[73px] md:w-[118px] md:h-[118px]"
          : "w-[46px] h-[46px] md:w-[82px] md:h-[82px]"
      }
      }`}
    ></div>
  );
};
