interface UserProps {
  id: string;
  className?: string;
  moves: number;
  hasTurn: boolean;
}

export const MultiplayerFooter = ({
  id,
  moves,
  className,
  hasTurn,
}: UserProps) => {
  const shortId = id.charAt(0).toUpperCase();

  return (
    <div>
      <div className="relative">
        {hasTurn && (
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-orange-400"></div>
        )}
        <div
          className={`flex flex-col md:flex-row justify-between items-center ${
            !hasTurn ? "bg-blue-300" : "bg-orange-400"
          } py-200 px-[22.6px] ${
            !hasTurn ? "text-blue-800" : "text-white"
          } text-[25px] md:text-[20px] font-bold rounded-md ${className}`}
        >
          <span className="text-center md:text-left">
            <span className="md:hidden font-bold]">{shortId}</span>
            <span className="hidden md:inline font-bold">{id}</span>
          </span>
          <span
            className={`text-[32px] ${
              !hasTurn ? "text-blue-800" : "text-white"
            } text-center md:text-left`}
          >
            {moves}
          </span>
        </div>
      </div>
      {hasTurn && (
        <p className="mt-200 text-center text-[13px] font-bold hidden md:block">
          CURRENT TURN
        </p>
      )}
    </div>
  );
};
