import React from "react";
import { GameSessionInfoType } from "../page";

const Banner = ({
  currentServerInfo,
}: {
  currentServerInfo: GameSessionInfoType | null;
}) => {
  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      ></div>
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          AC Server Info 🚗
        </h1>
        <p className="dark:text-indigo-200">{currentServerInfo?.server_name}</p>
      </div>
    </div>
  );
};

export default Banner;
