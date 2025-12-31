import { Header } from "../components/Header";

const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-950 min-h-screen text-center pt-[2rem] md:pt-[7rem] text-white">
      <div className="md:mb-700 mb-300 text-center">
        <Header />
      </div>
      <main className="text-white text-left max-w-[327px] mx-auto md:max-w-[654px]">
        <div className="bg-white rounded-2xl p-[1.5rem] md:p-[3.5rem] shadow-2xl">
          {children}
        </div>
      </main>
    </div>
  );
};
export default LobbyLayout;
