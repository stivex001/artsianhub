import React from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";

type Props = {};

export const AdminHeader = (props: Props) => {
  return (
    <header className="bg-white w-full sticky top-0 left-0 z-50 flex items-center justify-end py-2 px-5">
      <div className="flex items-center gap-5">
        <button>
          <NotificationIcon />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
            <h1 className="text-base text-white">AB</h1>
          </div>
          <div className="flex flex-col">
            <p className="text-base ">Albert Bannor</p>
            <span className="text-xs text-grayish">
              Artisan ID:1237498948UI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
