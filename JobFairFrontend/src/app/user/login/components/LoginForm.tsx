"use client";

import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm(props: {
  searchParams?: Record<"callbackUrl" | "error", string>;
}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      console.log(loginData);
      await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: true,
        callbackUrl: props.searchParams?.callbackUrl ?? "/",
      });
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-3" action={onSubmit}>
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        type={"email"}
        onChange={onChange}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="standard"
        onChange={onChange}
      />
      <button className="text-white rounded-md py-1 px-3 bg-secondary-500 hover:bg-secondary-300">
        Login
      </button>
      {props.searchParams?.error && (
        <p className="text-white text-center rounded-md px-3 bg-red-500">
          Failed to login
        </p>
      )}
    </form>
  );
}
