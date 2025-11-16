const MultiplayerResultModal = ({ playerId }: { playerId: string }) => {
  return (
    <div className="absolute top-0 left-0 z-1000 w-screen flex min-h-screen justify-center items-center bg-black/50">
      <div className="bg-gray-100 py-[28px] px-[24px] md:px-300 md:p-[55px] rounded-lg shadow-lg text-center md:min-w-[654px]">
        <h3 className="text-blue-950 text-[24px] md:text-[48px] font-bold mb-[8px] md:mb-200">
          Player {playerId} wins!
        </h3>
        <p className="text-blue-400 text-[14px] md:text-[18px] font-bold mb-300 md:my-500">
          Game over! Here's here are the results...
        </p>

        <div className="flex justify-center md:flex-row flex-col gap-200">
          <button className="bg-orange-400 text-[18px] md:text-[20px] text-white w-full md:w-1/2 font-bold py-[12px] md:py-[13px] md:px-[28px] rounded-full cursor-pointer">
            Restart
          </button>
          <button
            className="bg-blue-100 text-[18px] md:text-[20px] rounded-full w-full md:w-1/2 md:py-[13px] py-[12px] md:px-[28px] text-blue-800 font-bold cursor-pointer"
            type="button"
          >
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerResultModal;
