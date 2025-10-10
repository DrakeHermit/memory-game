import { useState } from "react";
import { useParams } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";
import useLobbyStore from "../store/useLobbyStore";
import { Header } from "../components/Header";
import { useSocketStore } from "../store/socketStore";
import { useLobbyEffects } from "../hooks/useLobbyEffects";

const LobbyPage = () => {
  const { roomId } = useParams();
  const { formData } = useLobbyStore();
  const {
    isRoomCreator,
    roomId: storeRoomId,
    players,
    changeName,
    toggleReady,
    startGame,
  } = useSocketStore();
  const isJoiningViaLink = roomId !== storeRoomId && !isRoomCreator;
  useLobbyEffects({ roomId, isJoiningViaLink, isRoomCreator });
  const copyUrl = `${window.location.origin}/lobby/${roomId}`;
  const [playerName, setPlayerName] = useState("");
  const isReady =
    players.length === Number(formData.players) &&
    players.length > 0 &&
    players.slice(1).every((player) => player.ready);

  const handleStartGame = () => {
    if (roomId) {
      startGame(roomId);
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen text-center pt-[0.5rem] md:pt-[7rem] text-white">
      <div className="md:mb-700 mb-100 text-center">
        <Header />
      </div>
      <main className="text-white text-left max-w-[327px] mx-auto md:max-w-[654px]">
        <div className="bg-white rounded-2xl p-[1.5rem] md:p-[3.5rem] shadow-2xl">
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gray-100 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-blue-800 mb-3 text-center text-lg md:text-xl">
                Game Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="text-center">
                  <p className="text-blue-400 mb-1">Theme</p>
                  <p className="font-semibold text-blue-800 capitalize">
                    {formData.theme}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 mb-1">Grid Size</p>
                  <p className="font-semibold text-blue-800">
                    {formData.gridSize}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isRoomCreator && (
            <div className="mt-4 pt-4 border-t border-blue-300">
              <p className="text-sm font-bold text-left text-blue-800 mb-2 md:text-base">
                Share this link with friends:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={roomId ? copyUrl : "Room link will appear here"}
                  readOnly
                  className="flex-1 text-center text-sm text-blue-950 bg-white px-3 py-2 rounded border border-blue-300"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(copyUrl || "")}
                  disabled={!roomId}
                  className="w-full sm:w-auto bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-950 transition-colors cursor-pointer text-sm md:text-base"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div className="mt-4">
            {isJoiningViaLink && (
              <div className="bg-gray-100 rounded-lg p-4 md:p-6 text-center">
                <div className="mb-4">
                  <label
                    htmlFor="playerName"
                    className="block text-sm font-medium text-blue-800 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                    }}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border text-blue-950 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    disabled={!playerName}
                    onClick={() => changeName(roomId!, playerName)}
                    className="bg-orange-400 w-1/2 text-blue-950 p-2 rounded font-semibold hover:bg-blue-950 hover:text-white transition-colors cursor-pointer text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Change Name
                  </button>
                  <button
                    onClick={() => toggleReady(roomId!)}
                    className="bg-green-400 w-1/2 text-blue-950 p-2 rounded font-semibold hover:bg-blue-950 hover:text-white transition-colors cursor-pointer text-sm md:text-base"
                  >
                    Ready
                  </button>
                </div>
              </div>
            )}
            <h3 className="font-semibold mt-4 text-blue-800 text-center md:text-left text-md md:text-xl">
              Players ({players.length}/{formData.players})
            </h3>
            <div className="space-y-3 mt-2 md:mt-6">
              {players.length === 0 ? (
                <div className="text-center text-blue-400 text-sm md:text-base py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <HiUsers className="text-4xl mb-3 mx-auto text-blue-300" />
                  <p>Waiting for players to join...</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {players.map((player, index) => {
                    const isCurrentPlayerRoomCreator = index === 0;
                    return (
                      <div
                        key={player.id}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {player.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900 text-sm md:text-base">
                              {player.name}
                              {isCurrentPlayerRoomCreator && (
                                <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-medium">
                                  Host
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-blue-600">
                              Player {index + 1}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCurrentPlayerRoomCreator ? (
                            <>
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-xs text-blue-600 font-medium">
                                Host
                              </span>
                            </>
                          ) : (
                            <>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  player.ready ? "bg-green-400" : "bg-gray-400"
                                }`}
                              ></div>
                              <span
                                className={`text-xs font-medium ${
                                  player.ready
                                    ? "text-green-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {player.ready ? "Ready" : "Not Ready"}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {isRoomCreator && (
            <button
              onClick={handleStartGame}
              disabled={!isReady}
              className="w-full sm:flex-1 mt-4 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default LobbyPage;
