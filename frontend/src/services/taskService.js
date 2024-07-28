import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks/';

const getTasks = () => {
    return axios.get(API_URL, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('user')).token
        }
    });
};

const createTask = (task) => {
    return axios.post(API_URL, task, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('user')).token
        }
    });
};

const updateTask = (id, task) => {
    return axios.put(API_URL + id, task, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('user')).token
        }
    });
};

const deleteTask = (id) => {
    return axios.delete(API_URL + id, {
        headers: {
            'x-access-token': JSON.parse(localStorage.getItem('user')).token
        }
    });
};

export default {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
