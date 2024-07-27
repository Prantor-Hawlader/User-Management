const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user || user.status === 'blocked') return res.status(401).json({ error: 'User is blocked' });
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = { authenticateToken };
