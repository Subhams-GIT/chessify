import React from "react";
import { useUser } from "@/Store/store";

interface TabItem {
  label: string;
  value: number;
  showProgress?: boolean;
}

const MAX_GAMES = 1000;

const Tab: React.FC = () => {
  const { gamesPlayed, badgesEarned } = useUser();

  const tabs: TabItem[] = [
    {
      label: "Games Played",
      value: gamesPlayed,
      showProgress: true,
    },
    {
      label: "Badges Earned",
      value: badgesEarned,
    },
  ];

  return (
    <div className="flex justify-around gap-6 md:gap-40 rounded-3xl">
      {tabs.map(({ label, value, showProgress }) => (
        <div
          key={label}
          className="flex w-1/2 flex-col rounded-2xl bg-white p-4 shadow-sm"
        >
          <span className="text-gray-600 font-semibold text-md md:text-lg">
            {label}
          </span>

          <span className="text-2xl md:text-5xl font-semibold">
            {value} <span className="text-sm font-extralight text-zinc-400">{label==='Games Played'?"total matches":"Achievements"}</span>
          </span>

          {showProgress && (
            <input
              type="range"
              value={value}
              max={MAX_GAMES}
              readOnly
              aria-label={`${label} progress`}
              className="mt-3"
              style={{ accentColor: "#09c331" ,background:'white' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;
