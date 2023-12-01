import { io } from "socket.io-client";

const gameEntryTemplate = document.querySelector("#join-game-entry");
const gameList = document.querySelector("#game-list ul");
const currentGamesContainer = document.querySelector("#my-game-list");
const currentGamesList = currentGamesContainer.querySelector("ul");
const userId = parseInt(currentGamesContainer.dataset.user);

const socket = io();

socket.on("games:created", ({ id, createdBy }) => {
  if (document.querySelector(`li[data-game-id="${id}"]`) !== null) {
    return;
  }

  const entry = gameEntryTemplate.content.cloneNode(true);

  const a = entry.querySelector("a");
  const li = entry.querySelector("li");

  li.dataset.gameId = id;

  if (createdBy === userId) {
    a.href = `/games/${id}`;
    a.innerText = `Return to ${id}`;
    currentGamesList.appendChild(entry);
  } else {
    a.href = `/games/${id}/join`;
    a.innerText = `Join ${id}`;
    gameList.appendChild(entry);
  }
});
