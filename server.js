const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (room) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = [];
    socket.emit("chat-history", rooms[room]);
  });

  socket.on("send-message", async ({ room, message, sender }) => {
    const msg = { sender, message };
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(msg);
    io.to(room).emit("receive-message", msg);

    // Trigger AI if '@ai' used
    if (message.toLowerCase().includes("@ai")) {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });
      const aiMsg = {
        sender: "🤖 AI",
        message: response.data.choices[0].message.content,
      };
      rooms[room].push(aiMsg);
      io.to(room).emit("receive-message", aiMsg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port", PORT);
});