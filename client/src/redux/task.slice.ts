import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import api from "../axios/axios";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
}
export const enum StatusRequestEnum {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface InitialState {
  tasks: Task[];
  status: StatusRequestEnum;
  error: string | null;
}

const initialState: InitialState = {
  tasks: [],
  status: StatusRequestEnum.IDLE,
  error: null,
};

const handlePending = (state: InitialState) => {
  state.status = StatusRequestEnum.LOADING;
};
const handleRejected = (
  state: InitialState,
  action: PayloadAction<unknown, string, unknown, SerializedError>
) => {
  state.error = action.error.message ?? "ошибка";
  state.status = StatusRequestEnum.ERROR;
};

export const taskSlice = createAppSlice({
  name: "task",
  initialState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    getTasks: create.asyncThunk(
      async () => {
        const res = await api.get("/tasks");
        return res.data;
      },
      {
        pending: handlePending,
        rejected: handleRejected,
        fulfilled: (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;

          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
        },
      }
    ),
    addTask: create.asyncThunk(
      async (task: Task) => {
        const res = await api.post("/tasks", task);
        return res.data;
      },
      {
        pending: handlePending,
        rejected: handleRejected,
        fulfilled: (state, action) => {
          state.tasks = [...state.tasks, action.payload];
          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
        },
      }
    ),
    updateTask: create.asyncThunk(
      async (task: Task) => {
        const res = await api.put(`/tasks/${task.id}`, task);
        return res.data;
      },
      {
        pending: handlePending,
        rejected: handleRejected,
        fulfilled: (state, action) => {
          state.tasks = state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          );
          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
        },
      }
    ),
    deleteTask: create.asyncThunk(
      async (id: string) => {
        const res = await api.delete(`/tasks/${id}`);
        return res.data;
      },
      {
        pending: handlePending,
        rejected: handleRejected,
        fulfilled: (state, action) => {
          state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
        },
      }
    ),
  }),
});

export const { getTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export const { selectTasks } = taskSlice.selectors;
export default taskSlice.reducer;
