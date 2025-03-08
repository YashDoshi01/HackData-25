import { NextResponse } from "next/server";
import connectDB from "@/mongodb";
import Result from "@/models/User";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse JSON body
    const { userId } = await req.json();

    // Validate userId
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch stress analysis results for the logged-in user
    const results = await User.find({ userId });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}