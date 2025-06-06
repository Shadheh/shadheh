
// 📱 Frontend Socket.IO Chat with QR Invite
const socket = io();

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

// Room logic with QR
let currentRoom = generateRoom();

function generateRoom() {
    const id = Math.random().toString(36).substring(2, 8);
    document.getElementById('roomCode').textContent = id;
    generateQRCode(id);
    return id;
}

function generateQRCode(code) {
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
