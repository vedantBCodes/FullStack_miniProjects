import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [tasks , setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoggedIn , setIsLogin] = useState(false);
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

const result = await res.json();
console.log("Response:", result);

    if (res.ok) {
      console.log(result);
      setTasks(result);
      setIsLogin(true);
    } else {
      alert("Error fetching tasks");
    }
  };

const handleAddTask = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/add-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Task added successfully!");
      setTasks((prev) => [...prev, result]); // append new task
      console.log(tasks);
      
      setTitle("");
      setDescription("");
    } else {
      toast.error(result.message || "Failed to add task.");
    }
  } catch (err) {
    toast.error("Server error. Please try again.");
    console.error(err);
  }
};
  return (
    <div>
     
      <h2>Tasks </h2>
       <button onClick={getTasks}>Get Tasks</button> <br /> <br />
       {isLoggedIn && <div>
        <table border={1}>
          <thead>
            <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           {tasks.map((task , index)=>(
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
           ))}
          </tbody>
        </table>
     
        <br />
     
      <form onSubmit={handleAddTask}>
        <input 
        type="text" 
        placeholder='Enter Title' 
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}/>
         <br /> <br />
        <input 
        type="text" 
        placeholder='Enter Description' 
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        /> <br /> <br />
         <button >Add Tasks</button>
      </form> 
       </div> }
      <ToastContainer />
    </div>
  );
};

export default Tasks;
