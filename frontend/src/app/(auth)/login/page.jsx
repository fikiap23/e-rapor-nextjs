"use client";
import authService from "@/services/auth.service";
import React, { useState } from "react";

const LoginPage = () => {
  const [data, setData] = useState({});
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    const result = await authService.login(data);
    console.log(result);
  };
  return (
    <div className="w-full h-full bg-blue-600 mx-auto px-11 md:px-0">
      <div className="flex justify-center items-center h-full">
        <section className=" bg-white rounded-3xl p-10">
          <h1 className="font-bold text-center mb-11">School Management</h1>
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
