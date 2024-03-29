"use client";
import { login } from "@/services/authServices";
import React, { useState } from "react";

const LoginPage = () => {
  const [data, setData] = useState({});
  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(data);
    try {
      login(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full bg-blue-600">
      <div className="flex justify-center items-center h-full">
        <section className=" bg-white rounded-3xl p-10">
          <h1 className="font-bold text-center">Login</h1>
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="username"
              placeholder="Username atau Email"
              className="p-3"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3"
              onChange={handleChange}
            />
            <button type="submit" className="bg-blue-500 text-white p-3">
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
