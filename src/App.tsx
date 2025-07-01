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
    <div className="bg-blue-950 min-h-screen text-center pt-[5rem] md:pt-[7rem] text-white">
      <div className="md:mb-1000 mb-600">
        <Header />
      </div>
      <main className="text-white text-left max-w-[327px] mx-auto md:max-w-[654px]">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
