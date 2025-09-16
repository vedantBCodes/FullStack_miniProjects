import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 3000;

// MongoDB connection
const MONGO_URI = "mongodb+srv://vedantB:atlasPass123@cl-users.6w12eo2.mongodb.net/CL-users?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
