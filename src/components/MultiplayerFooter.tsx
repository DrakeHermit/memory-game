interface UserProps {
  id: string;
  moves: number;
}

export const MultiplayerFooter = ({ id, moves }: UserProps) => {
  return (
    <div className="flex justify-between items-center bg-blue-100 py-200 px-[22.6px] text-blue-400 text-[18px] font-bold rounded-md">
      <span>{id}</span>
      <span className="text-[32px] text-blue-800">{moves}</span>
    </div>
  );
};
