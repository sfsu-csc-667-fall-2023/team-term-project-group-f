const { create } = require("./games/create");
const { addUser } = require("./games/add-user");
const { getGame } = require("./games/get-game");
const { userCount } = require("./games/user-count");
const { initialize } = require("./games/initialize");
const { availableGamesForUser } = require("./games/available-games-for-user");
const { usersInGame } = require("./games/users-in-game");
const { currentGamesForUser } = require("./games/current-games-for-user");
const { readyPlayer } = require("./games/ready-player");
const { isInitialized } = require("./games/is-initialized");
const { setInitialized } = require("./games/set-initialized");
const { getState } = require("./games/get-state");
const { dealCards } = require("./games/deal-cards");
const { drawCards } = require("./games/draw-cards");
const { isPlayerInGame } = require("./games/is-player-in-game");
const { isCurrentPlayer } = require("./games/is-current-player");
const { getCardsForUser } = require("./games/get-cards-for-user");
const { setCurrentPlayer } = require("./games/set-current-player");

module.exports = {
  create,
  addUser,
  getGame,
  userCount,
  initialize,
  availableGamesForUser,
  currentGamesForUser,
  usersInGame,
  readyPlayer,
  isInitialized,
  getState,
  setInitialized,
  dealCards,
  drawCards,
  isPlayerInGame,
  isCurrentPlayer,
  getCardsForUser,
  setCurrentPlayer,
};
