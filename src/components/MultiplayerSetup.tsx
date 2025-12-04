import { useNavigate } from "react-router-dom";
import useLobbyStore from "../store/useLobbyStore";
import { useSocketStore } from "../store/socketStore";
import { useEffect, useState } from "react";

const MultiplayerContent = () => {
  const { formData } = useLobbyStore();
  const {
    socket,
    isConnected,
    roomId,
    createRoom,
    removeRoom,
    connect,
  } = useSocketStore();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [copyUrl, setCopyUrl] = useState(
    `${window.location.origin}/lobby/${roomId || ""}`
  );

  useEffect(() => {
    if (!socket || !isConnected) {
      connect();
    }
  }, [socket, isConnected, connect]);

  useEffect(() => {
    if (roomId) {
      setCopyUrl(`${window.location.origin}/lobby/${roomId}`);
    } else {
      setCopyUrl("");
    }
  }, [roomId]);

  const handleCreateRoom = () => {
    if (!socket || !isConnected) {
      console.error("Socket not connected");
    }

    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }

    const newRoomId = `room-${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const gridSizeNumber = formData.gridSize === "4x4" ? 4 : 6;
    createRoom(
      newRoomId,
      formData.players,
      formData.theme,
      gridSizeNumber,
      playerName.trim()
    );
  };

  const handleRemoveRoom = () => {
    if (!socket || !isConnected) {
      console.error("Socket not connected");
      return;
    }
    removeRoom(roomId);
    navigate("/");
  };

  return (
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
            <p className="font-semibold text-blue-800">{formData.gridSize}</p>
          </div>
        </div>
      </div>

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
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border text-black border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleCreateRoom}
            className="w-full sm:w-auto bg-orange-400 text-white px-6 py-3 md:py-2 rounded-lg font-semibold hover:bg-orange-300 transition-colors text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConnected || !playerName.trim()}
          >
            Create New Room
          </button>
        </div>

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
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRemoveRoom}
          disabled={!roomId}
          className="w-full sm:flex-1 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Go to Lobby
        </button>
        <button
          onClick={handleRemoveRoom}
          className="w-full sm:flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 cursor-pointer"
        >
          Leave Room Creation
        </button>
      </div>
    </div>
  );
};

export default MultiplayerContent;
