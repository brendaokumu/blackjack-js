//
// Blackjack
//by Brenda Okumu
//

/*Start of HTML JS
let textArea = document.getElementById("text-area"); //using the elements id from its Dom passing the id text-area
let okButon = document.getElementById("ok-button");

textArea.style.display = "none";

okButton.addEventListener("click", function() { //handling click event on the ok button; 1st argument is the event we want to listen for which is click and and is a function then function body
    textArea.innerText = "Button Clicked!" //event that occurs when click event happens.
    textArea.style.display = "block";
})

textArea.innerText = "Let's Play"; //use variable text area and change its innerText property with our words

End of HTML JS*/

//Card Variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"], //4 suits in the deck
    values = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two" ]; //13 card values

//DOM Variables
let textArea = document.getElementById("text-area"),    //gives main info to user, cards dealt and points, winner/loser, etc
    newGameButton = document.getElementById("new-game-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0;
    playerScore = 0;
    deck = [];

hitButton.style.display = "none";   //starting out with our new game button only; hiding hit and stay buttons at the beginning.
stayButton.style.display = "none";
showStatus();     //ref below defined showStatus function
}

newGameButton.addEventListener("click", function() {    //what we want to happen when user clicks new game button is to hid new gamebutton var and display hit and stay button inline with the text above as Started.
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck(); // created our deck and added a new functioncall after this called shuffleDeck passing in the deck.
  shuffleDeck(deck); //ref below defined shuffleDeck(deck) function
  dealerCards = [ getNextCard(), getNextCard() ];   //both dealer and player start off with 2cards each.
  playerCards = [ getNextCard(), getNextCard() ];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

function createDeck(){ //creating the deck
  let deck = [];
  //suitIndex will range up from 0 to 3 because there are 4suits in the deck and valueIndex will range up from 0 to 12 because there are 13values in the deck.
  //we are going to loop through all the suits and for each suit, we are going to loop through all their values and call deck.push, our value of suit.Hence we just created a full deck of 52cards.
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      for (let valueIndex = 0; valueIndex < values.length; valueIndex++){
          let card = {        //creating card object with a suit property and value property
              suit: suits[suitIndex],
              value: values[valueIndex]
          };
        deck.push(card);    //and we want to push the card onto the deck
      }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {     //create a for loop and loop through every card in the deck.
      let swapIndex = Math.trunc(Math.random() * deck.length);    //calculate and index of a card we can swap with eg. card #1 and swap with any random card within the 52 cards between [0] and [51] then remove decimals with trunc
      let tmp = deck[swapIndex];
      deck[swapIndex] = deck[i];
      deck[i] = tmp;
      //swap deck subscript i with deck subscript swapIndex so will temporarily hold onto deck swapIndex and then deck swapIndex will set that to deck i and then will set deck i to our tmp variable hence we are swapping deck i with deck swapIndex hence shuffling the entire deck.
  }
}

function getCardString(card) {    //storing your card as an object thus easily access the suit and its value
    return card.value + " of " + card.suit;
}

function getNextCard(){ //get the next card off the top of the deck
  return deck.shift(); //take the 1st value of the deck and shift down the other values in the array.
}

function showStatus() {   //set up the innerText of the textArea with welcome to blackjack if game not started.
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }

for (var i=0; i < deck.length; i++) {     //loop through the entire deck and going to populate out textArea.innerText with string values of the entire deck.
    textArea.innerText += '\n' + getCardString(deck[i]);
  }
}
