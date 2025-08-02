// src/Component/EditTaskContext.js
import { createContext } from 'react';

const EditTaskContext = createContext({
  editTask: {},
  setEditTask: () => {},
});

export default EditTaskContext;
