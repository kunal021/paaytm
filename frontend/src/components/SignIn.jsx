/* eslint-disable react/prop-types */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3500/api/v1/users/signin", {
      username,
      password,
    });

    localStorage.setItem("signedin", res.data.data);
    localStorage.setItem("paytmtoken", res.data.token);
    login();
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] bg-black/30">
      <div className="flex flex-col justify-center items-center w-[50vh] rounded-lg border-transparent bg-white">
        <h1 className="text-4xl font-black py-2 px-4">Sign In</h1>
        <p className="text-base font-semibold text-gray-500 text-center py-2 px-4">
          Enter your credentials to access your account
        </p>
        <form
          onSubmit={handleSumbit}
          className="flex flex-col justify-start items-start px-4 w-full"
        >
          <p className="flex flex-col w-full py-2 pb-0 text-base font-semibold">
            Email{" "}
            <input
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe@email.com"
              className="p-2 mt-2 rounded-lg border-2"
            />
          </p>
          <p className="flex flex-col w-full py-2 pb-0 text-base font-semibold">
            Password{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              className="p-2 mt-2 rounded-lg border-2"
            />
          </p>
          <button className="flex justify-center items-center w-full p-2 mt-4 rounded-lg border-2 border-transparent bg-black hover:bg-gray-900 text-white text-base font-semibold">
            Sign In
          </button>
        </form>
        <div className="text-base font-semibold text-gray-900 text-center py-2 px-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
