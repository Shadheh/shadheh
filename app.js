const socket = io();

let roomId = new URLSearchParams(window.location.search).get("room") || "ShadsRoom123";
document.getElementById("roomCode").innerText = roomId;
socket.emit("join", roomId);

function switchTab(tabId) {
  document.querySelectorAll(".tabContent").forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}

function sendMessage() {
  const msg = document.getElementById("msgInput").value;
  if (msg) {
    socket.emit("message", { room: roomId, msg });
    document.getElementById("msgInput").value = "";
  }
}

function sendPrivate() {
  const msg = document.getElementById("pmInput").value;
  const to = document.getElementById("pmUser").value;
  if (msg && to) {
    socket.emit("private", { to, msg });
    document.getElementById("pmInput").value = "";
  }
}

function sendMedia() {
  const fileInput = document.getElementById("mediaFile");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const mediaBox = document.getElementById("mediaBox");
    const div = document.createElement("div");
    div.textContent = `📎 Shared: ${file.name}`;
    mediaBox.appendChild(div);
  }
}

function changeTheme(theme) {
  document.body.style.background = theme === 'dark' ? '#0a0a0a' : '#ffffff';
  document.body.style.color = theme === 'dark' ? '#fff' : '#000';
}

function recordVoice() {
  alert('🎤 Voice recording placeholder');
}

function generateQRCode() {
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  const url = `${window.location.origin}?room=${roomId}`;
  QRCode.toCanvas(document.createElement("canvas"), url, function (error, canvas) {
    if (error) console.error(error);
    else qrDiv.appendChild(canvas);
  });
}

function createRoom() {
  const newRoom = document.getElementById("newRoom").value.trim();
  if (newRoom) {
    window.location.href = `/?room=${newRoom}`;
  }
}

function joinRoom() {
  const joinRoom = document.getElementById("joinRoom").value.trim();
  if (joinRoom) {
    window.location.href = `/?room=${joinRoom}`;
  }
}

socket.on("message", ({ room, msg }) => {
  const div = document.createElement("div");
  div.textContent = "📢 " + msg;
  document.getElementById("chatbox").appendChild(div);
});

socket.on("private", ({ to, msg }) => {
  const div = document.createElement("div");
  div.textContent = `🔒 ${to}: ${msg}`;
  document.getElementById("pmBox").appendChild(div);
});