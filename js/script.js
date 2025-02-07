// FUNCTIONS
/**
 * Creates the grid starting from parameters 'rows' and 'cols'
 * 
 * @param {Number} rows 
 * @param {Number} cols 
 */
function createGrid(rows, cols, field) {
	const totCols = rows * cols;
	for (let i = 1; i <= totCols; i++) {
		const col = `<div id="position${i}" class="col"></div>`;
		field.innerHTML += col; 
	}
}

/**
 * Create a single card as string and returns it
 * 
 * @param {Number} colNumber 
 */
function createCard(cardFileName) {
	const img = `<img class="img-fluid" src="images/${cardFileName}" alt="game-card">`;
	const card = `<div class="card">${img}</div>`;
	return card;
}

/**
 * Draws the cards. A random number for each grid position is extracted and used to construct an array that stores
 * the name of the file with the drawned card
 * 
 * 
 * @param {Number} totCards 
 * @returns An array of length  totCards, where each
 * position index + 1 corresponds to a grid position index  
 */
function drawCards(totCards) {
	const cardsPositions = [];
	for (let i = 0; i < totCards; i++) {
		const randomId = Math.floor(Math.random() * 6);
		const randomCard = cardsType.filter(element => randomId === element.id);
		cardsPositions.push(randomCard[0]);
	}
	return cardsPositions;
}

/**
 * Changes src attribute of the card selected to watch it
 * 
 * @param {Number} positionId 
 * @param {Node} target 
 */
function watchCard(event, positionId) {
	selectedCardBack = event.currentTarget;
	const watchedCard = cardsPositions[positionId - 1];
	selectedCardBack.src = `images/${watchedCard.name}`;
}

// SETUP PHASE
const playingField = document.querySelector('#playing-field .row');
// Card types array
const cardsType = [
	{id: 0, name: 'alien.png'}, 
	{id: 1, name: 'bug.png'}, 
	{id: 2, name: 'duck.png'}, 
	{id: 3, name: 'rocket.png'}, 
	{id: 4, name: 'spaceship.png'}, 
	{id: 5, name: 'tiktac.png'} 
];

createGrid(4, 4, playingField);
const cardsPositions = drawCards(4*4);
for (let i = 1; i <= 4 * 4; i++) {
	let col = document.querySelector(`#position${i}`);
	const card = createCard('back.png');
	col.innerHTML = card;
	img = document.querySelector(`#position${i} img`);
	console.log(img);
	img.addEventListener('click', (e) => {
		watchCard(e, i);
	});
}


