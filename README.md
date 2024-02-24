# sweet-blackjack

A simple implementation of the classic card game Blackjack (also known as 21), written in TypeScript. This implementation includes classes for a Blackjack game and a Deck of cards.

## Installation

```bash
npm install sweet-blackjack
```

## Usage

```typescript
import { Blackjack } from "sweet-blackjack";

const game = new Blackjack(4);

game.onEnd((data) => {
  console.log("Game state:", data.state);
  console.log("Player's cards:", data.player.cards);
  console.log("Dealer's cards:", data.dealer.cards);
  console.log("Payout:", data.payout);
});

game.placeBet(100);

game.start();

game.doubleDown();
game.hit();
game.stand();
```

## API

### `Blackjack`

#### `constructor(decks: number)`
- `decks` - The number of decks to use in the game

#### `placeBet(amount: number)`
- `amount` - The amount of money to bet

#### `start()`
Starts the game and deals the initial cards

#### `hit()`
Draws a card from the deck

#### `stand()`
Ends the player's turn

#### `doubleDown()`
Doubles the player's bet and draws one more card

#### `onEnd(callback: (data: GameEndData) => void)`
- `callback` - A function to be called when the game ends

### `Deck`

#### `constructor(decks: number)`
- `decks` - The number of decks to use in the game

#### `shuffle()`
Shuffles the deck

#### `draw()`
Draws a card from the deck

#### `cardsLeft()`
Returns the number of cards left in the deck

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
