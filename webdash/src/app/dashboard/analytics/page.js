"use client";

import React, { useEffect, useState } from "react";
import useStressResults from "@/components/hooks/useStressResult";
import { RadicalChart } from "@/components/RadicalChart";

const DashboardAnalytics = () => {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { results, loading, error, refetch } = useStressResults(userId);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter results to include only today's data
  const todayResults = results.filter((result) => 
    new Date(result.createdAt).toISOString().split("T")[0] === today
  );

  // Calculate today's average stress percentage
  const todayAverageStress =
    todayResults.length > 0
      ? todayResults.reduce((sum, result) => sum + result.percentStressed, 0) /
        todayResults.length
      : 0;

  return (
    <div>

      <RadicalChart
        data={[
          { label: "Today's Stress", value: todayAverageStress, color: "hsl(var(--chart-1))" },
        ]}
      />
    </div>
  );
};

export default DashboardAnalytics;
