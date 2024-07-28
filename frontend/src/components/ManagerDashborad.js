import React, { useEffect, useState } from 'react';
import TaskService from '../services/taskService';

const ManagerDashboard = () => {
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

    const handleUpdate = (id) => {
        const updatedTask = {
            // ... provide updated task data here
        };
        TaskService.updateTask(id, updatedTask).then(
            (response) => {
                setTasks(tasks.map(task => (task.id === id ? response.data : task)));
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Assigned User: {task.assigned_user}</p>
                        <button onClick={() => handleUpdate(task.id)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagerDashboard;
