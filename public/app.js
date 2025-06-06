// 📱 Frontend Socket.IO Chat
const socket = io();

function sendMessage() {
    const input = document.getElementById('msgInput');
    const msg = input.value;
    if (msg.trim()) {
        socket.emit('message', msg);
        input.value = '';
    }
}

socket.on('message', (msg) => {
    const chat = document.getElementById('chatbox');
    const div = document.createElement('div');
    div.textContent = msg;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
});
