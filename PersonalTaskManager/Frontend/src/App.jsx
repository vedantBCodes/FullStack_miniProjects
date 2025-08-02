import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Component/login';
import Signup from './Component/signup';
import Tasks from './Component/Tasks';
import Navbar from './Component/Navbar';
import EditTask from './Component/EditTask';
import EditTaskContext from './Component/EditTaskContext'; // 📌 Import your context
import { useState } from 'react';

function App() {
  const [editTask, setEditTask] = useState({});

  return (
    <EditTaskContext.Provider value={{ editTask, setEditTask }}>
      {/* All components inside this provider can now use the context */}
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/login' element={<><Navbar /><Login /></>} />
        <Route path='/signup' element={<><Navbar /><Signup /></>} />
        <Route path='/tasks' element={<><Navbar /><Tasks /></>} />
        <Route path='/edit-task' element={<><Navbar /><EditTask /></>} />
      </Routes>
    </EditTaskContext.Provider>
  );
}

export default App;
