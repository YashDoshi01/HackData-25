import mongoose from "mongoose";

const StressAnalysisSchema = new mongoose.Schema(
  {
    // Reference to the User who underwent the analysis
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Whether the model detects stress (true/false)
    isStressed: { 
      type: Boolean, 
      required: true 
    },
    // Percentage indicating how stressed the user is (0-100)
    percentStressed: { 
      type: Number, 
      required: true 
    },
    // Categorical value such as 'high', 'moderate', or 'low'
    stressLevel: { 
      type: String, 
      enum: ["high", "moderate", "low"],
      required: true 
    },
    // Array of recommended remedies (e.g., ["meditate", "take a break"])
    remedies: { 
      type: [String], 
      required: true 
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Prevent model overwrite in watch mode/hot reloading
const Result = mongoose.models.Result || mongoose.model("Result", StressAnalysisSchema);

export default Result;
