import { SolidPlus } from "@/assets/icons/SolidPlus";
import Button from "./Button";
import { Share } from "@/assets/icons/Share";
import { Filter } from "@/assets/icons/Filter";
import { Automation } from "@/assets/icons/Automation";
import { CalendarView } from "@/assets/icons/CalendarView";
import { Search } from "@/assets/icons/Search";

export const ActionsBar = ({ handleCreateTask }: { handleCreateTask: any }) => {
  return (
    <>
      <div>
        <div className="absolute">
          <div className="relative start-44 top-2">
            <Search />
          </div>
        </div>
        <input
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="focus:outline-none text-[#797979] bg-[#F4F4F4] flex rounded mx-2"
        >
          Calendar View &nbsp;
          <CalendarView />
        </button>
        <button
          type="button"
          className="focus:outline-none text-[#797979] bg-[#F4F4F4] flex rounded mx-2"
        >
          Automation &nbsp;
          <Automation />
        </button>
        <button
          type="button"
          className="focus:outline-none text-[#797979] bg-[#F4F4F4] flex rounded mx-2"
        >
          Filter &nbsp;
          <Filter />
        </button>
        <button
          type="button"
          className="focus:outline-none text-[#797979] bg-[#F4F4F4] flex rounded mx-2"
        >
          Share &nbsp;
          <Share />
        </button>
        <div className="items-center">
          <Button
            text="Create new"
            icon={<SolidPlus />}
            onClick={() => {
              handleCreateTask("");
            }}
          />
        </div>
      </div>
    </>
  );
};
