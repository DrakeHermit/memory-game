import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LobbyLayout from "./layout/LobbyLayout";
import MultiplayerSetup from "./components/MultiplayerSetup";
import SinglePlayerContent from "./components/SinglePlayerContent";
import LobbyPage from "./pages/LobbyPage";
import { MultiplayerGamePage } from "./pages/MultiplayerGamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LobbyLayout>
        <SinglePlayerContent />
      </LobbyLayout>
    ),
  },
  {
    path: "/multiplayer-setup",
    element: (
      <LobbyLayout>
        <MultiplayerSetup />
      </LobbyLayout>
    ),
  },
  {
    path: "/lobby/:roomId",
    element: <LobbyPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/game/:gameId",
    element: <MultiplayerGamePage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

function App() {
  return (
    <div className="font-family-sans">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
