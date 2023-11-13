const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if (lockBoard) return;

  if(this === firstCard) return;

  this.classList.add('flip');


  if (!hasFlippedCard) {
    //first card click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 

    //second card click
    secondCard = this;

   checkForMatch(); 
}



function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unFlipCards();
}



function disableCards() {
 //it's a match
 firstCard.removeEventlistener('click', flipCard);
 secondCard.removeEventlistener('click', flipCard);

 resetBoard();
}


function unFlipCards() {
  lockBoard = true;
 //it's not a match
 setTimeout(() => {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');

  resetBoard();
}, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.computedStyleMap.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));