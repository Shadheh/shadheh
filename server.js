// 📦 Express + Socket.IO Server
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 🌐 Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// 📡 Socket Logic
io.on('connection', (socket) => {
    console.log('📲 New user connected');
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

// 🚀 Launch
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('✅ Server running on port', PORT);
});
