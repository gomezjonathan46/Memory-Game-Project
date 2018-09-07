const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
let moveCounter = 0;
let match = 0;
let timerStarted = false;
let timer;
const stars = document.querySelectorAll('.fa-star');
const moves = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let open = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Shuffle list of cards
shuffle(listOfCards);


// Creates HTML for each card in shuffled deck, then adds the HTML to the page.
for (card in listOfCards) {
	let parentOfList = document.createElement('div');
	let newList = parentOfList.insertAdjacentElement('beforeend', document.createElement('li'));
	newList.classList.add('card');
	let childOfList = newList.insertAdjacentElement('beforeend', document.createElement('i'));
	childOfList.classList.add('fa', listOfCards[card]);
	parentOfList.appendChild(newList);
	deck.appendChild(newList);
	}


// Flips the cards, adds card to open list, increases the move counter, and starts the timer.
function flipCards(card){
  if (card.target.classList.contains('card') && open.length <= 1 && !open.includes(card.target) && !card.target.classList.contains('match') && !card.target.classList.contains('open')) {
    if (open.length === 1) {
      moveCounter++;
      moves.innerHTML = moveCounter.toString();
    }
    open.push(card.target);
    card.target.classList.toggle('open');
    card.target.classList.toggle('show');
    if (timerStarted === false) {
      startTimer();
    }
  }
  card.stopPropagation();
}

document.querySelector('.deck').addEventListener('click',flipCards);


// Removes stars from game and modal.
function removeStars() {
 if (moveCounter === 16) {
   stars[0].classList.toggle('fa-star');
   stars[3].classList.toggle('fa-star');
 } else if (moveCounter === 24) {
   stars[1].classList.toggle('fa-star');
   stars[4].classList.toggle('fa-star');
 }
}

// Checks if the two cards in the open list match.
// If they do, the match counter increases. When the match counter reaches 16 the timer stops and the modal pops up.
// if they don't match, there's a second pause before the cards flip back over.
// The open list clears and stars are removed depending on the number of moves.
function checkForMatch(ev){
  if (open[0].innerHTML === open[1].innerHTML) {
    open.forEach(function(card) {
      card.classList.add('match');
      match++;
      if (match === 16) {
        stopTimer();
        document.querySelector('.modal').style.display = "block";
      }
    })
    open = [];
  } else {
    setTimeout(function() {
      open.forEach(function(card) {
        card.classList.toggle('open');
        card.classList.toggle('show');
        open = [];
      })}, 1000);
  }
  removeStars();
}

document.querySelector('.deck').addEventListener('click', checkForMatch);


//setTime and pad function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer() {
  timer = setInterval(setTime, 1000);
  timerStarted = true;
}

function stopTimer() {
  clearInterval(timer);
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  //Display time on modal
  modalMinutes.innerHTML = minutesLabel.innerHTML;
  modalSeconds.innerHTML = secondsLabel.innerHTML;
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


// Creates functionality for the reset button
function reset() {
  //Restarts the timer
  timerStarted = false;
  stopTimer();
  totalSeconds = 0;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

  //Reshuffles the listOfCards
  shuffle(listOfCards);

  //Clears the deck
  document.querySelector('.deck').innerHTML = "";

  //Populates the deck with the new shuffled cards
  for (card in listOfCards) {
  	let parentOfList = document.createElement('div');
  	let newList = parentOfList.insertAdjacentElement('beforeend', document.createElement('li'));
  	newList.classList.add('card');
  	let childOfList = newList.insertAdjacentElement('beforeend', document.createElement('i'));
  	childOfList.classList.add('fa', listOfCards[card]);
  	parentOfList.appendChild(newList);
  	deck.appendChild(newList);
  	}

  //Adds the removed stars back onto the page
  if (moveCounter > 0) {
    if (moveCounter >= 16 && moveCounter < 23) {
      stars[0].classList.toggle('fa-star');
      stars[3].classList.toggle('fa-star');
    }
    if (moveCounter >= 24) {
      stars[0].classList.toggle('fa-star');
      stars[1].classList.toggle('fa-star');
      stars[3].classList.toggle('fa-star');
      stars[4].classList.toggle('fa-star');
    }
  }

  //Resets the moveCounter and match counter back to 0
  moveCounter = 0;
  match = 0;
  moves.innerHTML = moveCounter.toString();
}

document.querySelector('.restart').addEventListener('click', reset);


// Hides the modal
function closeModal() {
  document.querySelector('.modal').style.display = "none";
}


// Closes the modal and resets the game if the player clicks yes on the modal.
function playAgain() {
  closeModal();
  reset();
}

document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.modal-button-no').addEventListener('click', closeModal);
document.querySelector('.modal-button-yes').addEventListener('click', playAgain);


//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
