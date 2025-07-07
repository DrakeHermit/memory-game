export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center max-w-[327px] md:max-w-[689px] lg:max-w-[1110px] mt-400 md:mt-[37px] lg:mt-[67px] mx-auto">
      <div>
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/assets/memory-logo-lg.png"
          />
          <img src="/assets/memory-logo-sm.png" alt="Memory Game Logo" />
        </picture>
      </div>
      <div className="flex">
        <div>
          <button type="button" className="md:hidden">
            Menu
          </button>
        </div>
        <div className="hidden md:flex gap-200 md:text-[20px]">
          <button type="button">Restart</button>
          <button type="button">New Game</button>
        </div>
      </div>
    </nav>
  );
};
