[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12560830)

# Uno Multiplayer Game
By Team F

## Description
Uno, the classic card game, is now available in a digital format with real-time multiplayer capabilities. This project aims to bring the excitement of Uno to a broader audience, allowing players to interact, strategize, and compete in real-time.

## Features

**User Authentication**
- Create Accounts: Sign up with a unique username and password.
- Log In/Out: Securely log in and out of the game.

**Game Setup**
- Create Games: Start a new game session.
- Join Public Games: Join a public game.

**Real-Time Chat**
- Game Creation Page Chat: Interact with other players on the game creation page.
- In-Game Chat: Communicate with opponents during the game.

**Game Logic**
- Card Management: Deal cards, manage draw and discard piles.
- Game Rules: Ensure players follow game rules, including matching colors/numbers.

**Player Actions**
- Play Cards: Play cards from hand during turns.
- Draw Cards: Draw from the draw pile.

**Multiplayer Support**
- Real-Time Gameplay: Synchronized gameplay for multiple players.
- In-Game Chat: Chat feature for players to communicate.

**Game State Management**
- Save/Load: Players can save their game state and continue later.
- Game Notifications: Notify players about turns, status, card draws, etc.

## Database
- Users Table: Stores information about the users, including their credentials and basic details.
- Games Table: Holds details about each game session, such as the number of players, the current state of the game, and initialization status.
- Game_Users Table: Links users to games they are participating in and tracks additional game-specific user information like their seat and readiness status.
- Cards Table: Contains information about individual cards, including their suit and value.
- Game_Cards Table: Manages the state and location of each card within a game, such as which cards are in the deck, in a player's hand, or in the discard pile.
- Messages Table: Used for storing messages related to a game, facilitating in-game communication between players.

- Add a dealer into users table for initializing the game and for managing game mechanics such as shuffling and dealing cards :
  ``` INSERT INTO Users (id, username, password) VALUES (0, 'dealer', 'password123'); ```
  
- Database Design Link : https://dbdiagram.io/d/Uno-Project-657504f556d8064ca0b729fd
  
![image](https://github.com/sfsu-csc-667-fall-2023/team-term-project-group-f/assets/69046025/823eb270-2834-4374-9ca4-ae9ce791b62d)


## Technology Stack
- Render
- Node.js
- Express.js
- Postgres
- Socket.io

## Challenges
- Implementing complex game logic.
- Ensuring real-time synchronization for multiplayer.
- Delivering a smooth user experience across devices.
