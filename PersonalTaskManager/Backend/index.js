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
    unique: true , // ✅ Makes email unique
    required: true
  },
    password : String
});

const Todouser = mongoose.model("Todouser",userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Request body received:", req.body); // ✅ Add this

    const newUser = new Todouser({ name, email, password });
    await newUser.save(); // ❗ This is likely throwing the error

    res.status(201).send("User created");
  } catch (error) {
    console.error("Signup error:", error); // 🧠 Show full error
    if (error.code === 11000) {
      return res.status(400).send("Email already registered");
    }
    res.status(500).send("Server error");
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Check if user exists
    const user = await Todouser.findOne({ email });

    if (!user) {
      return res.status(404).send("User not registered");
    }

    // 🧠 For now: just compare plain passwords (not secure for production)
    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }
    console.log("Login Successful", req.body);
    // As soon as password matches , we are generating a token

   const token = jwt.sign({ userId: user._id ,userName : user.name}, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
    
    // res.send("Login Successful");

  } catch (err) {
    console.error("Login Error", err);
    res.status(500).send("Server Error");
  }
});

// ✅ Protected Route
app.get("/tasks", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your Tasks!", userId: req.user.userId });
});

// Important: This parses JSON data from the request body

app.listen(process.env.PORT,()=>{
    console.log("App is listening on port ,", process.env.PORT);
});