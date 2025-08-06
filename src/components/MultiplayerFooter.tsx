interface UserProps {
  id: string;
  moves: number;
  className?: string;
  playerCount?: string;
}

export const MultiplayerFooter = ({
  id,
  moves,
  className,
  playerCount,
}: UserProps) => {
  const shortId = id.replace("player", "P");
  const fullId = id.charAt(0).toUpperCase() + id.slice(1);
  const shouldShowFullName = playerCount === "2";

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md ${className}`}
    >
      <span className="text-center md:text-left">
        {shouldShowFullName ? (
          <span className="md:hidden">{fullId}</span>
        ) : (
          <span className="md:hidden">{shortId}</span>
        )}
        <span className="hidden md:inline">{fullId}</span>
      </span>
      <span className="text-[32px] text-blue-800 text-center md:text-left">
        {moves}
      </span>
    </div>
  );
};
