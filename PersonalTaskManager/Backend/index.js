const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/ToDoData')
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
    // unique: true , // ✅ Makes email unique
    required: true
  },
    password : String
});

const Todouser = mongoose.model("Todouser",userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Request body received:", req.body); // ✅ Add this

    const newUser = new User({ name, email, password });
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not registered");
    }

    // 🧠 For now: just compare plain passwords (not secure for production)
    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }

    console.log("Login Successful", req.body);
    res.send("Login Successful");

  } catch (err) {
    console.error("Login Error", err);
    res.status(500).send("Server Error");
  }
});


// Important: This parses JSON data from the request body




app.listen(3000,()=>{
    console.log("App is listening on port 3000");
});