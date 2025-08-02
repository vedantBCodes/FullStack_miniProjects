const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./Middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to database");
})
.catch(() => {
  console.log("Failed to connect to database");
});

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String
});

const Todouser = mongoose.model("Todouser", userSchema);

// ✅ Task Schema & Model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todouser"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", taskSchema);

// ✅ Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new Todouser({ name, email, password });
    await newUser.save();

    res.status(201).send("User created");
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === 11000) {
      return res.status(400).send("Email already registered");
    }
    res.status(500).send("Server error");
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Todouser.findOne({ email });

    if (!user) {
      return res.status(404).send("User not registered");
    }

    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Get All Tasks (Protected)
app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const id = req.user.userId;
    const data = await Task.find({ user: id });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
});

// ✅ Get Single Task by ID (Protected)
app.get("/tasks/:id", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add Task (Protected)
app.post("/add-tasks", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.userId
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Server error while adding task." });
  }
});

// ✅ Delete Task (Protected)
app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Task (Protected)
app.put("/edit-task/:id", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error while updating task" });
  }
});

// ✅ Start Server
app.listen(process.env.PORT, () => {
  console.log("App is listening on port", process.env.PORT);
});
