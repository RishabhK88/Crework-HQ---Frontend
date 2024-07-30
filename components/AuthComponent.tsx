"use client";

import { useState } from "react";
import Button from "./Button";
import { signIn, signUp } from "@/slices/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

export default function AuthComponent({ authType }: { authType: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleSignUp = () => {
    const requestBody = {
      username: username,
      password: password,
      name: name,
    };

    dispatch(signUp({ requestBody }))
      .unwrap()
      .then((response) => {
        localStorage.setItem("authToken", response.token);
        push("/taskboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignIn = () => {
    const requestBody = {
      username: username,
      password: password,
    };

    dispatch(signIn({ requestBody }))
      .unwrap()
      .then((response) => {
        localStorage.setItem("authToken", response.token);
        push("/taskboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gradient-to-b from-[#f7f7f7] to-[#f0f0f0] border border-[#CECECE] h-1/2 w-2/5 rounded-2xl p-12">
      <div className="text-5xl font-semibold flex justify-center">
        Welcome to <span className="text-[#4534AC]">&nbsp;Workflo!</span>
      </div>
      <div className="flex justify-center">
        <div className="mt-6 w-5/6">
          {authType === "SignUp" ? (
            <div className="mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Joe Gardner"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}

          <div className="mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="jgardner@gmail.com"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-2">
            <Button
              text={authType === "SignUp" ? "Sign Up" : "Sign In"}
              onClick={authType === "SignUp" ? handleSignUp : handleSignIn}
            />
          </div>
        </div>
      </div>
      {authType === "SignUp" ? (
        <div className="flex justify-center mt-2">
          Already have an account?&nbsp;
          <span className="text-[#0054A1] hover:cursor-pointer" onClick={()=>{
            push("/signin")
          }}>Log in</span>.
        </div>
      ) : (
        <div className="flex justify-center mt-2">
          Don't have an account? Create a&nbsp;
          <span className="text-[#0054A1] hover:cursor-pointer" onClick={()=>{
            push("/signup")
          }}>new account</span>.
        </div>
      )}
    </div>
  );
}
