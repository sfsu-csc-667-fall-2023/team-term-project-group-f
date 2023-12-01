const { Games } = require("../../db");
const GAME_CONSTANTS = require("../../../constants/games");

const method = "post";
const route = "/:id/stay";

const handler = async (request, response) => {
  const io = request.app.get("io");

  const { id: textGameId } = request.params;
  const { id: userId } = request.session.user;

  const gameId = parseInt(textGameId);

  // Check if player in game
  const isPlayerInGame = await Games.isPlayerInGame(gameId, userId);
  console.log({ isPlayerInGame, gameId, userId });

  if (!isPlayerInGame) {
    response.status(200).send();
    return;
  }

  // Check if this is the current player
  const isCurrentPlayer = await Games.isCurrentPlayer(gameId, userId);
  console.log({ isCurrentPlayer });

  if (!isCurrentPlayer) {
    // Game state
    // Add an error message: It's not your turn
    // Emit directly to player

    response.status(200).send();
    return;
  }

  // Update current player to next seat
  const users = await Games.usersInGame(gameId);
  console.log({ users });
  const { seat } = users.find((user) => user.user_id === userId);

  if (seat === 1) {
    // Play dealer cards, then igure out winner
  } else {
    const nextUser = users.find((user) => user.seat === seat + 1);
    await Games.setCurrentPlayer(nextUser.user_id, gameId);
  }

  // Broadcast
  const state = await Games.getState(gameId);
  io.to(state.game_socket_id).emit(GAME_CONSTANTS.STATE_UPDATED, state);

  response.status(200).send();
};

module.exports = { method, route, handler };
