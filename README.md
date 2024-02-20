# blackjack-engine

A simple implementation of the classic card game Blackjack (also known as 21), written in TypeScript. This implementation includes classes for a Blackjack game and a Deck of cards.

## Installation

```bash
npm install blackjack-engine
```

## Usage

```typescript
import { BlackjackGame } from "blackjack-engine";

// Create a new instance of Blackjack with 4 decks
const game = new Blackjack(4);

// Start the game and get the initial table state
game.start();

// Perform game actions, like hitting or standing
// Example:
// game.hit();
// game.stand();

// Listen for the end of the game
game.onEnd((data) => {
  // Handle game end
  console.log("Game state:", data.state);
  console.log("Player's cards:", data.player.cards);
  console.log("Dealer's cards:", data.dealer.cards);
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
