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
 * Creates a deck on the basis of the grid of play; adds in given order card's name
 * from 'cardTypes'
 * 
 * @param {Number} rows 
 * @param {Number} cols 
 * @returns {Array} The array that represents the deck and which needs to be 
 */
function createDeck(rows, cols) {
	const halfDeck = [];
	const halfDeckLength = rows * cols / 2;

	let i = 0;
	while (halfDeck.length < halfDeckLength) {
		const card = cardTypes.filter(element => i === element.id)[0];
		halfDeck.push(card.name);
		i++;
		if (i === 6) i = 0;
	}

	return [...halfDeck, ...halfDeck];
}

/**
 * Mixes the cards. Elements from the deck are picked one by one using an extracted random position;
 * the extract card is added at the end of the array 'mixedDeck'
 * 
 * 
 * @param {Array} deck 
 * @returns An array with the mixed deck, where each
 * position index + 1 corresponds to a grid position index  
*/
function mixCards(deck) {
	const mixedDeck = [];
	const deckLength = deck.length;

	for (let i = 0; i < deckLength; i++) {
		// Sorts an index to move the corresponding card in deck
		const randomCardIndex = Math.floor(Math.random() * deck.length);
		const movedCard = deck.splice(randomCardIndex, 1)[0];
		mixedDeck.push(movedCard);
	}

	return mixedDeck;
}

/**
 * Creates a single card as string and returns it
 * 
 * @param {Number} colNumber 
 */
function createCardFace(face, cardFileName) {
	// Return a srtring to construct a card face
	const faceImg = `<img class="img-fluid" src="images/${cardFileName}" alt="game-card-front">`;

	return `<div class="card-${face}">${faceImg}</div>`;
}

/**
 * Inserts a front-card with image to watch it or removes it; rotates card with class 'card-rotated'
 * 
 * @param {Event} event 
 * @param {Number} positionId 
 */
function rotateCard(event, positionId, mixedDeck) {
	const watchedCard = mixedDeck[positionId];
	console.table(watchedCard, positionId);
	const card = event.currentTarget;
	
	if (!card.querySelector('.card-front')) {
		playerCards.push({name: watchedCard, positionId});
		const cardFront = createCardFace('front', watchedCard); 
		card.innerHTML += cardFront;
		card.classList.add('card-rotated');
		return false;
	} else {
		card.classList.remove('card-rotated');
		if (!timeout) {
			frontCard = card.querySelector('.card-front');
			timeout = setTimeout(() => {
				card.removeChild(frontCard);
				timeout = null;
			}, 150)
		}
		return true;
	}
}

/**
 * Player move check  
 * 
 * @param {String} cards 
 */
function checkCardsPair(cards) {
	let result = false;
	console.log(cards);

	if (cards.length === 2) {
		if (cards[0].name === cards[1].name) {
			result = true;
			console.log('Hai trovato una coppia di carte')
		}	else {
			errors++;
		}
	}

	return result;
}