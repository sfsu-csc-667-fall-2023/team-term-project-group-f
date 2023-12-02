
async function playCard(data) {

  // Check if the card being played is legal
  // trigger logic for card
  //    if card is skip or draw 2 find the next player
  //      provide next player with a chance to play the same card
  //    if card is wild
  //      change color to one provided
  //      trigger +4 draw card if it's a draw four card
  // move card to discard
  // update last played card in Game
  // next player's turn
}

async function nextPlayer(data) {
  // Get the next player
  // find the next player who isn't skipped
  // notify player it is their turn
  // update turn number
  // unskip any skiped players
  
}

async function createGame(data) {
  const { maxPlayers, creatorID, password } = data;

  // make a new game and set max players
  // set the status to private and add a password if one is set
  
}

export default {
  playCard,
  nextPlayer,
  createGame
}