import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  title: string;
  description: string;
  status: string;
  priority?: string;
  deadline?: Date | undefined;
}

// Get All Tasks By User

interface TasksData {
  loading: boolean;
  tasksData: Task[] | null;
  error: any;
}

const initialTasksData: TasksData = {
  loading: false,
  tasksData: [],
  error: [],
};

interface FetchAllTasksArgs {
  authToken: string;
}

export const fetchAllTasks = createAsyncThunk(
  "task/fetchAllTasks",
  async (args: FetchAllTasksArgs) => {
    const { authToken } = args;
    const response = await axios.get<any>(`https://creworkhqservice.onrender.com/task`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const allTasksSlice = createSlice({
  name: "tasksData",
  initialState: initialTasksData,
  reducers: {
    clearErrorList: (state) => {
      state.tasksData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasksData = action.payload;
        state.error = "";
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Get Task By ID

interface TaskData {
  loading: boolean;
  taskData: Task | null;
  error: any;
}

const initialTaskData: TaskData = {
  loading: false,
  taskData: null,
  error: [],
};

interface FetchTaskArgs {
  taskId: string;
  authToken: string;
}

export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async (args: FetchTaskArgs) => {
    const { taskId, authToken } = args;
    const response = await axios.get<any>(
      `https://creworkhqservice.onrender.com/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchTaskSlice = createSlice({
  name: "taskData",
  initialState: initialTaskData,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Save Task

interface SaveTaskState {
  loading: boolean;
  payload: Task | null;
  error: any;
}

const initialSaveTaskState: SaveTaskState = {
  loading: false,
  payload: null,
  error: [],
};

interface SaveTaskArgs {
  authToken: string;
  requestBody: Task;
}

export const saveTask = createAsyncThunk(
  "task/saveTask",
  async (args: SaveTaskArgs) => {
    const { authToken, requestBody } = args;
    const response = await axios.post<any>(
      `https://creworkhqservice.onrender.com/task/`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const saveTaskSlice = createSlice({
  name: "saveTaskSlice",
  initialState: initialSaveTaskState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Update Task

interface UpdateTaskState {
  loading: boolean;
  payload: Task | null;
  error: any;
}

const initialUpdateTaskState: UpdateTaskState = {
  loading: false,
  payload: null,
  error: [],
};

interface UpdateTaskArgs {
  authToken: string;
  taskId: string;
  requestBody: Task;
}

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (args: UpdateTaskArgs) => {
    const { authToken, taskId, requestBody } = args;
    const response = await axios.put<any>(
      `https://creworkhqservice.onrender.com/task/${taskId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const updateTaskSlice = createSlice({
  name: "updateTaskSlice",
  initialState: initialUpdateTaskState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Update Task Priority

interface TaskPriority {
  status: string;
}

interface UpdateTaskPriorityState {
  loading: boolean;
  payload: TaskPriority | null;
  error: any;
}

const initialUpdateTaskPriorityState: UpdateTaskPriorityState = {
  loading: false,
  payload: null,
  error: [],
};

interface UpdateTaskPriorityArgs {
  authToken: string;
  taskId: string;
  requestBody: TaskPriority;
}

export const updateTaskPriority = createAsyncThunk(
  "task/updateTaskPriority",
  async (args: UpdateTaskPriorityArgs) => {
    const { authToken, taskId, requestBody } = args;
    const response = await axios.put<any>(
      `https://creworkhqservice.onrender.com/task/updatePriority/${taskId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const updateTaskPrioritySlice = createSlice({
  name: "updateTaskPrioritySlice",
  initialState: initialUpdateTaskPriorityState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Delete Task

interface DeleteTaskState {
  loading: boolean;
  payload: object | null;
  error: any;
}

const initialDeleteTaskState: DeleteTaskState = {
  loading: false,
  payload: null,
  error: [],
};

interface DeleteTaskArgs {
  authToken: string;
  taskId: string;
}

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (args: DeleteTaskArgs) => {
    const { authToken, taskId } = args;
    const response = await axios.delete<any>(
      `https://creworkhqservice.onrender.com/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteTaskSlice = createSlice({
  name: "deleteTaskSlice",
  initialState: initialDeleteTaskState,
  reducers: {
    clearErrorList: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default combineReducers({
  getTaskSlice: fetchTaskSlice.reducer,
  getAllTasksSlice: allTasksSlice.reducer,
  saveTaskSlice: saveTaskSlice.reducer,
  updateTaskSlice: allTasksSlice.reducer,
  updateTaskPrioritySlice: updateTaskPrioritySlice.reducer,
  deleteTaskSlice: deleteTaskSlice.reducer,
});
