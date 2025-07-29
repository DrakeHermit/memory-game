import { useNavigate } from "react-router-dom";
import useLobbyStore from "../store/useLobbyStore";
import { Header } from "../components/Header";

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData, handleGameStart } = useLobbyStore();

  return (
    <div className="bg-blue-950 min-h-screen text-center pt-[5rem] md:pt-[7rem] text-white">
      <div className="md:mb-700 mb-600 text-center">
        <Header />
      </div>
      <main className="text-white text-left max-w-[327px] mx-auto md:max-w-[654px]">
        <div className="bg-white rounded-2xl p-[1.5rem] md:p-[3.5rem] shadow-2xl">
          <div className="space-y-8">
            <section>
              <h2 className="text-blue-400 text-[20px] font-bold mb-4">
                Select Theme
              </h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="radio"
                    name="theme"
                    value="numbers"
                    id="numbers"
                    className="sr-only peer"
                    checked={formData.theme === "numbers"}
                    onChange={() => setFormData("theme", "numbers")}
                  />
                  <label
                    htmlFor="numbers"
                    className={`block w-full py-3 px-6 text-center rounded-full font-bold text-[26px] cursor-pointer transition-colors ${
                      formData.theme === "numbers"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-600 hover:bg-blue-350 hover:text-white"
                    }`}
                  >
                    Numbers
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    name="theme"
                    value="icons"
                    id="icons"
                    className="sr-only peer"
                    checked={formData.theme === "icons"}
                    onChange={() => setFormData("theme", "icons")}
                  />
                  <label
                    htmlFor="icons"
                    className={`block w-full py-3 px-6 text-center rounded-full text-[26px] font-bold cursor-pointer transition-colors ${
                      formData.theme === "icons"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-600 hover:bg-blue-350 hover:text-white"
                    }`}
                  >
                    Icons
                  </label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-blue-400 text-[20px] font-bold mb-4">
                Numbers of Players
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {(["1", "2", "3", "4"] as const).map((num) => (
                  <div key={num}>
                    <input
                      type="radio"
                      name="players"
                      value={num}
                      id={`players-${num}`}
                      className="sr-only peer"
                      checked={formData.players === num}
                      onChange={() => setFormData("players", num)}
                    />
                    <label
                      htmlFor={`players-${num}`}
                      className={`block w-full py-3 text-center rounded-full font-bold text-[26px] cursor-pointer transition-colors ${
                        formData.players === num
                          ? "bg-slate-800 text-white"
                          : "bg-slate-200 text-slate-600 hover:bg-blue-350 hover:text-white"
                      }`}
                    >
                      {num}
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-blue-400 text-[20px] font-bold mb-4">
                Grid Size
              </h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="radio"
                    name="gridSize"
                    value="4x4"
                    id="grid-4x4"
                    className="sr-only peer"
                    checked={formData.gridSize === "4x4"}
                    onChange={() => setFormData("gridSize", "4x4")}
                  />
                  <label
                    htmlFor="grid-4x4"
                    className={`block w-full py-3 px-6 text-center rounded-full text-[26px] font-bold cursor-pointer transition-colors ${
                      formData.gridSize === "4x4"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-600 hover:bg-blue-350 hover:text-white"
                    }`}
                  >
                    4x4
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    name="gridSize"
                    value="6x6"
                    id="grid-6x6"
                    className="sr-only peer"
                    checked={formData.gridSize === "6x6"}
                    onChange={() => setFormData("gridSize", "6x6")}
                  />
                  <label
                    htmlFor="grid-6x6"
                    className={`block w-full py-3 px-6 text-center rounded-full text-[26px] font-bold cursor-pointer transition-colors ${
                      formData.gridSize === "6x6"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-600 hover:bg-blue-350 hover:text-white"
                    }`}
                  >
                    6x6
                  </label>
                </div>
              </div>
            </section>

            <button
              type="button"
              onClick={() => handleGameStart(navigate)}
              className="w-full py-4 px-6 bg-orange-400 hover:bg-orange-300 text-[26px] text-white text-lg font-semibold rounded-full transition-colors cursor-pointer"
            >
              Start Game
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LobbyPage;
