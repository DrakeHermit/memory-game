function App() {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gray-100">
        <h1 className="text-3xl">Welcome to My App</h1>
        <p>This is a simple React application.</p>
        <button
          className="rounded-xl p-4 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          onClick={() => alert("Button clicked!")}
        >
          Click Me
        </button>
      </div>
    </>
  );
}

export default App;
