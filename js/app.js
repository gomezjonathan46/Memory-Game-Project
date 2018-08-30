// Create a list that holds all of your cards

const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]
let moveCounter = 0;

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
deck = document.querySelector('.deck');

for (card in listOfCards) {
	parentOfList = document.createElement('div');
	newList = parentOfList.insertAdjacentElement('beforeend', document.createElement('li'));
	newList.classList.add('card')
	childOfList = newList.insertAdjacentElement('beforeend', document.createElement('i'));
	childOfList.classList.add('fa', listOfCards[card]);
	parentOfList.appendChild(newList);
	deck.appendChild(newList);
	}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
*/

let open = [];

function flipCards(card){
  if (card.target.classList.contains('card') && open.length <= 1 && !open.includes(card.target) && !card.target.classList.contains('match')) {
    card.target.classList.toggle('open')
    card.target.classList.toggle('show')
    open.push(card.target)
  }
  card.stopPropagation();
}

document.querySelector('.deck').addEventListener('click',flipCards);


// - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
// - if the list already has another card, check to see if the two cards match
//    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)



function removeStars () {
 if (moveCounter === 24) {
   const star1 = document.querySelector('li');
   document.querySelector('.stars').removeChild(star1);
 } else if (moveCounter === 32) {
   const star2 = document.querySelector('li');
   document.querySelector('.stars').removeChild(star2);
 }
}


let moves = document.querySelector('.moves')

function checkForMatch(ev){
  if (open.length > 1) {
    if (open[0].innerHTML === open[1].innerHTML) {
      open.forEach(function(card) {
        card.classList.add('match');
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
    moveCounter++
    moves.innerHTML = moveCounter.toString();
    removeStars();
  }
}

document.querySelector('.deck').addEventListener('click', checkForMatch);


// < 10 moves for 3 stars and


//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
