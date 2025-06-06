
const socket = io();
let currentRoom = generateRoom();

function sendMessage() {
  const input = document.getElementById('msgInput');
  const msg = input.value;
  if (msg.trim()) {
    socket.emit('message', { text: msg, room: currentRoom });
    input.value = '';
  }
}

socket.on('message', (data) => {
  const chat = document.getElementById('chatbox');
  const div = document.createElement('div');
  div.textContent = data.text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});

function sendPrivate() {
  const input = document.getElementById('pmInput');
  const msg = input.value;
  const to = document.getElementById('pmUser').value;
  if (msg.trim()) {
    socket.emit('private', { text: msg, to });
    input.value = '';
  }
}

socket.on('private', (data) => {
  const chat = document.getElementById('pmBox');
  const div = document.createElement('div');
  div.textContent = `[PM] ${data.text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});

function generateRoom() {
  const id = Math.random().toString(36).substring(2, 8);
  document.getElementById('roomCode').textContent = id;
  generateQRCode(id);
  return id;
}

function generateQRCode(code) {
  document.getElementById('qrcode').innerHTML = "";
  const qr = new QRCode(document.getElementById("qrcode"), {
    text: window.location.origin + "?room=" + code,
    width: 128,
    height: 128
  });
}

function joinRoom(room) {
  currentRoom = room;
  document.getElementById('roomCode').textContent = room;
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("room")) {
    joinRoom(params.get("room"));
  }
}

// Tab switcher
function switchTab(tab) {
  document.querySelectorAll(".tabContent").forEach(e => e.style.display = "none");
  document.getElementById(tab).style.display = "block";
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
  alert('🎤 Voice recording not implemented — this is a placeholder!');
}
