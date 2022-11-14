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

const bankRollbank = document.querySelector('#bankroll')

const betSpot = document.querySelector('#bet')

// const dealerCard1 = document.querySelector('#dealercard1')
// const dealerCard2 = document.querySelector('#dealercard2')

// const playerCard1 = document.querySelector('playercard1')
// const playerCard2 = document.querySelector('playercard2')

const playerCardsEl = document.querySelector('.playerscards')
const dealerCardsEl = document.querySelector('.dealerscards')

const playerScoreEl = document.querySelector('#playerscore')
const dealerScoreEl = document.querySelector('#dealerscore')

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
let bankRoll;


    init();

function init() {
    bankRoll = 500
    bet = 0
 

    getNewShuffledDeck();


    
    
    render();

};

function render() {
    // let dealerHand;
    // let playerHand;
    // let bet;
    // let bankRoll;
    betSpot.innerText = bet
    bankRollbank.innerText = bankRoll
}
// game logic

// if(playerHand > dealerHand){
//     console.log('player wins')
// }else if(dealerHand > playerHand){
//     console.log('dealer wins')
// }

//win function
function win(){
    console.log('you won')
    return bankRoll += bet

   
}

function lose() {
    console.log('you lose')
    return bankRoll -= bet
}

// bet function 

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

// _________________________________________________

function changeTurn() {
    console.log('switch turn')
    render();
    
}

standBtn.addEventListener('click', (e) => {
    changeTurn();
    render();
})

hitBtn.addEventListener('click', (e) => {
    console.log('draw another card')

    if (playerHand < 21){
      for (i = 0; hitBtn =; i++){
      newplayercard = document.createElement('div')
      newplayercard.setAttribute('class', `card ${shuffledDeck[i].face}`)
      playerCardsEl.appendChild(newplayercard)
      playerHand += shuffledDeck[i].value
      playerScoreEl.innerText = playerHand
    } 
    
  } else {
    console.log('you bust')
  }
    //   if(playerHand < 21) {

    // newplayercard = document.createElement('div')

    // for(let i = 0; i < shuffledDeck.length; i++) {
    // newplayercard.setAttribute('class', `card ${shuffledDeck[i].face}`)
    // playerCardsEl.appendChild(newplayercard)
    // playerHand += shuffledDeck[i].value
    // playerScoreEl.innerText = playerHand
    //   } 
        
    render();
    });

dealBtn.addEventListener('click', (e) => {

  if(bet > 0){
     deal();
  }
     render();
});

function deal() {
    let shuffledDeck = getNewShuffledDeck(); 
    let playercard1 = document.createElement('div');
    let playercard2 = document.createElement('div');
   


    // playercard1.setAttribute('class', `card.${shuffledDeck[0].face}`)
    playercard1.setAttribute('class', `card ${shuffledDeck[0].face}`)
    playercard2.setAttribute('class', `card ${shuffledDeck[1].face}`)
    


    playerCardsEl.appendChild(playercard1)
    playerCardsEl.appendChild(playercard2)

    let dealercard1 = document.createElement('div');
    let dealercard2 = document.createElement('div');

    dealercard1.setAttribute('class', `card ${shuffledDeck[2].face}`)
    dealercard2.setAttribute('class', `card ${shuffledDeck[3].face}`)

    dealerCardsEl.appendChild(dealercard1)
    dealerCardsEl.appendChild(dealercard2)
    
    playerHand += shuffledDeck[0].value
    playerHand += shuffledDeck[1].value

    dealerHand += shuffledDeck[2].value
    dealerHand += shuffledDeck[3].value

    dealerScoreEl.innerText = dealerHand;
    playerScoreEl.innerText = playerHand;
};

// deck = [
//     "A",
//     "A",
//     "A",
//     "A",
//     2,
//     2,
//     2,
//     2,
//     3,
//     3,
//     3,
//     3,
//     4,
//     4,
//     4,
//     4,
//     5,
//     5,
//     5,
//     5,
//     6,
//     6,
//     6,
//     6,
//     7,
//     7,
//     7,
//     7,
//     8,
//     8,
//     8,
//     8,
//     9,
//     9,
//     9,
//     9,
//     10,
//     10,
//     10,
//     10,
//     "J",
//     "J",
//     "J",
//     "J",
//     "Q",
//     "Q",
//     "Q",
//     "Q",
//     "K",
//     "K",
//     "K",
//     "K"
//   ];

// const suits = ['s', 'c', 'd', 'h'];
// const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// // Build a 'master' deck of 'card' objects used to create shuffled decks
// const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

// /*----- app's state (variables) -----*/
// let shuffledDeck;

// /*----- cached element references -----*/
// const shuffledContainer = document.getElementById('shuffled-deck-container');

// /*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

// /*----- functions -----*/
// function getNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   const tempDeck = [...masterDeck];
//   const newShuffledDeck = [];
//   while (tempDeck.length) {
//     // Get a random index for a card still in the tempDeck
//     const rndIdx = Math.floor(Math.random() * tempDeck.length);
//     // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
//     newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
//   }
//   return newShuffledDeck;
// }

// function renderNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   shuffledDeck = getNewShuffledDeck();
//   renderDeckInContainer(shuffledDeck, shuffledContainer);
// }

// function renderDeckInContainer(deck, container) {
//   container.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

// function buildMasterDeck() {
//   const deck = [];
//   // Use nested forEach to generate card objects
//   suits.forEach(function(suit) {
//     ranks.forEach(function(rank) {
//       deck.push({
//         // The 'face' property maps to the library's CSS classes for cards
//         face: `${suit}${rank}`,
//         // Setting the 'value' property for game of blackjack, not war
//         value: Number(rank) || (rank === 'A' ? 11 : 10)
//       });
//     });
//   });
//   return deck;
// }

// renderNewShuffledDeck();