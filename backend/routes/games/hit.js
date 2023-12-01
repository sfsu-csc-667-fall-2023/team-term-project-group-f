const { Games, Users } = require("../../db");
const GAME_CONSTANTS = require("../../../constants/games");

const method = "post";
const route = "/:id/hit";

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

  // Draw a card for player
  const { sid } = await Users.getUserSocket(userId);
  const card = await Games.drawCards(gameId, 1);
  await Games.dealCards([{ user_id: userId, sid }], card, gameId);

  // Check if the player gone over 21
  const getCardsForUser = await Games.getCardsForUser(gameId, userId);
  // Calculate total if over 21, send error message, update next player

  // Broadcast
  const state = await Games.getState(gameId);
  io.to(state.game_socket_id).emit(GAME_CONSTANTS.STATE_UPDATED, state);

  response.status(200).send();
};

module.exports = { method, route, handler };
