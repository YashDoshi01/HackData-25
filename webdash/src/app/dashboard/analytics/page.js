"use client";

import React from "react";
import useStressResults from "@/components/hooks/useStressResult";
import { useSelector } from "react-redux";

const DashboardAnalytics = () => {
    const userId = localStorage.getItem("userId")
    console.log(userId)
  const { results, loading, error, refetch } = useStressResults(userId);
    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <h1>Analytics Page</h1>
      <h2 className="text-lg font-bold">Stress Analysis Results</h2>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={refetch}
      >
        Refresh Data
      </button>
      <ul className="mt-4">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((result) => (
            <li key={result._id} className="border p-3 mb-2 rounded">
              <p><strong>Stress Level:</strong> {result.stressLevel}</p>
              <p><strong>Percentage:</strong> {result.percentStressed}%</p>
              <p><strong>Remedies:</strong> {result.remedies.join(", ")}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DashboardAnalytics;
