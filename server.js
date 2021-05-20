const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
require('dotenv').config();

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.CONNECTION_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('ping api');
});

app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const io = socketIO(server);

io.on('connect', (socket) => {
    console.log('Client connected...');

    socket.on('join', (data) => {
        console.log('User joined', data);
        io.emit('join_event', data);
    });

    socket.on('message', (data) => {
        console.log('Incoming message', data);
        io.emit('message_event', data)
    });

    socket.on('leave', (data) => {
        console.log('User left', data);
        io.emit('leave_event', data);
    });
});