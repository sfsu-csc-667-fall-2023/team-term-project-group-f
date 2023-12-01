import { configure as gameSocketConfig } from "./game_socket";
import { configure as userSocketConfig } from "./user_socket";

const gameSocketId = document.querySelector("#game-socket-id").value;
const userSocketId = document.querySelector("#user-socket-id").value;
const roomId = document.querySelector("#room-id").value;

gameSocketConfig(gameSocketId)
  .then((_) => userSocketConfig(userSocketId))
  .then((_) => {
    console.log("Fetching");
    fetch(`/games/${roomId}/ready`, { method: "post" });
  });

const hitForm = document.querySelector("#hit-form");
const stayForm = document.querySelector("#stay-form");

const handleUserAction = (event) => {
  event.preventDefault();

  const { action, method } = event.target.attributes;
  fetch(action.value, { method: method.value });

  return false;
};

hitForm.addEventListener("submit", handleUserAction);
stayForm.addEventListener("submit", handleUserAction);
