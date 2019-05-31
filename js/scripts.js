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

let suits = ["Hearts", "Clubs", "Diamonds", "Spades"]; //4 suits in the deck

let values = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two" ]; //13 card values

let textArea = document.getElementById("text-area");    //gives main info to user, cards dealt and points, winner/loser, etc
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

hitButton.style.display = "none";   //starting out with our new game button only; hiding hit and stay buttons at the beginning.
stayButton.style.display = "none";

newGameButton.addEventListener("click", function() {    //what we want to happen when user clicks new game button is to hid new gamebutton var and display hit and stay button inline with the text above as Started. 
  textArea.innerText = "Started...";
  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton . style.display = "inline";
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

function getCardString(card) {    //storing your card as an object thus easily access the suit and its value
    return card.value + " of " + card.suit;
}

function getNextCard(){ //get the next card off the top of the deck
  return deck.shift(); //take the 1st value of the deck and shift down the other values in the array.
}
let deck = createDeck();

let playerCards = [ getNextCard(), getNextCard() ];

console.log(" " + getCardString(playerCards[0]) ); //to display Ace of Hearts
