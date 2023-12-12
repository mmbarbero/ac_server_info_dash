"use client";
import React from "react";
import { useState, useEffect } from "react";
import { GameSessionInfoType } from "../page";

const ServerInfo = ({
  currentServerInfo,
}: {
  currentServerInfo: GameSessionInfoType | null;
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (currentServerInfo) {
      setElapsedTime(currentServerInfo.elapsed_ms);
    }
  }, [currentServerInfo]);
  useEffect(() => {
    if (elapsedTime > 0) {
      const intervalId = setInterval(() => {
        setElapsedTime((prevValue) => prevValue + 1000);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [elapsedTime]);

  const millisecondsToTimeWithHours = (milliseconds: number): string => {
    let seconds: number = Math.floor(milliseconds / 1000);
    let minutes: number = Math.floor(seconds / 60);
    let hours: string = "";

    if (minutes > 59) {
      const hoursNumber: number = Math.floor(minutes / 60);
      hours = hoursNumber >= 10 ? hoursNumber.toString() : "0" + hoursNumber;

      minutes = minutes - hoursNumber * 60;
      minutes = minutes >= 10 ? minutes : minutes + 100;
    }
    seconds = seconds % 60;
    const formattedSeconds: string =
      seconds >= 10 ? seconds.toString() : "0" + seconds;
    let formattedMinutes: string =
      minutes >= 10 ? minutes.toString() : "0" + minutes;
    if (hours !== "") {
      formattedMinutes = minutes % 100 >= 10 ? (minutes % 100).toString() : "0" + minutes % 100;
      return hours + ":" + formattedMinutes + ":" + formattedSeconds;
    }
    return formattedMinutes + ":" + formattedSeconds;
  };

  return (
    <div className="col-span-full xs:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Server Info{" "}
        </h2>
      </header>
      <div className="p-3 grid grid-cols-2  ">
        <div className="break-all flex flex-col  ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase  text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Track Name</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium ">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.track_name}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="break-all flex flex-col ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Track Config</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.track_config}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 grid grid-cols-2  ">
        <div className="break-all flex flex-col  ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Session Time</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {millisecondsToTimeWithHours(
                        currentServerInfo.session_time * 60 * 1000
                      )}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="break-all flex flex-col ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Session Name</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.session_name}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 grid grid-cols-2  ">
        <div className="break-all flex flex-col  ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Elapsed Time</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {millisecondsToTimeWithHours(elapsedTime)}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="break-all flex flex-col ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Lap Number</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.lap_number}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 grid grid-cols-2  ">
        <div className="break-all flex flex-col  ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Ambient Temp</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.ambient_temp}º
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="break-all flex flex-col ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Road Temp</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.road_temp}º
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-3 grid grid-cols-2  ">
        <div className="break-all flex flex-col  ">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Weather</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                {currentServerInfo && (
                  <td className="p-2">
                    <div className="flex items-center ">
                      {currentServerInfo.weather_graphics}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
