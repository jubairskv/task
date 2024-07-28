import React, { useEffect, useState } from 'react';
import TaskService from '../services/taskService';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        TaskService.getTasks().then(
            (response) => {
                setTasks(response.data.filter(task => task.assigned_user === currentUser.id));
            },
            (error) => {
                console.log(error);
            }
        );
    }, [currentUser.id]);

    return (
        <div>
            <h2>User Dashboard</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
