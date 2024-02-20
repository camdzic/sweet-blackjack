const { Blackjack } = require("../dist/index.js");

const game = new Blackjack(3);

game.onEnd((result) => {
  console.log(result);
});

game.placeBet(100);
game.start();

game.hit();
