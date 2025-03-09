"use client";

import React, { useEffect, useState } from "react";
import useStressResults from "@/components/hooks/useStressResult";
import { RadicalChart } from "@/components/RadicalChart";
import { SleepChart } from "@/components/Sleep";
import { BarChartComp } from "@/components/BarChartComp";
import Exercises from "@/components/Exercises";


const DashboardAnalytics = () => {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { results, loading, error, refetch } = useStressResults(userId);

  // Get today's date in YYYY-MM-DD format
  // Get today's local date instead of UTC
const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize time to start of day

// Filter results with local time comparison
const todayResults = results.filter((result) => {
  const resultDate = new Date(result.createdAt);
  resultDate.setHours(0, 0, 0, 0); // Normalize time for comparison
  return resultDate.getTime() === today.getTime();
});


  // Get the latest stress level
  const latestStressLevel =
    todayResults.length > 0 ? todayResults[todayResults.length - 1].percentStressed : 0;

  let sleephours = 4;
  if (latestStressLevel < 40) sleephours = 7;
  else if (latestStressLevel >= 40 && latestStressLevel < 60) sleephours = 8;
  else if (latestStressLevel >= 60) sleephours = 10;

  return (
    
    <div
    >
        <h2 className="text-3xl ">Serenity Scan</h2>
      <div className="flex justify-center gap-x-10">
        <div className="w-[500px]">
        <RadicalChart
        data={[{ label: "Latest Stress Level", value: latestStressLevel }]}
      />
        </div>
        <div className="w-[500px]">
          <SleepChart data={sleephours ? [{ label: "Least Sleep", value: sleephours }] : []} />
        </div>
      </div>

      <div className="w-[700px] mt-10 mx-auto">
        <BarChartComp />
      </div>
      
    </div>
  );
};

export default DashboardAnalytics;
