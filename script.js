// Constants
const hitBtn = document.querySelector('#hit')
console.log(hitBtn)

const standBtn = document.querySelector('#stand')
console.log(standBtn)

const fiverBtn = document.querySelector('#fiver')
console.log(fiverBtn)

const tennerBtn = document.querySelector('#tenner')
console.log(tennerBtn)

const quarterBtn = document.querySelector('#quarter')
console.log(quarterBtn)

const fiddyBtn = document.querySelector('#fiddy')
console.log(fiddyBtn)

const dealBtn = document.querySelector('#deal')

const dealBtnOne = document.querySelector('#deal2')

const bankRollbank = document.querySelector('#bankroll')

const betSpot = document.querySelector('#bet')

const winsEl = document.querySelector('#win')
const lossEl = document.querySelector('#loss')
const drawEl = document.querySelector('#draw')
const resultEl = document.querySelector('#result')

const playerCardsEl = document.querySelector('.playerscards')
const dealerCardsEl = document.querySelector('.dealerscards')

const playerScoreEl = document.querySelector('.playerscore')
const dealerScoreEl = document.querySelector('.dealerscore')

/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();


// state
let dealerHand = 0;
let playerHand = 0;
let bet;
let bankRoll = 500;
let winCount = 0;
let lossCount = 0; 
let drawCount = 0;


    init();

function init() {
  
    bet = 0

    getNewShuffledDeck();

standBtn.style.visibility = 'hidden'
hitBtn.style.visibility = 'hidden'

    
    
    render();

};

function render() {

    betSpot.innerText = bet
    bankRollbank.innerText = bankRoll
    winsEl.innerText = winCount
    lossEl.innerText = lossCount
    drawEl.innerText = drawCount
    playerScoreEl.innerText = playerHand
    dealerScoreEl.innerText = dealerHand
   
    
    
}
// game logic


//win function
function win() {
    if (playerHand > 21){
      console.log('you lose')
    bankRoll -= bet
    bet = 0
    lossCount += 1
    resultEl.innerText = 'YOU LOSE'
    return 
    } 
    else if (playerHand > 21 && dealerHand > 21){
      console.log('draw')
      bet = 0
      drawCount += 1
      resultEl.innerText = 'ITS A DRAW'
      return 
    }
    else if (playerHand > dealerHand || dealerHand > 21) {
      console.log('you won')
      bankRoll += bet
      bet = 0
      winCount += 1
      resultEl.innerText = 'YOU WIN'
      return 
    }
    else if (playerHand === dealerHand){
    console.log('draw')
    bet = 0
    drawCount += 1
    resultEl.innerText = 'ITS A DRAW'
    return 
    } 
    else if(dealerHand > playerHand) {
      console.log('loser')
    bankRoll -= bet
    lossCount += 1
    bet = 0
    resultEl.innerText = 'YOU LOSE'
    return 
    } else {
      console.log('who knows')
    }
    
render();
   
};


fiverBtn.addEventListener('click', (e) => {
    // console.log('add 5 to bet')
    bet += 5
    
    
render();
   
});

tennerBtn.addEventListener('click', (e) => {
    console.log('add 10 to bet')
    bet += 10

    render();
});

quarterBtn.addEventListener('click', (e) => {
    console.log('add 25 to bet')
    bet += 25
    render();
  
});

fiddyBtn.addEventListener('click', (e) => {
    console.log('add 50 to bet')
    bet += 50
    render();
    
});



function changeTurn() {
    console.log('switch turn')
    for(let i = 0; dealerHand < 17; i++){
    if(dealerHand < 17){
      let newdealercardValue = shuffledDeck.pop();
  let newdealercardEl = document.createElement('div');
    
      newdealercardEl.setAttribute('class', `card ${newdealercardValue.face}`)
      dealerCardsEl.appendChild(newdealercardEl)
      dealerHand += newdealercardValue.value
      dealerScoreEl.innerText = dealerHand
  // win();
  };
 
  render();
}}

standBtn.addEventListener('click', (e) => {
    changeTurn();
    win();
    

    render();
    
})

hitBtn.addEventListener('click', (e) => {
   hit();

   if(playerHand === 21){
    console.log('you win')
    bankRoll += bet
    winCount += 1
    changeTurn();
    resultEl.innerText = 'YOU WIN'
  }

  if(playerHand > 21){
    bankRoll -= bet
    lossCount += 1
    resultEl.innerText = 'YOU LOSE'
  }
 
    render();
});

dealBtn.addEventListener('click', (e) => {

  if(bet > 0){
     deal();
  }
     render();
     standBtn.style.visibility = 'visible'
hitBtn.style.visibility = 'visible'

});



function hit() {
  if(playerHand < 21){
  let newplayercardValue = shuffledDeck.pop();
  let newplayercardEl = document.createElement('div');
    
      newplayercardEl.setAttribute('class', `card ${newplayercardValue.face}`)
      playerCardsEl.appendChild(newplayercardEl)
      playerHand += newplayercardValue.value
      playerScoreEl.innerText = playerHand
      
     
    }
    if(playerHand === 21){
      console.log('you win')
      bankRoll += bet
      winCount += 1
      resultEl.innerText = 'YOU WIN'
    }
    
    render();
}

function deal() {

 getNewShuffledDeck();
    
    let playercard1 = document.createElement('div');
    let playercard2 = document.createElement('div');
    let playerScoreEl = document.createElement('p')
    playerScoreEl.className = ('playerScore')
    let dealerScoreEl = document.createElement('p')
    dealerScoreEl.className = ('dealerScore')
   


    
    playercard1.setAttribute('class', `card ${shuffledDeck[0].face}`)
    playercard2.setAttribute('class', `card ${shuffledDeck[1].face}`)
    


    playerCardsEl.appendChild(playercard1)
    playerCardsEl.appendChild(playercard2)

    
    let dealercard2 = document.createElement('div');

    
    dealercard2.setAttribute('class', `card ${shuffledDeck[3].face}`)

   
    dealerCardsEl.appendChild(dealercard2)
    
    playerHand += shuffledDeck[0].value
    playerHand += shuffledDeck[1].value

    
    dealerHand += shuffledDeck[3].value

    dealerScoreEl.innerText = dealerHand
    playerScoreEl.innerText = playerHand
 
    if(playerHand === 21){
      console.log('you win')
      bankRoll += bet
      winCount += 1
      resultEl.innerText = 'YOU WIN'

    } else if(dealerHand === 21){
      console.log('dealer wins')
      lossCount += 1
      bankRoll -= bet
      resultEl.innerText = 'YOU LOSE'
      return
    }
    
    dealBtn.style.visibility = 'hidden';
 
render();
};

const resetBtn = document.querySelector('#reset');


function clearScore() {
const cardEls = document.querySelectorAll('.card')
cardEls.forEach(e => e.remove())
resultEl.innerText = 'RESULT'
playerHand = 0;
dealerHand = 0;

};


resetBtn.addEventListener('click', (e) => {

  clearScore();
  init();
  dealBtn.style.visibility = 'visible';
render();
});



