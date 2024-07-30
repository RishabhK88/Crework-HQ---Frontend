"use client";
import { useEffect, useState } from "react";
import { HelpAndFeedback } from "@/assets/icons/HelpAndFeedback";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteTask,
  fetchAllTasks,
  updateTaskPriority,
} from "@/slices/taskSlice";
import { Columns } from "@/assets/icons/Columns";
import { Sidebar } from "@/components/Sidebar";
import { BannerSection } from "@/components/BannerSection";
import { ActionsBar } from "@/components/ActionsBar";
import { DragDropComponent } from "@/components/DragDropComponent";
import { fetchUser } from "@/slices/userSlice";

interface ColumnDefinition {
  name: string;
  items: any[];
}

interface Columns {
  ToDo: ColumnDefinition;
  UnderReview: ColumnDefinition;
  InProgress: ColumnDefinition;
  Completed: ColumnDefinition;
}

export default function TaskBoard() {
  const [columns, setColumns] = useState<Columns>({
    ToDo: {
      name: "To Do",
      items: [],
    },
    UnderReview: {
      name: "Under Review",
      items: [],
    },
    InProgress: {
      name: "In Progress",
      items: [],
    },
    Completed: {
      name: "Completed",
      items: [],
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const [todo, setTodo] = useState<any[]>([]);
  const [inProgress, setInProgress] = useState<any[]>([]);
  const [underReview, setUnderReview] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  const [createInStatus, setCreateInStatus] = useState("");
  const [createInTitle, setCreateInTitle] = useState("");
  const [createInPriority, setCreateInPriority] = useState("");
  const [createInDescription, setCreateInDesription] = useState("");
  const [createInDeadline, setCreateInDeadline] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [userName, setUserName] = useState("");

  const tasksData = useAppSelector(
    (state) => state.task.getAllTasksSlice.tasksData
  );

  const userData = useAppSelector(
    (state) => state.user.fetchUserSlice.userData
  );

  const dispatch = useAppDispatch();

  const getTasksDataFunc = () => {
    return new Promise<void>((resolve) => {
      dispatch(
        fetchAllTasks({
          authToken: localStorage.getItem("authToken") || "",
        })
      ).then(() => {
        resolve();
      });
    });
  };

  const getUserDataFunc = () => {
    return new Promise<void>((resolve) => {
      dispatch(
        fetchUser({
          authToken: localStorage.getItem("authToken") || "",
        })
      ).then(() => {
        resolve();
      });
    });
  };

  useEffect(() => {
    setFlag(false);
    setOpen(true);
    Promise.all([getTasksDataFunc(), getUserDataFunc()]).then(() => {
      setFlag(true);
    });
  }, [refresh]);

  useEffect(() => {
    if (flag) {
      let tempTodo: any[] = [];
      let tempUnderReview: any[] = [];
      let tempInProgress: any[] = [];
      let tempCompleted: any[] = [];

      tasksData?.forEach((task) => {
        if (task.status === "ToDo") {
          tempTodo.push(task);
        } else if (task.status === "UnderReview") {
          tempUnderReview.push(task);
        } else if (task.status === "InProgress") {
          tempInProgress.push(task);
        } else {
          tempCompleted.push(task);
        }
      });

      setTodo(tempTodo);
      setUnderReview(tempUnderReview);
      setInProgress(tempInProgress);
      setCompleted(tempCompleted);

      const taskStatus = {
        ToDo: { name: "To Do", items: tempTodo },
        UnderReview: { name: "Under Review", items: tempUnderReview },
        InProgress: { name: "In Progress", items: tempInProgress },
        Completed: { name: "Completed", items: tempCompleted },
      };

      setColumns(taskStatus);
      setUserName(userData.user || "");
      setOpen(false);
    }
  }, [flag]);

  const handleCreateTask = () => {
    setOpenModal(true);
  };

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      dispatch(
        updateTaskPriority({
          authToken: localStorage.getItem("authToken") || "",
          taskId: result.draggableId,
          requestBody: {
            status: destination.droppableId,
          },
        })
      )
        .then(() => {
          setRefresh((refresh) => refresh + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleModalClose = (refresh?: boolean) => {
    setOpenModal(false);
    if (refresh) {
      setRefresh((refresh) => refresh + 1);
    }
  };

  const handleDelete = (taskId: string) => {
    dispatch(
      deleteTask({
        authToken: localStorage.getItem("authToken") || "",
        taskId: taskId,
      })
    )
      .then(() => {
        setRefresh((refresh) => refresh + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setCreateTaskStatus = (
    status: string,
    title?: string,
    priority?: string,
    description?: string,
    taskId?: string,
    deadline?: string,
    update?: boolean
  ) => {
    setCreateInStatus(status);
    setCreateInDesription(description || "");
    setCreateInPriority(priority || "");
    setCreateInTitle(title || "");
    setTaskId(taskId || "");
    setCreateInDeadline(deadline || "");
    setIsUpdate(update || false);
    handleCreateTask();
  };

  return (
    <>
      {" "}
      {open ? (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        ""
      )}
      <div
        className={`grid grid-cols-5 w-screen h-screen ${
          open ? "opacity-50" : ""
        }`}
      >
        <Modal
          isOpen={openModal}
          onClose={handleModalClose}
          filledInStatus={createInStatus}
          filledInTitle={createInTitle}
          filledInDescription={createInDescription}
          filledInPriority={createInPriority}
          filledInDeadline={createInDeadline}
          taskId={taskId}
          update={isUpdate}
        />

        <div className="col-span-1 p-4">
          <Sidebar
            handleCreateTask={setCreateTaskStatus}
            name={userName.split(" ")[0]}
          />
        </div>
        <div className="col-span-4 p-4 bg-gray-100">
          <div className="h-full w-full">
            <div className="flex justify-between items-center">
              <div className="text-5xl font-semibold">
                Good Morning, {userName.split(" ")[0]}!
              </div>
              <div className="flex">
                <div className="text-base font-normal">Help & Feedback</div>
                &nbsp;
                <HelpAndFeedback />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <BannerSection />
            </div>
            <div className="mt-4 flex justify-between">
              <ActionsBar handleCreateTask={setCreateTaskStatus} />
            </div>
            <div className="mt-2 p-2 bg-white justify-between grid grid-cols-4 gap-4 h-1/2">
              <DragDropComponent
                columns={columns}
                setColumns={setColumns}
                onDragEnd={onDragEnd}
                setCreateInStatus={setCreateTaskStatus}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
