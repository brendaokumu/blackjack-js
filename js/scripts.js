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

hitButton.addEventListener("click", function() {
  playerCards.push(getNextCard());    //when the player clicks hit, they want another card so we call getNextCard and push that onto playerCards
  checkForEndOfGame();    //its possible that the player with their new card went over 21 and lost the game; go that function then show status again and update our text area
  showStatus();
});

stayButton.addEventListener("click", function() {     //we are done taking cards and the game is effectively over.
  gameOver = true;
  checkForEndOfGame();    //the dealer still has the option of taking cards then update text area with showStatus
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

function getCardNumericValue(card) {    //but if the card.value is 10, Jack, Queen or King it return 10 thus default block will be executed.
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {        //we are passing an array of cards in the getscore function.
  let score = 0;      //initialize score to zero.
  let hasAce = false;     //important to know if the player has an Ace/not for if yes, she adds 10more points to the score. An Ace is usually 1 or 11points.
  for (let i =0; i < cardArray.length; i++) {   //loop through all the cards as long as i is less than cardArray.length  will execute the block of code till ...true
    let card = cardArray[i];      //will take cardArray i and then assign it to card then call getCardNumericValue and pass it the card and get back a new value of that card and add that to score.
    score += getCardNumericValue(card);       //score will increment as each card is read.
    if (card.value === 'Ace') {         //and if the card.value is an Ace then hasAce equals true.
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {     //both hasAce and score have to meet the criteria.
    return score + 10;
  }
  return score;    // returning score thus getting the score out of this function.
}

function updateScores() {
  dealerScore = getScore(dealerCards);      //setting dealerScore to a function called getScore and passing dealerCards to it.
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {

  updateScores();       // call update scores to check if scores are current

  if (gameOver) {     //if game is over we want to give the dealer the option of taking cards
    //let dealer take cards
    while (dealerScore < playerScore    //while the dealerscore is less than playerscore meaning dealer is loosing and pscore is less than/equal to 21 and dscore is less than/equal to 21 ; we want to give the dealer a new card and update scores as well.
      && playerScore <=21
      && dealerScore <=21) {
    dealerCards.push(getNextCard());
    updateScores();
    }
  }

  if (playerScore > 21) {     //if pscore is greater than 21 then the player lost and game is over else if the dscore is greater than 21 then the player won and game over.
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (playerScore === 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {    //else if game is over we want to determine who won and if pscore is greater than dscore then player won else false.

    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else if (playerScore === dealerScore) {
      textArea.innerText += "SORRY IT IS A TIE; NOBODY WINS";
    }
    else {
      playerWon = false;
    }
  }
}

function showStatus() {   //set up the innerText of the textArea with welcome to blackjack if game not started.
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }

  let dealerCardString = " ";
  for (let i=0; i < dealerCards.length; i++) {
      dealerCardString += getCardString(dealerCards[i]) + '\n';
  }   //a string form of all the dealers cards, loop through them and for each card we append the string version of the card along with a new line character thus each card on its own line.

  let playerCardString = " ";
  for (let i=0; i < playerCards.length; i++) {
      playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();   //look up

  textArea.innerText =
  "Dealer has:\n" +
  dealerCardString +
  "(score: "+dealerScore + ")\n\n" +

  "Player has:\n" +
    playerCardString +
  "(score: "+playerScore + ")\n\n";     //changing innerText textArearea to display now this and not the welcome to bj message

  if (gameOver) {           //checking if game over and print out message of winner and then show new game button
    if (playerWon) {
      textArea.innerText += "YOU WIN!";
    }
    else {
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
  }
}
