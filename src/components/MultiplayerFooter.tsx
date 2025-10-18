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
  );
};
