import { useNavigate } from "react-router-dom";
import useLobbyStore from "../store/useLobbyStore";

const MultiplayerContent = () => {
  const { formData } = useLobbyStore();
  const navigate = useNavigate();

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
        <div className="text-center">
          <button className="w-full sm:w-auto bg-orange-400 text-white px-6 py-3 md:py-2 rounded-lg font-semibold hover:bg-orange-300 transition-colors text-sm md:text-base">
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
              value="Room link will appear here"
              readOnly
              className="flex-1 text-center text-sm text-blue-950 bg-white px-3 py-2 rounded border border-blue-300"
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText("Room link will appear here")
              }
              className="w-full sm:w-auto bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-950 transition-colors cursor-pointer text-sm md:text-base"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-blue-800 text-center md:text-left text-lg md:text-xl">
          Players (0/{formData.players})
        </h3>
        <div className="space-y-2">
          <div className="text-center text-blue-400 text-sm md:text-base py-4">
            Waiting for players to join...
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="w-full sm:flex-1 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-300 cursor-pointer">
          Start Game
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full sm:flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 cursor-pointer"
        >
          Leave Room Creation
        </button>
      </div>
    </div>
  );
};

export default MultiplayerContent;
