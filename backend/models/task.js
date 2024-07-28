const db = require('../config/db');

const Task = {};

Task.create = (newTask, result) => {
    db.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newTask });
    });
};

Task.getAll = (result) => {
    db.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
};

Task.updateById = (id, task, result) => {
    db.query(
        "UPDATE tasks SET title = ?, description = ?, status = ?, assigned_user = ? WHERE id = ?",
        [task.title, task.description, task.status, task.assigned_user, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...task });
        }
    );
};

Task.remove = (id, result) => {
    db.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Task;
