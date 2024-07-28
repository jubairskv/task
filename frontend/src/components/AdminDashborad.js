import React, { useEffect, useState } from "react";
import AuthService from "../services/authService";
import TaskService from "../components/TaskList";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getTasks().then(
      (response) => {
        setTasks(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleDelete = (id) => {
    TaskService.deleteTask(id).then(
      () => {
        setTasks(tasks.filter((task) => task.id !== id));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Assigned User: {task.assigned_user}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
