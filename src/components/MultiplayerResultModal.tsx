import type { Player } from "../types/game";

const MultiplayerResultModal = ({
  playerName,
  players,
}: {
  playerName: string;
  players: Player[];
}) => {
  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="flex flex-col justify-center bg-gray-100 px-[55px] md:px-300 md:p-[55px] rounded-lg shadow-lg text-center md:min-w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          {playerName} wins!
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          Game over! Here are the results...
        </p>
        <div className="flex flex-col gap-200">
          {players.map((player) => (
            <div
              className="flex justify-between items-center bg-blue-100 p-200 rounded-md"
              key={player.id}
            >
              <p className="text-blue-400 text-[18px] font-bold">
                {player.name}
              </p>
              <p className="text-blue-800 text-[32px] font-bold">
                {player.pairsFound} Pairs
              </p>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-100 text-[18px] mt-[56px] self-center md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] text-blue-800 font-bold cursor-pointer"
          type="button"
        >
          Setup New Game
        </button>
      </div>
    </div>
  );
};

export default MultiplayerResultModal;
