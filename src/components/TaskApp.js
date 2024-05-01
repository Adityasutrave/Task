import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = { title };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      <AddTask onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskApp;
