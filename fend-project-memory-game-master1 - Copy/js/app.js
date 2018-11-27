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
let secondsElapsed = 0;
let clockOff= true;
let originalScore = document.querySelectorAll('.stars li')
let clock = document.querySelector('.clock');
let clockId;
let totalTime = document.querySelector ('.totalTime');


  cardDeck.addEventListener("click", event =>{
    const tgt = event.target;
      if(tgt.classList.contains('card') && !tgt.classList.contains('open')){

// in case someone is a frenetic clicker
    if (openCards.length == 2) {
      return;
    }
//call start timer function
    if (clockOff){
      startTimer();
      clockOff = false;
    }

// count number of valid clicks and display on board
    function increaseCount() {
      i++;
      const movesText=document.querySelector('.moves');
      movesText.innerHTML= i;
    }

// function that detects specific number of moves and removes star at intervals based on increasing number of moves
    if (i===10 || i===16) {
      const numStars = document.getElementById('starList');
      if (i===10){
        console.log(originalScore[0]);
        originalScore[0].classList.add('stars-hidden');
      }
      if (i===16) {
        originalScore[1].classList.add('stars-hidden')
      }
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
  // if cards are different, flip cards over again and empty openCards array
      else {
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
//all cards match! Stop the timer.
          stopTimer();
//display time
          mins = Math.floor(secondsElapsed/60);
          if (secondsElapsed < 60){
            totalTime.innerHTML = (secondsElapsed +" seconds");
          }
          else {
          totalTime.innerHTML = (mins +" minutes and " + secondsElapsed % (mins * 60) + " seconds")
          }
//display number of stars where i = number of moves
          
        }

  }
});
restart();

// start timer
    function startTimer (){
      clockId = setInterval(function(){
        secondsElapsed++;
        showTimer ();
        console.log(secondsElapsed);
      }, 1000);
    }
// stop timer
    function stopTimer(){
      clearInterval(clockId);
    }

//show timer on game board
  function showTimer(){
    const clock = document.querySelector('.clock');
    console.log(clock);
    clock.innerHTML = secondsElapsed;
  }
//display stars on modal

//when close button is clicked, modal closes
document.querySelector('.close').addEventListener('click',
  function(){document.querySelector('.background-modal').style.display ='none';
  });

//click restart icon and game reloads
document.querySelector('.restart').addEventListener('click', function() {
  location.reload();


  });
