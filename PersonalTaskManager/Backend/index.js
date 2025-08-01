const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json()); 
const jwt = require("jsonwebtoken");

const authMiddleware = require("./Middleware/authMiddleware");

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to database" );
})
.catch(()=>{
    console.log("Failed to connect");
});

const userSchema = new mongoose.Schema({
    name : String ,
    email :{
      type: String ,
      unique: true ,
      required: true
    },
    password : String
});

const Todouser = mongoose.model("Todouser", userSchema);

// ✅ Task schema and model
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

    console.log("Request body received:", req.body);

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

    console.log("Login Successful", req.body);

    const token = jwt.sign({ userId: user._id , userName: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

  } catch (err) {
    console.error("Login Error", err);
    res.status(500).send("Server Error");
  }
});

// ✅ Get Tasks Route (Protected)
app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const id = req.user.userId;
    const data = await Task.find({ user: id }); // ✅ user field in Task model must exist
    res.status(200).json(data); // ✅ send proper status code
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
});


// ✅ Add Task Route (Protected)
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

app.listen(process.env.PORT, () => {
  console.log("App is listening on port", process.env.PORT);
});
