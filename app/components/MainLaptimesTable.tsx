import React from "react";
import { LaptimeType } from "../page";
import { GameSessionInfoType } from "../page";

const MainLaptimesTable = ({
  laptimes,
  currentServerInfo,
}: {
  laptimes: LaptimeType[] | null;
  currentServerInfo: GameSessionInfoType | null;
}) => {
  const millisecondsToTime = (milliseconds: number) => {
    let seconds: number = milliseconds / 1000;
    let minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    const formattedSeconds: string = remainingSeconds.toFixed(3);
    const formattedSecondsWithLeadingZero: string =
      remainingSeconds >= 10 ? formattedSeconds : "0" + formattedSeconds;
    const formattedTime: string = `${minutes}:${formattedSecondsWithLeadingZero}`;
    return formattedTime;
  };

  const sorted20LapsAsc = laptimes
    ?.sort((a, b) => (a.laptime < b.laptime ? -1 : 1))
    .slice(0, 20);

  const parseDateTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-GB").replace(",", "");
    return formattedDate;
  };

  return (
    <div className="col-span-full xl:col-span-8 l:col-span-8 md:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Fastest Laps in track:{" "}
          <b>
            {currentServerInfo?.track_name}({currentServerInfo?.track_config})
          </b>{" "}
        </h2>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Rank</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Laptime</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Driver Id</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Car Model</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Timestamp</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Cuts</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {sorted20LapsAsc?.map((laptime, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">{index + 1}</div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {millisecondsToTime(laptime.laptime)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {laptime.driver_id}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {laptime.car_model}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        {parseDateTimestamp(laptime.lap_timestamp)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">{laptime.cuts}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainLaptimesTable;
