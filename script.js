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

const winsEl = document.querySelector('#win')
const lossEl = document.querySelector('#loss')
const drawEl = document.querySelector('#draw')


// const dealerCard1 = document.querySelector('#dealercard1')
// const dealerCard2 = document.querySelector('#dealercard2')

// const playerCard1 = document.querySelector('playercard1')
// const playerCard2 = document.querySelector('playercard2')

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
dealerHand = 0
playerHand = 0

    
    
    render();

};

function render() {
    // let dealerHand;
    // let playerHand;
    // let bet;
    // let bankRoll;
    betSpot.innerText = bet
    bankRollbank.innerText = bankRoll
    winsEl.innerText = winCount
    lossEl.innerText = lossCount
    drawEl.innerText = drawCount
   
    
    
}
// game logic


//win function
function win() {
    if (playerHand > 21){
      console.log('you lose')
    bankRoll -= bet
    bet = 0
    lossCount += 1
    return 
    } 
    else if (playerHand > dealerHand || dealerHand > 21) {
      console.log('you won')
      bankRoll += bet
      bet = 0
      winCount += 1
      return 
    }
    else if (playerHand === dealerHand){
    console.log('draw')
    bet = 0
    drawCount += 1
    return 
    } 
    else if(dealerHand > playerHand) {
      console.log('loser')
    bankRoll -= bet
    lossCount += 1
    bet = 0
    return 
    }
    
render();
   
};

// function lose() {
//     console.log('you lose')
//     return bankRoll -= bet
//     render();
// };

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
  // if(playerHand > 21) {
  //   console.log('you lose')
  //   render();
  // };
  
  // if(playerHand > dealerHand && playerHand <= 21){
     
  //       win();
        
  //       render();
        
  // };
  // if (dealerHand > playerHand && dealerHand <= 21){
     
  //       lose();
  //       render();
        
  // };
  // if (dealerHand > 21){
  //   win();
  //   render();
  // }
  render();
}}

standBtn.addEventListener('click', (e) => {
    changeTurn();
    win();
    render();
    
})

hitBtn.addEventListener('click', (e) => {
   hit();

      
    render();
});

dealBtn.addEventListener('click', (e) => {

  if(bet > 0){
     deal();
  }
     render();
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
    
    render();
}
// }
//   if (playerHand < 21) {
//   for (let i = 0; i < shuffledDeck.length; i++) { 
//     // let newplayercard = shuffledDeck.pop();
//       newplayercard = document.createElement('div')
//       newplayercard.setAttribute('class', `card ${shuffledDeck[i].face}`)
//       playerCardsEl.appendChild(newplayercard)
//       playerHand += shuffledDeck[i].value
//       playerScoreEl.innerText = playerHand
//       i++
//       shuffledDeck.pop();
//       return
      
//   }
//      return
      
// }}
// function clearScore() {

//   let playerScoreEl = document.createElement('p')
//     playerScoreEl.className = ('playerScore')
//     let dealerScoreEl = document.createElement('p')
//     dealerScoreEl.className = ('dealerScore')
// // playerCardsEl.innerText = ''
// // dealerCardsEl.innerText = ''
// // playerScoreEl.innerText = 0
// // dealerScoreEl.innerText = 0
// // let dealerHand = 0;
// // let playerHand = 0;
// }

function deal() {

 getNewShuffledDeck();
    // let shuffledDeck = getNewShuffledDeck(); 
    let playercard1 = document.createElement('div');
    let playercard2 = document.createElement('div');
    // let playerScoreEl = document.createElement('p')
    // playerScoreEl.className = ('playerScore')
    // let dealerScoreEl = document.createElement('p')
    // dealerScoreEl.className = ('dealerScore')
   


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

    dealerScoreEl.innerText = dealerHand
    playerScoreEl.innerText = playerHand

    if(playerHand === 21){
      console.log('you win')
      bankRoll += bet
      winCount += 1

    } else if(dealerHand === 21){
      console.log('dealer wins')
      lossCount += 1
      bankRoll -= bet
      return
    }
 
// render();

};
const resetBtn = document.querySelector('#reset');

function clearScore() {

  // let playerScoreEl = document.createElement('p')
  //   playerScoreEl.className = ('playerScore')
  //   let dealerScoreEl = document.createElement('p')
  //   dealerScoreEl.className = ('dealerScore')
// playerCardsEl.innerText = ''
// dealerCardsEl.innerText = ''
// playerScoreEl.innerText = 0
// dealerScoreEl.innerText = 0
// let dealerHand = 0;
// let playerHand = 0;
}

resetBtn.addEventListener('click', (e) => {
  // clearScore();
  init();
  // deal();
// render();
// playerCardsEl.innerText = ''
// dealerCardsEl.innerText = ''
// playerScoreEl.innerText = 0
// dealerScoreEl.innerText = 0
deal();
render();
})