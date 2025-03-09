"use client";

import React from "react";
import useStressResults from "@/components/hooks/useStressResult";
import { RadicalChart } from "@/components/RadicalChart";
import { SleepChart } from "@/components/Sleep";
import { BarChartComp } from "@/components/BarChartComp";

const DashboardAnalytics = () => {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { results } = useStressResults(userId);

  // Get today's local date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter today's results
  const todayResults = results.filter((result) => {
    const resultDate = new Date(result.createdAt);
    resultDate.setHours(0, 0, 0, 0);
    return resultDate.getTime() === today.getTime();
  });

  // Get latest stress level
  const latestStressLevel =
    todayResults.length > 0 ? todayResults[todayResults.length - 1].percentStressed : 0;

  let sleephours = 4;
  if (latestStressLevel < 40) sleephours = 7;
  else if (latestStressLevel >= 40 && latestStressLevel < 60) sleephours = 8;
  else if (latestStressLevel >= 60) sleephours = 10;

  // Recommended Exercises based on stress level
  let exercises = ["Deep Breathing", "Light Yoga", "Stretching"];
  if (latestStressLevel < 40) exercises = ["Jogging", "Cycling", "Dancing"];
  else if (latestStressLevel >= 40 && latestStressLevel < 60) exercises = ["Meditation", "Tai Chi", "Pilates"];
  else if (latestStressLevel >= 60) exercises = ["Guided Relaxation", "Progressive Muscle Relaxation", "Slow Walks"];

  return (
    <div className="px-6 py-8">
      {/* ... existing title and top section remains the same ... */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-2">Serenity Scan</h2>
      <h1 className="text-xl text-gray-600 text-center font-medium">
        Monitor, Analyze & Reduce Stress with AI
      </h1>
      <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto mt-4 leading-relaxed">
        Our cutting-edge AI-powered Stress Detection System uses advanced facial analysis to assess stress levels in real-time. 
        By leveraging deep learning and computer vision, our model accurately identifies stress vs. non-stress states, categorizes stress into high, medium, or low levels, 
        and provides actionable insights to help you improve your well-being.
      </p>

      {/* Top Section: Welcome Card & Stress Chart */}
      <div className="flex justify-center gap-x-10 mt-10">
        {/* Welcome Card with hover effect */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center max-w-[400px] flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back! 👋</h2>
          <p className="text-gray-600 mt-2">
            Let's check your stress levels and sleep insights for today.
          </p>
          <div className="mt-4">
            <SleepChart data={sleephours ? [{ label: "Recommended Sleep", value: sleephours }] : []} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center w-[500px] transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <RadicalChart data={[{ label: "Latest Stress Level", value: latestStressLevel }]} />
        </div>
      </div>

      {/* Bottom Section: Bar Chart & Exercise Recommendations */}
      <div className="flex justify-center gap-x-10 mt-10">
        {/* Bar Chart Card with hover effect */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center max-w-[500px] w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">Weekly Stress Levels</h2>
          <BarChartComp />
        </div>

        {/* Exercise Recommendations - Modified section */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center max-w-[500px] w-full flex flex-col space-content-around transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">🏋️ Recommended Exercises</h2>
          </div>
          <div className="flex flex-col mt-25">
            <ul className="text-gray-600 mt-3 text-xl">
              {exercises.map((exercise, index) => (
                <li key={index} className="py-2 text-xl">{exercise}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;