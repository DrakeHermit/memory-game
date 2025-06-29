import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LobbyPage from "./pages/LobbyPage";
import { Header } from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

function App() {
  return (
    <div className="flex flex-col bg-blue-950 h-screen items-center justify-center gap-1000 text-white">
      <Header />
      <main className="text-white">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
