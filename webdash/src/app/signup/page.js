"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (fetchData) {
      const signupUser = async () => {
        try {
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const responseData = await res.json();
          setData(responseData);

          if (!res.ok) {
            throw new Error(responseData.message || "Signup failed");
          }

          console.log("Signup Successful:", responseData);
          router.push("/login"); // Redirect to login after signup
        } catch (err) {
          setError(err.message);
        } finally {
          setFetchData(false);
        }
      };
      signupUser();
    }
  }, [fetchData, email, password, router]);

  const handleUserSignup = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter the email");
    } else if (!password) {
      setError("Please enter the password");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
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
          <p className="mt-2 text-sm text-gray-400">Create your account</p>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form className="space-y-6">
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
              required
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
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleUserSignup}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
