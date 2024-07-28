import React from 'react';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Assigned User: {task.assigned_user}</p>
                    {onUpdate && <button onClick={() => onUpdate(task.id)}>Update</button>}
                    {onDelete && <button onClick={() => onDelete(task.id)}>Delete</button>}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
