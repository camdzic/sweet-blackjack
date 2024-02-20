# sweet-blackjack

A simple implementation of the classic card game Blackjack (also known as 21), written in TypeScript. This implementation includes classes for a Blackjack game and a Deck of cards.

## Installation

```bash
npm install sweet-blackjack
```

## Usage

```typescript
import { Blackjack } from "sweet-blackjack";

// Create a new instance of Blackjack with 4 decks
const game = new Blackjack(4);

// Listen for the end of the game
game.onEnd((data) => {
  console.log("Game state:", data.state);
  console.log("Player's cards:", data.player.cards);
  console.log("Dealer's cards:", data.dealer.cards);
  console.log("Payout:", data.payout);
});

// Place a bet before starting the game
game.placeBet(100);

// Start the game and get the initial table state
game.start();

// Perform game actions, like hitting, standing or doubling down 
game.doubleDown(); // Only available on the first turn
game.hit(); // Draw a card
game.stand(); // End the turn
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
