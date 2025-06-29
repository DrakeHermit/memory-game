const LobbyPage = () => {
  return (
    <form className="text-left">
      <label htmlFor="theme">Select Theme</label>
      <div className="flex gap-4">
        <div>
          <input type="radio" id="theme" name="numbers" />
        </div>
        <div>
          <input type="radio" id="theme" name="icons" />
        </div>
      </div>
    </form>
  );
};
export default LobbyPage;
