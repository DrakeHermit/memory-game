interface IconProps {
  iconName: string;
}

export const Icon = ({ iconName }: IconProps) => {
  const iconMap: Record<string, string> = {
    "icon-0": "/assets/icons/futbol.svg",
    "icon-1": "/assets/icons/bug.svg",
    "icon-2": "/assets/icons/anchor.svg",
    "icon-3": "/assets/icons/moon.svg",
    "icon-4": "/assets/icons/flask.svg",
    "icon-5": "/assets/icons/snowflake.svg",
    "icon-6": "/assets/icons/sun.svg",
    "icon-7": "/assets/icons/lira-sign.svg",
    "icon-8": "/assets/icons/hand-spock.svg",
    "icon-9": "/assets/icons/car.svg",
  };

  return (
    <img
      src={iconMap[iconName]}
      alt="game icon"
      className="w-[35px] h-[35px] md:w-[56px] md:h-[56px]"
      onError={() => console.log("Failed to load:", iconMap[iconName])}
    />
  );
};
