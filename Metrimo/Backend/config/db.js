import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
