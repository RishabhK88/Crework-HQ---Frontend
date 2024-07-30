import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slices/userSlice";
import taskReducer from "@/slices/taskSlice";


// Configuring Redux Store

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      task: taskReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
