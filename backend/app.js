const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');


const app = express();

app.use(cors({
    origin: ["https://user-management-server-gules.vercel.app"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get("/", (req, res) => {
    return res.json({ message: "hello world" })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
