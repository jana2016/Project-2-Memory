// List of cards - We use the full css class as an identifier here to
// make it easy to append li elements with the correct css class later.

let deck = ["fa fa-diamond",
            "fa fa-diamond",
            "fa fa-paper-plane-o",
            "fa fa-paper-plane-o",
            "fa fa-anchor",
            "fa fa-anchor",
            "fa fa-bolt",
            "fa fa-bolt",
            "fa fa-leaf",
            "fa fa-leaf",
            "fa fa-bicycle",
            "fa fa-bicycle",
            "fa fa-bomb",
            "fa fa-bomb",
            "fa fa-cube",
            "fa fa-cube",
];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function restart() {



   // let's shuffle!
   shuffle(deck);

  // get the deck ul node
  let ulNode=document.getElementById("deck");

  // loop over the deck appending the new card to the ulNode
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  for (var i = 0; i < deck.length; i++) {
    let cardNode = document.createElement('li');
    cardNode.className = "card";
    let italicNode = document.createElement('i');
    italicNode.className = deck[i];
    cardNode.appendChild(italicNode);
    ulNode.appendChild(cardNode);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 * display the card's symbol (put this functionality in another function that you call from this one)*/
let openCards = [];
let cardDeck = document.querySelector('.deck');
let matchedCards = [];
let timerId = 0;
let i = 0;
let time = 0;
let seconds = 0, minutes = 0;

cardDeck.addEventListener("click", event =>{
  const tgt = event.target;
    if(tgt.classList.contains('card') && !tgt.classList.contains('open')){

// in case someone is a frenetic clicker
      if (openCards.length == 2) {
        return;
      }

// start timer
      function startTimer (){
        setInterval(function(){
          time++;}, 1000);
      }
        const clock=document.querySelector('.clock');
        clock.innerHTML=time
      startTimer();

// count number of valid clicks and display on board
      function increaseCount() {
        i++;
        const movesText=document.querySelector('.moves');
        movesText.innerHTML= i;
      }

// function that detects specific number of moves
// remove star at intervals based on increasing number of moves
      if (i===15 || i===25) {
        const numStars = document.getElementById('starList');
        numStars.removeChild(numStars.childNodes[0]);
      }
    tgt.classList.toggle('open');

// push tgt on the openCards array
    openCards.push(tgt);

// are there 2 open cards?
    if (openCards.length === 2) {
 // are the cards the same?
    if (openCards[0].lastChild.className === openCards[1].lastChild.className) {
// if cards are same, add match class and empty openCards array
      openCards[0].classList.toggle('match');
      openCards[1].classList.toggle('match');
      matchedCards.push(openCards[0], openCards[1]);
      openCards = [];
      }
    else {
// if cards are different, flip cards over again and empty openCards array
      timerId = setTimeout(function(){
        openCards[0].classList.toggle('open');
        openCards[1].classList.toggle('open');
        openCards = [];
      }, 1000);
    }
//call function to count number of valid clicks and display on board
      increaseCount();
    }
//when all cards matched game is over, congrats modal pops up with stats
    if (matchedCards.length === 4){
      document.querySelector('.background-modal').style.display = 'flex';
//all cards match! Time to stop the timer.
      function stopTimer(){
        const timer = setInterval(function(){
          time++;}, 1000);
        clearInterval(timer)}
        stopTimer();
      }
  }
});
restart();

// call restart function


//when close button is clicked, modal closes
document.querySelector('.close').addEventListener('click',
  function(){document.querySelector('.background-modal').style.display ='none';
});

//when reset icon is clicked, game starts over

//document.querySelector('.restart').addEventListener('click',
  //restart());
