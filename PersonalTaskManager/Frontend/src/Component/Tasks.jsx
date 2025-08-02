import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import EditTaskContext from './EditTaskContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoggedIn, setIsLogin] = useState(false);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { setEditTask } = useContext(EditTaskContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000 - Date.now();

      if (expiryTime > 0) {
        const timer = setTimeout(() => {
          localStorage.removeItem("token");
          toast.info("Session expired. Please login again.", { autoClose: 3000 });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }, expiryTime);

        return () => clearTimeout(timer);
      } else {
        localStorage.removeItem("token");
        toast.info("Session expired. Please login again.", { autoClose: 3000 });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  const getTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (res.ok) {
      setTasks(result);
      setIsLogin(true);
    } else {
      toast.error("Error fetching tasks");
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
        setTasks((prev) => [...prev, result]);
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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Task deleted successfully!");
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        toast.error(result.message || "Failed to delete task.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const task = await res.json();

      if (res.ok) {
        setEditTask(task); // Set the selected task into context
        navigate("/edit-task");
      } else {
        toast.error(task.message || "Failed to fetch task.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={getTasks}>Get Tasks</button> <br /> <br />

      {isLoggedIn && (
        <div>
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
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td><button onClick={() => handleEdit(task._id)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(task._id)}>Delete</button></td>
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
              onChange={(e) => setTitle(e.target.value)}
            />
            <br /> <br />
            <input
              type="text"
              placeholder='Enter Description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> <br /> <br />
            <button>Add Task</button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Tasks;
