const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, 'process.env.SECRET', (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: "Failed to authenticate token" });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).send({ message: "Require Admin Role" });
    }

    next();
};

const isManagerOrAdmin = (req, res, next) => {
    if (req.userRole !== 'manager' && req.userRole !== 'admin') {
        return res.status(403).send({ message: "Require Manager or Admin Role" });
    }

    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    isManagerOrAdmin
};
