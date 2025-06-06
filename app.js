function toggleTheme() {
  document.body.classList.toggle('dark');
}

function switchTab(tabId) {
  document.querySelectorAll('.tabContent').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function sendMessage() {
  const msg = document.getElementById("msgInput").value;
  const box = document.getElementById("chatbox");
  if (msg.trim()) {
    box.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
    document.getElementById("msgInput").value = "";
  }
}

function sendPrivate() {
  const user = document.getElementById("pmUser").value;
  const msg = document.getElementById("pmInput").value;
  const box = document.getElementById("pmBox");
  if (user.trim() && msg.trim()) {
    box.innerHTML += `<div><strong>To ${user}:</strong> ${msg}</div>`;
    document.getElementById("pmInput").value = "";
  }
}

function sendMedia() {
  const file = document.getElementById("mediaFile").files[0];
  const box = document.getElementById("mediaBox");
  if (file) {
    box.innerHTML += `<div><strong>Shared:</strong> ${file.name}</div>`;
  }
}

function generateQRCode() {
  const roomCode = prompt("Enter room name for QR:");
  if (!roomCode) return;
  const qrcode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: window.location.origin + "?room=" + encodeURIComponent(roomCode),
    dotsOptions: { color: "#000", type: "rounded" },
    backgroundOptions: { color: "#ffffff" },
  });
  document.getElementById("qrcode").innerHTML = "";
  qrcode.append(document.getElementById("qrcode"));
}

function createRoom() {
  const name = document.getElementById("newRoom").value;
  if (name) {
    alert("Room created: " + name);
  }
}

function joinRoom() {
  const code = document.getElementById("joinRoom").value;
  if (code) {
    window.location.href = "?room=" + encodeURIComponent(code);
  }
}

function recordVoice() {
  alert("🎙 Voice recorder feature is in development.");
}

// Auto open correct room
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("room")) {
    switchTab('groupTab');
  } else {
    switchTab('groupTab');
  }
};