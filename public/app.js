const socket = io();
let currentRoom = "";

function joinRoom() {
  const room = document.getElementById("roomInput").value.trim();
  if (!room) return;
  currentRoom = room;
  socket.emit("join-room", room);
  document.getElementById("chatBox").innerHTML = "";
}

function sendMessage() {
  const msgInput = document.getElementById("msgInput");
  const message = msgInput.value.trim();
  if (!message || !currentRoom) return;

  socket.emit("send-message", {
    room: currentRoom,
    message,
    sender: "You",
  });

  msgInput.value = "";
}

socket.on("chat-history", (messages) => {
  messages.forEach((msg) => renderMessage(msg));
});

socket.on("receive-message", (msg) => {
  renderMessage(msg);
});

function renderMessage(msg) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${msg.sender}:</strong> ${msg.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateQR() {
  const room = document.getElementById("roomInput").value.trim();
  if (!room) return;

  const url = window.location.origin + "?room=" + encodeURIComponent(room);
  const container = document.getElementById("qrContainer");
  container.innerHTML = "";
  QRCode.toCanvas(document.createElement("canvas"), url, { width: 200 }, (err, canvas) => {
    if (!err) container.appendChild(canvas);
  });
}

// Auto join room from URL
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const room = params.get("room");
  if (room) {
    document.getElementById("roomInput").value = room;
    joinRoom();
  }
};