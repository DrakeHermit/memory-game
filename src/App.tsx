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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
