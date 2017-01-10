
// 
function handleOnePlay(combId){
	// gamesCurrentVersion = gameVersions.length + 1;

	var index = arrComboId.indexOf(combId);
	
	var player = currentGame.players[currentGame.currentPlayer];
	player.combinations[index] = getScore(combId);
	player.combinations = countCombinations(player.combinations);
	player.lockedCombinations.push(index);
	currentGame.players[currentGame.currentPlayer] = player;

	currentGame.nbrThrows = 3;
	currentGame.lockedDice = [];
	currentGame.currentPlayer++;
	if(currentGame.currentPlayer === currentGame.players.length){
		currentGame.currentPlayer = 0;
		currentGame.nbrRounds--;
	}

	currentGame.currentDice = [];

	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));

	setGameVersions();


	drawTable();
	
	setDiceClass();

	updateThrowButton();

	if (currentGame.nbrRounds === 0) {
		handleEndGame();
	};
}

function handleEndGame(){
	var winner = '';
	var scoreArr = [];
	var players = currentGame.players;

	players.sort(function(a,b){
		return b.combinations[17] - a.combinations[17];
	});

	var highscore = 0;
	players.forEach(function(player, i){
		var s = player.combinations[17];
		scoreArr.push(s);
		if (s > highscore) {
			highscore = s;
			winner = player.name;
		};
	}); 

	scoreArr.sort(function(a,b){ return b- a;});	
	displayGameResult(players, scoreArr, winner);
	
	
	// add result to highscore object
	for(var i = 0; i < scoreArr.length; i++){
		// Uppdatera highscore med
		updateHighscore(scoreArr[i], players[i].name);
	}
	
}

function displayGameResult(players, scoreArr, winner){
	
	var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));

	var newHighScore = '';
	var scores = yatzyhighscore.highscores.forEach(function(s) {
		if( scoreArr[0] > s.points)
			newHighScore = '<p>Ny High Score!!!</p>';
	});

	var modalHead = scoreArr[0] > scoreArr[1] ? ('Grattis ' + winner + '! Du vann med poängen '+ scoreArr[0]) : 'Ingen vinnare.';	

	var modalBody = newHighScore + '<ul>';
	players.forEach(function(pl, i){
		modalBody += '<li>'+ (i + 1) + '. ' + pl.name + ': ' + pl.combinations[17] +'</li>';
	});
	modalBody += '</ul>';
	//var modalFooter = '<span class="closeModal">Stäng</span>';
	var modalFooter = '<button id="btnFinnish" type="button" class="btn btn-success" aria-label="Left Align">Stäng</button>';
	showInModal(modalHead, modalBody, modalFooter);
}
