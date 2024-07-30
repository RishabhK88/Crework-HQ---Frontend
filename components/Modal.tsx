import { Close } from "@/assets/icons/Close";
import { Deadline } from "@/assets/icons/Deadline";
import { Favorite } from "@/assets/icons/Favorite";
import { Priority } from "@/assets/icons/Priority";
import { Resize } from "@/assets/icons/Resize";
import { Share } from "@/assets/icons/Share";
import { Status } from "@/assets/icons/Status";
import { saveTask, updateTask } from "@/slices/taskSlice";
import { useAppDispatch } from "@/store/hooks";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: (refresh: boolean) => void;
  filledInStatus: string;
  filledInTitle: string;
  filledInPriority: string;
  filledInDescription: string;
  filledInDeadline: string;
  taskId: string;
  update: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  filledInStatus,
  filledInDescription,
  filledInPriority,
  filledInTitle,
  filledInDeadline,
  taskId,
  update,
}) => {
  const [title, setTitle] = useState<string>(filledInTitle);
  const [status, setStatus] = useState<string>(filledInStatus);
  const [priority, setPriority] = useState<string>(filledInPriority);
  const [deadline, setDeadline] = useState<string>(filledInDeadline);
  const [description, setDescription] = useState<string>(filledInDescription);
  const [updateMode, setUpdateMode] = useState<boolean>(update);
  const [id, setId] = useState<string>(taskId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setStatus(filledInStatus);
    setTitle(filledInTitle);
    setDescription(filledInDescription);
    setPriority(filledInPriority);
    setDeadline(filledInDeadline);
    setId(taskId);
    setUpdateMode(update);
  }, [
    filledInStatus,
    filledInDescription,
    filledInPriority,
    filledInTitle,
    taskId,
    update,
  ]);

  const handleCreateTask = () => {
    dispatch(
      saveTask({
        authToken: localStorage.getItem("authToken") || "",
        requestBody: {
          title: title,
          status: status,
          priority: priority === "" ? undefined : priority,
          description: description,
          deadline: deadline === "" ? undefined : new Date(deadline),
        },
      })
    )
      .then(() => {
        onClose(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdateTask = () => {
    dispatch(
      updateTask({
        authToken: localStorage.getItem("authToken") || "",
        taskId: taskId,
        requestBody: {
          title: title,
          status: status,
          priority: priority === "" ? undefined : priority,
          description: description,
          deadline: deadline === "" ? new Date() : new Date(deadline),
        },
      })
    )
      .then(() => {
        onClose(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  onClose(false);
                }}
              >
                <Close />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Resize />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="focus:outline-none text-[#797979] bg-[#F4F4F4] font-medium rounded-md text-sm px-2 py-2 flex items-center"
              >
                Share &nbsp; <Share />
              </button>
              <button
                type="button"
                className="focus:outline-none text-[#797979] bg-[#F4F4F4] font-medium rounded-md text-sm px-2 py-2 flex items-center"
              >
                Favorite &nbsp; <Favorite />
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="first_name"
              className="text-gray-900 text-5xl font-semibold outline-none focus:outline-none w-full p-2.5"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex items-center w-1/2 justify-between">
            <div className="flex">
              <Status /> &nbsp;
              <span className="font-medium text-[#666666] text-base">
                Status
              </span>
            </div>
            <select
              id="underline_select"
              className="py-0 px-0 w-1/2 text-sm text-gray-500 bg-transparent appearance-none outline-none focus:outline-none"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option selected value="">
                Not Selected
              </option>
              <option value="ToDo">To Do</option>
              <option value="UnderReview">Under Review</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center w-1/2 justify-between">
            <div className="flex">
              <Priority /> &nbsp;
              <span className="font-medium text-[#666666] text-base">
                Priority
              </span>
            </div>
            <select
              id="underline_select"
              className="py-0 px-0 w-1/2 text-sm text-gray-500 bg-transparent appearance-none outline-none focus:outline-none"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option selected value="">
                Not Selected
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex items-center w-1/2 justify-between">
            <div className="flex">
              <Deadline /> &nbsp;
              <span className="font-medium text-[#666666] text-base">
                Deadline
              </span>
            </div>
            <input
              type="date"
              className="bg-transparent text-gray-500 text-sm rounded-lg outline-none focus:outline-none w-1/2"
              placeholder="Not Selected"
              value={
                deadline ? new Date(deadline).toISOString().split("T")[0] : ""
              }
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="mt-4 text-[#000000] text-base">
          + Add custom property
        </button>
        <hr className="mt-4"></hr>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 mt-4 w-full text-sm text-gray-900 rounded-lg outline-none focus:outline-none"
          placeholder="Start writing, or drag your own files here."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={update ? handleUpdateTask : handleCreateTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
