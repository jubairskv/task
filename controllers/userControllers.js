const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { username, email, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
        username,
        email,
        password: hashedPassword,
        role
    };

    User.create(newUser, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send({ message: err.message });

        if (!user) return res.status(404).send({ message: "User not found" });

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) return res.status(401).send({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', {
            expiresIn: 86400
        });

        res.status(200).send({ token });
    });
};
