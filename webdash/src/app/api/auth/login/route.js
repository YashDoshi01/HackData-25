import  connectDB  from "@/mongodb.js";
import User from "@/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB(); 
    const { email, password } = await req.json();

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return Response.json({ success: false, message: "No user found!" }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return Response.json({ success: false, message: "Password is incorrect" }, { status: 403 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return Response.json(
      {
        success: true,
        message: "User login successful",
        token: token,
        userId: userFound._id,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
