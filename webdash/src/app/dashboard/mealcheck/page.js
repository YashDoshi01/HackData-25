"use client";

import { useState } from "react";

function MealCheck() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "2884649b733e0d98aef73d20742b71424360d766"; // Replace with your actual LogMeal API key

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFoodData(null); // Reset previous results
    setError(null);
  };

  const analyzeFood = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.logmeal.es/v2/image/segmentation/complete", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${await response.text()}`);
      }

      const data = await response.json();
      console.log("LogMeal Response:", data); // For debugging

      // Process the segmentation results
      const detectedItems = data.segmentation_results.map((item) => ({
        foodName: item.recognition_results[0]?.name || "Unknown",
        confidence: item.recognition_results[0]?.prob || 0,
        // Nutritional data would require a separate API call
      }));

      setFoodData(detectedItems.length > 0 ? detectedItems : null);
    } catch (error) {
      console.error("LogMeal API Error:", error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-gray-900 text-white w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-3">Upload a File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 rounded mb-3 bg-gray-800"
        accept="image/*"
      />

      <button
        onClick={analyzeFood}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={uploading}
      >
        {uploading ? "Analyzing..." : "Analyze Food"}
      </button>

      {error && (
        <p className="mt-4 text-red-500">Error: {error}</p>
      )}

      {foodData && (
        <div className="mt-6 w-full bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Detected Food Items:</h3>
          {foodData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded mb-3">
              <h4 className="text-lg font-semibold">{item.foodName}</h4>
              <p className="text-sm text-gray-300">
                Confidence: {(item.confidence * 100).toFixed(2)}%
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Note: Nutritional data requires an additional API call.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealCheck;