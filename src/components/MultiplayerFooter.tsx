interface UserProps {
  id: string;
  className?: string;
  playerCount?: string;
  moves: number;
}

export const MultiplayerFooter = ({ id, moves, className }: UserProps) => {
  const shortId = id.charAt(0).toUpperCase();
  const fullId = id;

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md ${className}`}
    >
      <span className="text-center md:text-left">
        <span className="md:hidden">{shortId}</span>
        <span className="hidden md:inline">{fullId}</span>
      </span>
      <span className="text-[32px] text-blue-800 text-center md:text-left">
        {moves}
      </span>
    </div>
  );
};
