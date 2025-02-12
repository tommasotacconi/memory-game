/***	MEMORY GAME	***/
// SETUP PHASE
const playingField = document.querySelector('#playing-field .row');
// Card types array
const cardTypes = [
	{id: 0, name: 'alien.png'}, 
	{id: 1, name: 'bug.png'}, 
	{id: 2, name: 'duck.png'}, 
	{id: 3, name: 'rocket.png'}, 
	{id: 4, name: 'spaceship.png'}, 
	{id: 5, name: 'tiktac.png'} 
];
const playerCards = [];
let errors = 0;
let timeout = 0;
const rows = 4;
const cols = 4;
createGrid(rows, cols, playingField);
const deck = createDeck(rows, cols);
const mixedDeck = mixCards(deck);

// PROCESSING PHASE
// Inserts cards in play field
for (let i = 1; i <= rows * cols; i++) {
	let col = document.querySelector(`#position${i}`);
	const cardBack = createCardFace('back', 'back.png');
	const card = `<div class="card">${cardBack}</div>`;
	col.innerHTML = card;
	// Event listeners for game logic
	gameCard = document.querySelector(`#position${i} .card`);
	gameCard.addEventListener('click', (e) => {
		const isCardRotated = rotateCard(e, i - 1, mixedDeck);
		// Checks if the card was already rotated to prevent calculation for rotated card
		if (!isCardRotated) {
			const moveResult = checkCardsPair(playerCards);
			if (!moveResult) {
				const errorsNumber = document.querySelector('#console .errors-number');
				errorsNumber.innerHTML = errors;
			} 
		}
		if (playerCards.length === 2) {
			console.log('--removed cards: ', playerCards.splice(0, 2));
		};
	});
}


