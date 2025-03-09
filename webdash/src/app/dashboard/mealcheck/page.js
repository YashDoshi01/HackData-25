"use client";

import { useState } from "react";

function MealCheck() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hackdata"); // Cloudinary Upload Preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dx400fn4k/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploadedUrl(data.secure_url);
      analyzeFood(uploadedUrl)
    }catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const analyzeFood = async (imageUrl) => {
    const API_KEY = "aa00fbf94f64bf4b0412b16bf3050491cf3a7d48"; // Replace with your LogMeal API Key
  
    try {
      const response = await fetch("https://api.logmeal.es/v2/dataset/dishes/v1.0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ image: imageUrl }), // Cloudinary URL
      });
  
      const data = await response.json();
      console.log("LogMeal Response:", data);
      return data;
    } catch (error) {
      console.error("LogMeal API Error:", error);
    }
  };
  

    
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-gray-900 text-white">
      <h2 className="text-lg font-semibold mb-3">Upload a File</h2>

      <input type="file" onChange={handleFileChange} className="border p-2 rounded mb-3 bg-gray-800" />

      <button
        onClick={uploadToCloudinary}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-sm">Uploaded File:</p>
          {file?.type.startsWith("image/") ? (
            <img src={uploadedUrl} alt="Uploaded" className="w-40 h-40 mt-2 rounded-lg" />
          ) : (
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              View Uploaded File
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default MealCheck;
