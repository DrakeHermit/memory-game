import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LobbyLayout from "./layout/LobbyLayout";
import MultiplayerContent from "./components/MultiplayerContent";
import SinglePlayerContent from "./components/SinglePlayerContent";

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
    path: "/multiplayer-lobby",
    element: (
      <LobbyLayout>
        <MultiplayerContent />
      </LobbyLayout>
    ),
  },
  {
    path: "/game",
    element: <GamePage />,
    children: [
      {
        path: "game/:gameId",
        element: <GamePage />,
      },
    ],
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
