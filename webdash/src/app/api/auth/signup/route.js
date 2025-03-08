import  connectDB  from "@/mongodb.js";
import User from "@/models/User.js";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, message: "This user already exists" }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return Response.json({ success: true, message: "User signup success", email: newUser.email }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
