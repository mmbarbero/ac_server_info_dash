import React from "react";
import { ClientSessionUpdateType } from "../page";

const ActivityFeed = ({
  messages,
}: {
  messages: ClientSessionUpdateType[] | null;
}) => {
  const addUserIcon =
    '<svg className="w-8 h-8 fill-current" viewBox="0 0 30 38" fill="#000000" id="add-user-left-2" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><path id="secondary" d="M3,17H7M5,19V15" style="fill: none; stroke: rgb(0, 169, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary" d="M9,21H20a1,1,0,0,0,1-1,7,7,0,0,0-7-7H12a6.91,6.91,0,0,0-2,.29" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><circle id="primary-2" data-name="primary" cx="13" cy="8" r="5" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></circle></svg>';
  const removeUserIcon =
    '<svg className="w-8 h-8 fill-current" viewBox="0 0 30 38" fill="#000000" id="delete-user-left-2" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><line id="secondary" x1="6" y1="15" x2="3" y2="18" style="fill: none; stroke: rgb(169, 44, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><line id="secondary-2" data-name="secondary" x1="3" y1="15" x2="6" y2="18" style="fill: none; stroke: rgb(169, 44, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><circle id="primary" cx="13" cy="8" r="5" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></circle><path id="primary-2" data-name="primary" d="M10,21H20a1,1,0,0,0,1-1,7,7,0,0,0-7-7H12a6.91,6.91,0,0,0-2,.29" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>';
  return (
    <div className=" col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Server Activity
        </h2>
      </header>
      <div className="p-3">
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            LIVE FEED
          </header>
          <ul className="my-1">
            {messages?.map((message, index) =>
              message.event == "CONNECTION" ? (
                <li className="flex px-2" key={index}>
                  <div className="w-9 h-9 rounded-full shrink-0 bg-white pt-1 my-1 mr-2 ">
                    <div dangerouslySetInnerHTML={{ __html: addUserIcon }} />
                  </div>
                  <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                    <div className="grow flex justify-between">
                      <div className="self-center">
                        The user <b>{message.driver_id}</b> has joined with the{" "}
                        <b>{message.car_model}</b>.
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="flex px-2" key={index + "B"}>
                  <div className="w-9 h-9 rounded-full shrink-0 bg-white my-2 mr-3">
                    <div dangerouslySetInnerHTML={{ __html: removeUserIcon }} />
                  </div>
                  <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                    <div className="grow flex justify-between">
                      <div className="self-center">
                        The user <b>{message.driver_id}</b> has left the server.
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
