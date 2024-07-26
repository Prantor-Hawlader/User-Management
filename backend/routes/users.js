const express = require('express');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/token');


const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.put('/block', async (req, res) => {
    const { ids } = req.body;
    await User.update({ status: 'blocked' }, { where: { id: ids } });
    res.status(204).send();
});

router.put('/unblock', async (req, res) => {
    const { ids } = req.body;
    await User.update({ status: 'active' }, { where: { id: ids } });
    res.status(204).send();
});

router.delete('/', async (req, res) => {
    const { ids } = req.body;
    await User.destroy({ where: { id: ids } });
    res.status(204).send();
});

module.exports = router;
