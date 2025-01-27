const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/token');


const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const duplicateUser = await User.findOne({ where: { email } });
    if (duplicateUser) return res.status(403).json({ error: 'Email already has been used' })
    const user = await User.create({ name, email, password: hashedPassword, registrationTime: new Date() });
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User has been not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Wrong password' });
    if (user.status === 'blocked') {
        return res.status(403).json({ error: 'Your account has been blocked' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    await User.update({ lastLogin: new Date() }, { where: { id: user.id } });
    res.json({ token });
});
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ error: 'User has been not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
