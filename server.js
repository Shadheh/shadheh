const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname)));

io.on("connection", (socket) => {
  console.log("✅ New user connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("private", (data) => {
    io.emit("private", data);
  });

  socket.on("media", (data) => {
    io.emit("media", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 ShadsApp running on port ${PORT}`);
});