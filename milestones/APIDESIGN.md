***UNO GAME***

+------+---------+-------------+------------------------+------------+
| User | Inputs  | Prec        | Postcondition(s)       | API        |
| Act  |         | ondition(s) |                        | Endpoint   |
| ions |         |             |                        |            |
+======+=========+=============+========================+============+
| Crea | 1.  pl  | -   User is | -   A new game room is | POST       |
| ting | ayer_id |     logged  |     > created (new     |            |
| a    |         |     in for  |     > game_id).        | /ga        |
| game | 2.  gam |             |                        | mes/create |
|      | e_title |  player_id. | -   Game lobby will    |            |
|      |         |             |     > display the      |            |
|      | 3       |             |     > created game.    |            |
|      | .  num_ |             |                        |            |
|      | players |             | -   All player_id is   |            |
|      |         |             |     > added to         |            |
|      | 4.  p   |             |     > game_id.         |            |
|      | assword |             |                        |            |
|      |         |             | -   Player is moved    |            |
|      |         |             |     > into the game\'s |            |
|      |         |             |     > waiting room.    |            |
|      |         |             |                        |            |
|      |         |             | -   The game will      |            |
|      |         |             |     > display private  |            |
|      |         |             |     > information if a |            |
|      |         |             |     > password was     |            |
|      |         |             |     > made.            |            |
+------+---------+-------------+------------------------+------------+
| Joi  | 1.  pl  | -   game_id | -   player_id is added | POST       |
| ning | ayer_id |     > is    |     > to game_id.      |            |
| a    |         |     > not   |                        | /gam       |
| Pri  | 2.      |     > at    | -   Game lobby is      | e/:id/join |
| vate | game_id |             |     > updated with the |            |
| M    |         | > capacity. |     > new capacity.    |            |
| atch | 3.  p   |             |                        |            |
|      | assword | -   User    | -   All players in     |            |
|      |         |     > must  |     > game_id receive  |            |
|      |         |             |     > the new board    |            |
|      |         |   > provide |     > state (new       |            |
|      |         |     > the   |     > player has       |            |
|      |         |             |     > joined).         |            |
|      |         |   > correct |                        |            |
|      |         |             |                        |            |
|      |         | > password. |                        |            |
|      |         |             |                        |            |
|      |         | -           |                        |            |
|      |         |   player_id |                        |            |
|      |         |     > is    |                        |            |
|      |         |             |                        |            |
|      |         |    > logged |                        |            |
|      |         |     > in.   |                        |            |
|      |         |             |                        |            |
|      |         | -   Game    |                        |            |
|      |         |     > has   |                        |            |
|      |         |     > not   |                        |            |
|      |         |             |                        |            |
|      |         |  > started. |                        |            |
+------+---------+-------------+------------------------+------------+
| Joi  | 1.  pl  | -   game_id | -   player_id is added | POST       |
| ning | ayer_id |     > is    |     > to game_id.      |            |
| a    |         |     > not   |                        | /gam       |
| Pu   | 2.      |     > at    | -   Game lobby is      | e/:id/join |
| blic | game_id |             |     > updated with the |            |
| M    |         | > capacity. |     > new capacity.    |            |
| atch |         |             |                        |            |
|      |         | -           | -   All players in     |            |
|      |         |   player_id |     > game_id receive  |            |
|      |         |     > is    |     > the new board    |            |
|      |         |             |     > state (new       |            |
|      |         |    > logged |     > player has       |            |
|      |         |     > in.   |     > joined).         |            |
|      |         |             |                        |            |
|      |         | -   Game    |                        |            |
|      |         |     > has   |                        |            |
|      |         |     > not   |                        |            |
|      |         |             |                        |            |
|      |         |  > started. |                        |            |
+------+---------+-------------+------------------------+------------+
| Star | 1.  pl  | -   Game    | -   Game state is      | POST       |
| ting | ayer_id |             |     > changed from the |            |
| a    |         |    > should |     > lobby to an      | /games     |
| Game | 2.      |     > be in |     > active state.    | /:id/start |
|      | game_id |     > the   |                        |            |
|      |         |     > lobby | -   All players in the |            |
|      |         |             |     > game are moved   |            |
|      |         |    > state. |     > to the game      |            |
|      |         |             |     > room.            |            |
|      |         | -           |                        |            |
|      |         |   player_id | -   Players can start  |            |
|      |         |     > is    |     > taking their     |            |
|      |         |     > the   |     > turns.           |            |
|      |         |     > game  |                        |            |
|      |         |     > host. |                        |            |
+------+---------+-------------+------------------------+------------+
| Pla  | 1.      | -           | -   Discard pile is    | POST       |
| ying | card_id |   player_id |     > updated with     |            |
| a    |         |     > is a  |     > card_id.         | /games/:id |
| Reg  | 2.  pl  |             |                        | /play_card |
| ular | ayer_id |    > player | -   The next player    |            |
| Nu   |         |     > in    |     > will become the  |            |
| mber | 3.      |             |     > current player.  |            |
| Card | game_id |  > game_id. |                        |            |
|      |         |             | -   All users receive  |            |
|      |         | -   It is   |     > the updated game |            |
|      |         |     > p     |     > state (discard   |            |
|      |         | layer_id\'s |     > pile, number of  |            |
|      |         |     > turn. |     > cards in         |            |
|      |         |             |     > player_id's      |            |
|      |         | -           |     > hand).           |            |
|      |         |   player_id |                        |            |
|      |         |     > has   |                        |            |
|      |         |             |                        |            |
|      |         |   > card_id |                        |            |
|      |         |     > in    |                        |            |
|      |         |     > their |                        |            |
|      |         |     > hand. |                        |            |
|      |         |             |                        |            |
|      |         | -   Playing |                        |            |
|      |         |             |                        |            |
|      |         |   > card_id |                        |            |
|      |         |     > is a  |                        |            |
|      |         |     > legal |                        |            |
|      |         |     > move. |                        |            |
+------+---------+-------------+------------------------+------------+
| Pla  | 1.  pl  | -           | -   Discard pile is    | POST       |
| ying | ayer_id |   player_id |     > updated with     |            |
| a    |         |     > is a  |     > card_id.         | /games/:id |
| Wild | 2.      |             |                        | /play_wild |
| Card | game_id |    > player | -   The next player    |            |
|      |         |     > in    |     > will become the  |            |
|      | 3.      |             |     > current player.  |            |
|      | card_id |  > game_id. |                        |            |
|      |         |             | -   *The chosen wild   |            |
|      | (wild   | -   It is   |     > color is set for |            |
|      | card)   |     > p     |     > the next         |            |
|      |         | layer_id\'s |     > player.*         |            |
|      | 4.  wil |     > turn. |                        |            |
|      | d_color |             | -   All users receive  |            |
|      |         | -           |     > the updated game |            |
|      |         |   player_id |     > state (discard   |            |
|      |         |     > has   |     > pile, number of  |            |
|      |         |             |     > cards in         |            |
|      |         |   > card_id |     > player_id's      |            |
|      |         |     > in    |     > hand).           |            |
|      |         |     > their |                        |            |
|      |         |     > hand. |                        |            |
|      |         |             |                        |            |
|      |         | -   Playing |                        |            |
|      |         |             |                        |            |
|      |         |   > card_id |                        |            |
|      |         |     > is a  |                        |            |
|      |         |     > legal |                        |            |
|      |         |     > move. |                        |            |
|      |         |             |                        |            |
|      |         | -   *Wild   |                        |            |
|      |         |             |                        |            |
|      |         |   > card\'s |                        |            |
|      |         |     > color |                        |            |
|      |         |     > is    |                        |            |
|      |         |             |                        |            |
|      |         |  > chosen.* |                        |            |
+------+---------+-------------+------------------------+------------+
| Pla  | 1.  pl  | -           | -   Discard pile is    | POST       |
| ying | ayer_id |   player_id |     > updated with     |            |
| a    |         |     > is a  |     > card_id.         | /g         |
| Ac   | 2.      |             |                        | ames/:id/p |
| tion | game_id |    > player | -   The next player    | lay_action |
| Card |         |     > in    |     > will become the  |            |
|      | 3.      |             |     > current player,  |            |
|      | card_id |  > game_id. |     > *following the   |            |
|      |         |             |     > new rules        |            |
|      | (action | -   It is   |     > introduced by    |            |
|      | card)   |     > p     |     > the Action       |            |
|      |         | layer_id\'s |     > Card.*           |            |
|      | 4.      |     > turn. |                        |            |
|      |  chosen |             | -   All users receive  |            |
|      | _effect | -           |     > the updated game |            |
|      |         |   player_id |     > state (discard   |            |
|      |         |     > has   |     > pile, number of  |            |
|      |         |             |     > cards in         |            |
|      |         |   > card_id |     > player_id's      |            |
|      |         |     > in    |     > hand).           |            |
|      |         |     > their |                        |            |
|      |         |     > hand. |                        |            |
|      |         |             |                        |            |
|      |         | -   Playing |                        |            |
|      |         |             |                        |            |
|      |         |   > card_id |                        |            |
|      |         |     > is a  |                        |            |
|      |         |     > legal |                        |            |
|      |         |     > move. |                        |            |
|      |         |             |                        |            |
|      |         | -   *Check  |                        |            |
|      |         |     > if    |                        |            |
|      |         |     > the   |                        |            |
|      |         |             |                        |            |
|      |         |    > chosen |                        |            |
|      |         |             |                        |            |
|      |         |    > effect |                        |            |
|      |         |     > is    |                        |            |
|      |         |     > valid |                        |            |
|      |         |     > for   |                        |            |
|      |         |     > the   |                        |            |
|      |         |             |                        |            |
|      |         |  > specific |                        |            |
|      |         |             |                        |            |
|      |         |    > Action |                        |            |
|      |         |             |                        |            |
|      |         |    > Card.* |                        |            |
+------+---------+-------------+------------------------+------------+
| Rol  | 1.  pl  | -           | -   Two dice are       | POST       |
| ling | ayer_id |   player_id |     > rolled with      |            |
| dice |         |     > is    |     > random numbers   | /game      |
|      |         |     > the   |     > from 1 to 6.     | s/:id/roll |
|      |         |             |                        |            |
|      |         | > player\'s | -   The player\'s      |            |
|      |         |             |     > location will    |            |
|      |         |   > in-game |     > increase by the  |            |
|      |         |     > id.   |     > sum of the two   |            |
|      |         |             |     > dice.            |            |
|      |         | -   It has  |                        |            |
|      |         |     > to be | -   If the dice have   |            |
|      |         |             |     > matching         |            |
|      |         | > player_id |     > numbers, the     |            |
|      |         |     > turn. |     > player rolls     |            |
|      |         |             |     > again.           |            |
+------+---------+-------------+------------------------+------------+
| Dra  | 1.  pl  | -   It is   | -   player_id\'s hand  | POST       |
| wing | ayer_id |     > the   |     > is updated with  |            |
| a    |         |     > p     |     > the new card.    | /games/:i  |
| Card | 2.      | layer_id\'s |                        | d/draw_one |
|      | game_id |     > turn. | -   The new card is    |            |
|      |         |             |     > displayed in     |            |
|      | 3.      | -   No card |     > player_id\'s     |            |
|      | card_id |     > was   |     > hand.            |            |
|      |         |     > drawn |                        |            |
|      |         |     > yet.  | -   Number of cards in |            |
|      |         |             |     > player_id\'s     |            |
|      |         | -   The     |     > hand increases   |            |
|      |         |     > draw  |     > by one.          |            |
|      |         |             |                        |            |
|      |         |    > action | -   All users receive  |            |
|      |         |     > is    |     > the updated game |            |
|      |         |     > valid |     > state.           |            |
|      |         |     > in    |                        |            |
|      |         |     > the   |                        |            |
|      |         |     > game  |                        |            |
|      |         |             |                        |            |
|      |         |    > state. |                        |            |
+------+---------+-------------+------------------------+------------+
| Dra  | 1.  pl  | -   It is   | -   player_id draws    | POST       |
| wing | ayer_id |     > the   |     > draw_count cards |            |
| Mult |         |     > p     |     > from the deck.   | /gam       |
| iple | 2.      | layer_id\'s |                        | es/:id/dra |
| C    | game_id |     > turn. | -   Game state is      | w_multiple |
| ards |         |             |     > updated to       |            |
|      | 3.      | -   The     |     > reflect the      |            |
|      | card_id |     > draw  |     > drawn cards.     |            |
|      |         |             |                        |            |
|      | 4.  dra |    > action | -   All users receive  |            |
|      | w_count |     > is    |     > the updated game |            |
|      |         |     > valid |     > state.           |            |
|      |         |     > in    |                        |            |
|      |         |     > the   |                        |            |
|      |         |     > game  |                        |            |
|      |         |     > state |                        |            |
|      |         |             |                        |            |
|      |         |    > (e.g., |                        |            |
|      |         |     > a     |                        |            |
|      |         |     > Draw  |                        |            |
|      |         |     > Two   |                        |            |
|      |         |     > or    |                        |            |
|      |         |     > Draw  |                        |            |
|      |         |     > Four  |                        |            |
|      |         |     > card  |                        |            |
|      |         |     > was   |                        |            |
|      |         |             |                        |            |
|      |         |  > played). |                        |            |
+------+---------+-------------+------------------------+------------+
| Skip | 1.  pl  | -   It is   | -   player_id\'s turn  | POST       |
| ping | ayer_id |     > p     |     > is skipped.      |            |
| a    |         | layer_id\'s |                        | /games/:id |
| turn | 2.      |     > turn. | -   The next player    | /skip_turn |
|      | game_id |             |     > becomes the      |            |
|      |         | -           |     > current player.  |            |
|      |         |   player_id |                        |            |
|      |         |     > has a | -   Discard pile is    |            |
|      |         |     > Skip  |     > updated with the |            |
|      |         |     > card  |     > Skip card.       |            |
|      |         |     > in    |                        |            |
|      |         |     > their | -   All users receive  |            |
|      |         |     > hand. |     > the updated game |            |
|      |         |             |     > state.           |            |
+------+---------+-------------+------------------------+------------+
| Cal  | 1.  pl  | -           | -   The Uno flag is    | POST       |
| ling | ayer_id |   player_id |     > cleared for      |            |
| "    |         |     > has 1 |     > player_id until  | /games/:i  |
| UNO" | 2.      |     > card  |     > they draw more   | d/call_uno |
|      | game_id |     > in    |     > cards.           |            |
|      |         |     > their |                        |            |
|      |         |     > hand. |                        |            |
+------+---------+-------------+------------------------+------------+
| Pos  | 1.  pl  | -           | -   player_id sends a  | POST       |
| ting | ayer_id |   player_id |     > message to the   |            |
| in   |         |     > is in |     > game-specific    | /game      |
| Game | 2.      |     > a     |     > chat.            | s/:id/chat |
| Chat | game_id |             |                        |            |
|      |         |  > specific | -   The message is     |            |
|      | 3.      |     > game  |     > visible to all   |            |
|      | message |             |     > players within   |            |
|      |         |  > session. |     > that particular  |            |
|      |         |             |     > game session.    |            |
|      |         |             |                        |            |
|      |         |             | -   Enhances           |            |
|      |         |             |     > communication    |            |
|      |         |             |     > related to the   |            |
|      |         |             |     > ongoing Uno      |            |
|      |         |             |     > game.            |            |
|      |         |             |                        |            |
|      |         |             | -   Chatbox is updated |            |
|      |         |             |     > with the new     |            |
|      |         |             |     > message.         |            |
+------+---------+-------------+------------------------+------------+
| Pos  | 1.  pl  | -           | -   player_id sends a  | POST       |
| ting | ayer_id |   player_id |     > message to the   |            |
| in   |         |     > is    |     > lobby-wide chat. | /          |
| L    | 2.      |             |                        | lobby/chat |
| obby | message |    > logged | -   The message is     |            |
| Chat |         |     > in.   |     > visible to all   |            |
|      |         |             |     > users in the     |            |
|      |         |             |     > lobby,           |            |
|      |         |             |     > irrespective of  |            |
|      |         |             |     > their current    |            |
|      |         |             |     > game session.    |            |
|      |         |             |                        |            |
|      |         |             | -   Facilitates        |            |
|      |         |             |     > general          |            |
|      |         |             |     > communication    |            |
|      |         |             |     > and social       |            |
|      |         |             |     > interaction      |            |
|      |         |             |     > among users in   |            |
|      |         |             |     > the Uno game     |            |
|      |         |             |     > lobby.           |            |
|      |         |             |                        |            |
|      |         |             | -   Chatbox is updated |            |
|      |         |             |     > with the new     |            |
|      |         |             |     > message.         |            |
+------+---------+-------------+------------------------+------------+
| Lea  | 1.  pl  | -           | -   player_id is       | POST       |
| ving | ayer_id |   player_id |     > removed from the |            |
| a    |         |     > is in |     > game.            | /games     |
| Game | 2.      |     > the   |                        | /:id/leave |
|      | game_id |     > game. | -   If the game is     |            |
|      |         |             |     > still active,    |            |
|      |         |             |     > adjust the game  |            |
|      |         |             |     > state            |            |
|      |         |             |     > accordingly.     |            |
|      |         |             |                        |            |
|      |         |             | -   All users receive  |            |
|      |         |             |     > the updated game |            |
|      |         |             |     > state.           |            |
+------+---------+-------------+------------------------+------------+
| Re   | 1.      | -   Game    | -   Game state is      | POST       |
| star | game_id |     > has   |     > reset to the     |            |
| ting |         |             |     > initial state.   | /games/:   |
| a    | 2.  pl  |   > reached |                        | id/restart |
| Game | ayer_id |     > an    | -   All users receive  |            |
|      |         |     > end   |     > the updated game |            |
|      |         |             |     > state.           |            |
|      |         | > condition |                        |            |
|      |         |             |                        |            |
|      |         | > (win/lose |                        |            |
|      |         |     >       |                        |            |
|      |         | condition). |                        |            |
+------+---------+-------------+------------------------+------------+
| En   | 1.      | -   Game is | -   Game state is      | POST       |
| ding | game_id |     > in an |     > updated to       |            |
| a    |         |             |     > reflect the      | /gam       |
| Game | 2.  pl  |    > active |     > conclusion of    | es/:id/end |
|      | ayer_id |             |     > the game.        |            |
|      |         |    > state. |                        |            |
|      |         |             | -   Winners and losers |            |
|      |         | -   Game    |     > are determined.  |            |
|      |         |     > has   |                        |            |
|      |         |             | -   All users receive  |            |
|      |         |   > reached |     > the final game   |            |
|      |         |     > an    |     > state.           |            |
|      |         |     > end   |                        |            |
|      |         |             |                        |            |
|      |         | > condition |                        |            |
|      |         |             |                        |            |
|      |         | > (win/lose |                        |            |
|      |         |     >       |                        |            |
|      |         | condition). |                        |            |
+------+---------+-------------+------------------------+------------+
| Vie  | 1.      | -   The     | -   Display the game   | POST       |
| wing | game_id |     > game  |     > history,         |            |
| Game |         |     > has   |     > including moves, | /games/:   |
| His  |         |     > been  |     > players, and key | id/history |
| tory |         |             |     > events.          |            |
|      |         |   > played. |                        |            |
|      |         |             | -   Provide a summary  |            |
|      |         |             |     > of the game.     |            |
+------+---------+-------------+------------------------+------------+
| User | 1.  u   | -   Users   | -   Alert the user     | POST       |
| L    | sername |     > are   |     > that they are    |            |
| ogin |         |     >       |     > logged in and    | /login     |
|      | 2.  p   | registered. |     > transfer them to |            |
|      | assword |             |     > the lobby page.  |            |
|      |         |             |                        |            |
|      |         |             | -   Alert users that   |            |
|      |         |             |     > the username or  |            |
|      |         |             |     > password is      |            |
|      |         |             |     > wrong if         |            |
|      |         |             |     > information is   |            |
|      |         |             |     > incorrect.       |            |
+------+---------+-------------+------------------------+------------+
| User | 1.  u   | -   Users   | -   Alert user if the  | P          |
| Si   | sername |             |     > username is      | OST/signup |
| gnUp |         |   > aren\'t |     > used; else, send |            |
|      | 2.  p   |             |     > them to the      |            |
|      | assword |  > created. |     > login page.      |            |
+------+---------+-------------+------------------------+------------+
