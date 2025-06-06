
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('📲 New user connected');

  
  socket.on('media', (data) => {
    socket.emit('media', data);
  });
, (msg) => {
    io.emit('message', msg);
  });

  socket.on('private', (data) => {
    socket.emit('private', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
});

