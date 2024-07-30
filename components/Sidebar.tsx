import { Analytics } from "@/assets/icons/Analytics";
import { Boards } from "@/assets/icons/Boards";
import { Forward } from "@/assets/icons/Forward";
import { Notification } from "@/assets/icons/Notification";
import { ScreenMode } from "@/assets/icons/ScreenMode";
import { Settings } from "@/assets/icons/Settings";
import { Teams } from "@/assets/icons/Teams";
import Button from "./Button";
import { SolidPlus } from "@/assets/icons/SolidPlus";
import { Download } from "@/assets/icons/Download";
import { Home } from "@/assets/icons/Home";
import { useRouter } from "next/navigation";

export const Sidebar = ({
  handleCreateTask,
  name,
}: {
  handleCreateTask: any;
  name: string;
}) => {
  const { push } = useRouter();
  return (
    <div>
      <div className="flex mt-4">
        <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center">
          <svg
            className="absolute w-6 h-6 text-gray-400 -bottom-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        &nbsp;
        <div className="flex justify-center items-center text-xl font-semibold">
          {name}
        </div>
      </div>
      <div className="flex mt-4 justify-between items-center">
        <div className="flex items-center gap-4">
          <Notification />
          <ScreenMode />
          <Forward />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="focus:outline-none text-[#797979] bg-[#F4F4F4] font-medium rounded-md text-sm px-2 py-2 flex items-center"
            onClick={() => {
              localStorage.removeItem("authToken");
              push("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between h-[calc(80vh)]">
        <div>
          <div className="text-[#797979] font-normal text-xl bg-white w-full">
            <button
              type="button"
              className="relative inline-flex items-center w-full px-2 py-2 text-sm font-medium bg-gray-200 rounded-md"
            >
              <Home />
              &nbsp; Home
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-2 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <Boards />
              &nbsp; Boards
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-2 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <Settings />
              &nbsp; Settings
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-2 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <Teams />
              &nbsp; Teams
            </button>
            <button
              type="button"
              className="relative inline-flex items-center w-full px-2 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <Analytics />
              &nbsp; Analytics
            </button>
          </div>
          <div className="mt-2">
            <Button
              text="Create new task"
              icon={<SolidPlus />}
              onClick={() => {
                handleCreateTask("");
              }}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="focus:outline-none text-[#797979] bg-[#F3F3F3] font-medium rounded-md text-sm px-2 py-2 flex w-full"
          >
            <div>
              <Download />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-xl">Download the app</div>
              <div className="text-xs">Get the full experience</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
