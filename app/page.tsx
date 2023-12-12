"use client";
import ActivityFeed from "./components/ActivityFeed";
import ServerInfo from "./components/ServerInfo";
import Banner from "./components/Banner";
import MainLaptimesTable from "./components/MainLaptimesTable";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export interface ClientSessionUpdateType {
  timestamp: string;
  client_session_id: number;
  driver_id: string;
  car_model: string;
  event: string;
}
export interface LaptimeType {
  laptime: number;
  driver_id: string;
  car_model: string;
  lap_timestamp: string;
  cuts: number;
}
export interface GameSessionInfoType {
  game_session_id: number;
  server_name: string;
  track_name: string;
  track_config: string;
  session_time: number;
  session_name: string;
  lap_number: number;
  ambient_temp: number;
  road_temp: number;
  weather_graphics: string;
  elapsed_ms: number;
}
export default function Home() {
  const [messages, setMessages] = useState<ClientSessionUpdateType[]>([]);
  const [laptimes, setLaptimes] = useState<LaptimeType[]>([]);
  const [currentServerInfo, setcurrentServerInfo] =
    useState<GameSessionInfoType | null>(null);
  const dataServerAddress: string =
    process.env.NEXT_PUBLIC_API_SERVER ?? "localhost";

  const forceUpdateServerData = () => {
    return new Promise(async (resolve) => {
      await fetch(dataServerAddress + "update_game_data/")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(resolve, 200);
        });
    });
  };

  const getAndSetCurrentServerInfo = (): Promise<any> => {
    return new Promise(async (resolve) => {
      await fetch(dataServerAddress + "current_game_data/")
        .then((res) => res.json())
        .then((data) => {
          setcurrentServerInfo(data[0]);
          resolve(data[0]);
        });
    });
  };

  const getAndSetFastestLapsForTrack = (
    track_name: string,
    track_config: string
  ): Promise<void> => {
    return new Promise(async (resolve) => {
      await fetch(
        dataServerAddress +
          `laptimes/?track_name=${track_name}&track_config=${track_config}&numberOfRecords=${20}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLaptimes(data);
          resolve();
        });
    });
  };

  const handleNewMessage = (newMessage: ClientSessionUpdateType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleClientActivity = (data: string) => {
    if (data == "CONNECTION") {
      fetch(dataServerAddress + "latest_connect/")
        .then((res) => res.json())
        .then((data) => {
          handleNewMessage({
            timestamp: data[0].session_start,
            client_session_id: data[0].client_session_id,
            driver_id: data[0].driver_id,
            car_model: data[0].car_model,
            event: "CONNECTION",
          });
        });
    } else if (data == "DISCONNECTION") {
      fetch(dataServerAddress + "latest_disconnect/")
        .then((res) => res.json())
        .then((data) => {
          handleNewMessage({
            timestamp: data[0].session_end,
            client_session_id: data[0].client_session_id,
            driver_id: data[0].driver_id,
            car_model: data[0].car_model,
            event: "DISCONNECTION",
          });
        });
    }
  };

  useEffect(() => {
    forceUpdateServerData().then(() => {
      getAndSetCurrentServerInfo().then((serverData) => {
        getAndSetFastestLapsForTrack(
          serverData.track_name,
          serverData.track_config
        );
      });
    });

    const socket = io(dataServerAddress);
    socket.on("client_activity", (data) => {
      handleClientActivity(data);
    });
    socket.on("lap_activity", (data) => {
      if (currentServerInfo) {
        getAndSetFastestLapsForTrack(
          currentServerInfo.track_name,
          currentServerInfo.track_config
        );
      }
    });
    socket.on("game_session_activity", (data) => {
      getAndSetCurrentServerInfo();
    });
  }, []);

  return (
    <div id="root">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Banner currentServerInfo={currentServerInfo} />
              <div className="grid grid-cols-12 gap-6  ">
                <MainLaptimesTable
                  laptimes={laptimes}
                  currentServerInfo={currentServerInfo}
                />
                <div className="col-span-full xl:col-span-4 l:col-span-4 md:col-span-4 gap-6">
                  <div className="grid grid-cols-12 gap-6 min-h-full ">
                    <ServerInfo currentServerInfo={currentServerInfo} />
                    <ActivityFeed messages={messages} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
