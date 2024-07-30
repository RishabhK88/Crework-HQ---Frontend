"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";

// Redux Provider

export function ReduxProvider({ children }: {children: any}) {
  return <Provider store={store}>{children}</Provider>;
}