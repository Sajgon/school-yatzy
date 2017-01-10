
function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}

function generateDiceRandmly(){
	var arr = [];
	for (var i = 0; i < 5; i++) {
		arr.push(randomDiceGenerator());
	};
	return arr;
}

// Throw dice function
function throwDice(){
	for (var i = 1; i < 6; i++){
		if(currentGame.lockedDice.indexOf(i) === -1){
			currentGame.currentDice[i-1] = (randomDiceGenerator());
		}
	}
	
	// number of throws is now -1
	if(currentGame.nbrThrows > 0){
		currentGame.nbrThrows--;
	}
	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
	
	setGameVersions();

	// change button
	updateThrowButton();

	// show dice animation
	drawTable();	
	
	gifDice();

	// 
	setTimeout(function(){ 
		setDiceClass();
		displayPossibleCombinations();
	}, 800);
	
}

function updateThrowButton(){
	nbrThrowsLeft = 3 - currentGame.nbrThrows;
	$("#throwDices").text("Kasta tärningar " + nbrThrowsLeft + "/3");
	$("#throwDices").prop("disabled", (currentGame.nbrThrows < 1 ? true : false));
}

function lockDie(id){
	currentGame.lockedDice.push(id);
}

//Unlock die
function unlockDie(id){
	currentGame.lockedDice = jQuery.grep(currentGame.lockedDice, function(a){
		return a != id;
	});
}

function setDiceClass(){
	// utf-8 characters for dice faces
	$("#diceHolder").html("");
	if (currentGame.currentDice.length > 0) {
		for(var i = 1; i <= 5; i++){
			var classToAdd = " dice-space-" + currentGame.currentDice[i-1];
			classToAdd += i === 1 ? " col-xs-offset-1" : "";
			classToAdd += currentGame.lockedDice.indexOf(i) > -1 ? " dice-locked" : " dice-free";
			var dieH = '<div id="diceHolder' + i + '" class="col-xs-2 dice-space' + classToAdd + '">';

			var fullDiceImage =  '<img src="images/die_' + currentGame.currentDice[i-1];
			fullDiceImage += currentGame.lockedDice.indexOf(i) > -1 ? 'locked.png">' : '.png">';
			dieH += fullDiceImage;
			dieH += '</div>'
			$("#diceHolder").append(dieH);
		};
	}
}

/*	Function to view a GIF image for 1.5 seconds */
function gifDice(){
	
	$("#diceHolder").html("");
	for(var i = 1; i <= 5; i++){
		var classToAdd = " dice-space-" + currentGame.currentDice[i-1];
		classToAdd += i === 1 ? " col-xs-offset-1" : "";
		classToAdd += currentGame.lockedDice.indexOf(i) > -1 ? " dice-locked" : " dice-free";
		var dieH = '<div id="diceHolder' + i + '" class="col-xs-2 dice-space' + classToAdd + '">';

		// view dice animation 
		fullDiceImage =  '<img src="images/';
		fullDiceImage += currentGame.lockedDice.indexOf(i) > -1 ? 'die_'+currentGame.currentDice[i-1]+'locked.png">' : 'dicegif.gif">';
		dieH += fullDiceImage;
		dieH += '</div>'
		$("#diceHolder").append(dieH);
	}
}
