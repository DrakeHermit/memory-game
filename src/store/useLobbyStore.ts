import { create } from "zustand";
import { useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware";

interface FormData {
  theme: "numbers" | "icons";
  players: "1" | "2" | "3" | "4";
  gridSize: "4x4" | "6x6";
}

interface LobbyStore {
  formData: FormData;
  setFormData: (field: keyof FormData, value: string) => void;
  handleGameStart: (
    navigate: ReturnType<typeof useNavigate>,
    multiplayer: boolean
  ) => void;
}

const useLobbyStore = create<LobbyStore>()(
  persist(
    (set) => ({
      formData: {
        theme: "numbers",
        players: "1",
        gridSize: "4x4",
      },
      setFormData: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      handleGameStart: (navigate, multiplayer) => {
        if (multiplayer) {
          navigate("/multiplayer-setup");
        } else {
          navigate("/game");
        }
      },
    }),
    {
      name: "lobby-storage",
    }
  )
);

export default useLobbyStore;
