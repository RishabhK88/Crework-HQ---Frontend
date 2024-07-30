"use client";
import { useEffect, useState } from "react";
import SignIn from "./signin/page";
import TaskBoard from "./taskboard/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      setIsAuthenticated(true);
    }
    setOpen(false);
  }, []);
  return (
    <>{open ? "Loading" : !isAuthenticated ? <SignIn /> : <TaskBoard />}</>
  );
}
