import { io } from "socket.io-client";
import * as GAME_CONSTANTS from "@constants/games";

let gameSocket;

const configure = (socketId) => {
  gameSocket = io({ query: { id: socketId } });

  gameSocket.on(GAME_CONSTANTS.STATE_UPDATED, stateUpdated);

  console.log("Game socket configured");

  return Promise.resolve();
};

const cardTemplate = document.querySelector("#card");

const dealerHand = document.querySelector(".dealer");
const playerOneHand = document.querySelector(".player-one-hand");
const playerTwoHand = document.querySelector(".player-two-hand");

const updateHand = (handContainer, cardList) => {
  handContainer.innerHTML = "";

  cardList.forEach(({ suit, value }) => {
    const container = cardTemplate.content.cloneNode(true);
    const div = container.querySelector(".card");

    div.classList.add(`suit-${suit}`);
    div.classList.add(`value-${value}`);
    div.innerText = `${value}`;

    handContainer.appendChild(div);
  });
};

const stateUpdated = ({ game_id, current_player, players }) => {
  const dealerCards = players.find((player) => player.user_id === -1).hand;
  const seatOneCards = players.find((player) => player.user_id === 1).hand;
  const seatTwoCards = players.find((player) => player.user_id === 2).hand;

  console.log({ dealerCards, seatOneCards, seatTwoCards });
  updateHand(dealerHand, dealerCards);
  updateHand(playerOneHand, seatOneCards);
  updateHand(playerTwoHand, seatTwoCards);
};

export { configure };
