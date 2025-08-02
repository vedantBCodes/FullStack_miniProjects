import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTaskContext from "./EditTaskContext";

const EditTask = () => {
  const { editTask, setEditTask } = useContext(EditTaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
    } else {
      toast.error("No task selected for editing.");
      navigate("/tasks");
    }
  }, [editTask, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/edit-task/${editTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Task updated successfully!");
        setTimeout(() => {
          setEditTask(null); // Clear the context
          navigate("/tasks");
        }, 1500);
      } else {
        toast.error(result.message || "Failed to update task.");
      }
    } catch (err) {
      toast.error("Server error while updating task.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <button type="submit">Update Task</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditTask;
