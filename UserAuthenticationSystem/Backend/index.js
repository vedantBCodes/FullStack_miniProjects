const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json()); 
 mongoose.connect('mongodb://localhost:27017/UserData')
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

const User = mongoose.model("User",userSchema);

app.post('/signup',async (req,res)=>{
    const {name , email , password} = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save(); // ✅ Save to MongoDB

    console.log("SignUp Successfull",req.body);
    res.send("SignUp Successfull");
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