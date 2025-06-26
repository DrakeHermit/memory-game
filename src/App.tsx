import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Lobby</div>,
  },
  {
    path: "/game",
    element: <div>Game</div>,
  },
  {
    path: "/endgame-stats",
    element: <div>End Game Stats</div>,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

function App() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-blue-950 text-white">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
