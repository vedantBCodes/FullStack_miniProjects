import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [data, setData] = useState(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (res.ok) {
      setData(result);
    } else {
      alert(result.message);
    }
  };


  return (
    <div>
      <h2>Protected Profile</h2>
      <button onClick={getProfile}>Load Profile</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <ToastContainer />
    </div>
  );
};

export default Tasks;
