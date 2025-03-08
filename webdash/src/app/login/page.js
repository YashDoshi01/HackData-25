"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authenticated } from "@/redux/authSlice";
import { userReference } from "@/redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();



  useEffect(() => {
    if (fetchData) {
      const loginUser = async () => {
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const responseData = await res.json();
          if (!res.ok) {
            throw new Error(responseData.message || "Login failed");
          }

          dispatch(authenticated(true));
          // dispatch(userReference(responseData.userId));
          localStorage.setItem("userId" , responseData.userId)
          localStorage.setItem("token", responseData.token);
          router.push("/");
        } catch (err) {
          setError(err.message);
        } finally {
          setFetchData(false);
        }
      };
      loginUser();
    }
  }, [fetchData, email, password, dispatch, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter email");
    } else if (!password) {
      setError("Please enter password");
    } else {
      setError("");
      setFetchData(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Sentiment Analysis</h1>
          <p className="mt-2 text-sm text-gray-400">Log into your account</p>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don&#39;t have an account?{" "}
            <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
