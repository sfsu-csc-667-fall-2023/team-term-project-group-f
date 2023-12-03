const socket = io();

const form = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.getElementById("chat-messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== "") {
    // Emit a 'chat message' event to the server
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});

// Listen for 'chat message' events from the server
socket.on("chat message", (message) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
});
