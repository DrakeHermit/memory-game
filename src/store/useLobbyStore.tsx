import { create } from "zustand";
import { useNavigate } from "react-router-dom";

interface FormData {
  theme: "numbers" | "icons";
  players: "1" | "2" | "3" | "4";
  gridSize: "4x4" | "6x6";
}

interface LobbyStore {
  formData: FormData;
  setFormData: (field: keyof FormData, value: string) => void;
  handleGameStart: (navigate: ReturnType<typeof useNavigate>) => void;
}

const useLobbyStore = create<LobbyStore>((set) => ({
  formData: {
    theme: "numbers",
    players: "1",
    gridSize: "4x4",
  },
  setFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  handleGameStart: (navigate) => {
    set((state) => {
      console.log("Starting game with:", state.formData);
      navigate("/game", { state: state.formData });
      return state;
    });
  },
}));

export default useLobbyStore;
