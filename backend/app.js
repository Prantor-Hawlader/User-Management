const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const dotenv = require('dotenv');

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get("/", (req, res) => {
    return res.json({ message: "hello world" })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
