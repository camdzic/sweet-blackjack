interface Card {
  name: string;
  suit: string;
  value: number;
}

interface Table {
  player: FormattedCards;
  dealer: FormattedCards;
}

interface FormattedCards {
  total: number;
  cards: Card[];
}

type GameState =
  | "waiting"
  | "player_blackjack"
  | "player_win"
  | "draw"
  | "dealer_blackjack"
  | "dealer_win";

type EndEventHandler = (data: {
  state: GameState;
  player: FormattedCards;
  dealer: FormattedCards;
}) => void;

// Exported blackjack class with the necessary methods and properties
export class Blackjack {
  private decks: number;
  private state: GameState = "waiting";
  private player: Card[] = [];
  private dealer: Card[] = [];
  private table: Table = {
    player: {
      total: 0,
      cards: [],
    },
    dealer: {
      total: 0,
      cards: [],
    },
  };
  private cards!: Deck;

  private endHandlers: EndEventHandler[] = [];

  constructor(decks: number) {
    this.decks = validateDeck(decks);
  }

  // Start the game by shuffling the deck, dealing 2 cards to the player and dealer, and returning the table
  public start() {
    this.cards = new Deck(this.decks);
    this.cards.shuffleDeck(2);

    this.player = this.cards.dealCard(2);
    this.dealer = this.cards.dealCard(2);

    this.table.player = formatCards(this.player);
    this.table.dealer = formatCards(this.dealer);

    return this.table;
  }

  // Deal a new card to the player and update the table
  public hit() {
    const newCard = this.cards.dealCard(1)[0];

    this.player.push(newCard);
    this.updateTable();

    return newCard;
  }

  // Stand and let the dealer play, then emit the end event
  public stand() {
    let dealerSum = sumCards(this.dealer);
    let playerSum = sumCards(this.player);

    if (playerSum <= 21) {
      while (dealerSum < 17) {
        this.dealer.push(...this.cards.dealCard(1));

        dealerSum = sumCards(this.dealer);

        this.updateTable();
      }
    }

    if (playerSum <= 21 && (dealerSum > 21 || dealerSum < playerSum)) {
      if (playerSum === 21) {
        this.state = "player_blackjack";
      } else {
        this.state = "player_win";
      }
    } else if (dealerSum === playerSum) {
      this.state = "draw";
    } else {
      this.state = dealerSum === 21 ? "dealer_blackjack" : "dealer_win";
    }

    this.emitEndEvent();
  }

  // Add an event listener for the end of the game
  public onEnd(handler: EndEventHandler) {
    this.endHandlers.push(handler);
  }

  // Emit the end event to all the listeners
  private emitEndEvent() {
    for (let handler of this.endHandlers) {
      handler({
        state: this.state,
        player: formatCards(this.player),
        dealer: formatCards(this.dealer),
      });
    }
  }

  // Update the table with the new cards
  private updateTable() {
    this.table.player.cards = formatCards(this.player).cards;
    this.table.dealer.cards = formatCards(this.dealer).cards;
  }
}

// Exported deck class with the necessary methods and properties
export class Deck {
  private deck: Card[] = [];
  private dealtCards: Card[] = [];

  constructor(decks: number) {
    for (let i = 0; i < decks; i++) {
      this.createDeck();
    }
  }

  // Create a deck with 52 cards for each suit
  private createDeck() {
    const card = (suit: string, value: string): Card => {
      let name = value + " of " + suit;
      if (
        value.toUpperCase().includes("J") ||
        value.toUpperCase().includes("Q") ||
        value.toUpperCase().includes("K")
      )
        value = "10";
      if (value.toUpperCase().includes("A")) value = "11";

      return { name, suit, value: +value };
    };

    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const suits = ["Clubs", "Diamonds", "Spades", "Hearts"];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        this.deck.push(card(suits[s], values[v]));
      }
    }
  }

  // Shuffle the deck a given amount of times
  public shuffleDeck(amount: number = 1) {
    for (let i = 0; i < amount; i++) {
      for (let c = this.deck.length - 1; c >= 0; c--) {
        const tempVal = this.deck[c];
        let randomIndex = Math.floor(Math.random() * this.deck.length);

        while (randomIndex === c) {
          randomIndex = Math.floor(Math.random() * this.deck.length);
        }

        this.deck[c] = this.deck[randomIndex];
        this.deck[randomIndex] = tempVal;
      }
    }
  }

  // Deal a given number of cards from the deck
  public dealCard(numCards: number) {
    const cards: Card[] = [];

    for (let c = 0; c < numCards; c++) {
      const dealtCard = this.deck.shift();
      if (dealtCard) {
        cards.push(dealtCard);
        this.dealtCards.push(dealtCard);
      }
    }

    return cards;
  }

  // Replace the deck with the dealt cards
  public replaceDeck() {
    if (this.dealtCards.length > 0) {
      this.deck.unshift(this.dealtCards.shift()!);
    }
  }

  // Clear the deck and the dealt cards
  public clearDeck() {
    this.deck = [];
    this.dealtCards = [];
  }
}

// Sum the value of the cards
function sumCards(cards: Card[]) {
  return cards.map((c) => +c.value).reduce((acc, cur) => acc + cur, 0);
}

// Format the cards to return the total and the cards
function formatCards(cards: Card[]): FormattedCards {
  return { total: sumCards(cards), cards };
}

// Validate the number of decks
function validateDeck(decks: number) {
  if (!decks) {
    throw new Error("A deck must have a number of decks");
  }
  if (decks < 1) {
    throw new Error("A deck must have at least 1 deck");
  }
  if (decks > 8) {
    throw new Error("A deck can have at most 8 decks");
  }

  return decks;
}