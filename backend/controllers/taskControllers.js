const Task = require('../models/task');

exports.createTask = (req, res) => {
    const { title, description, status, assigned_user } = req.body;

    const newTask = {
        title,
        description,
        status,
        assigned_user
    };

    Task.create(newTask, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.getAllTasks = (req, res) => {
    Task.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.updateTask = (req, res) => {
    const { title, description, status, assigned_user } = req.body;

    Task.updateById(req.params.id, { title, description, status, assigned_user }, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.deleteTask = (req, res) => {
    Task.remove(req.params.id, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send({ message: "Task deleted successfully" });
    });
};

