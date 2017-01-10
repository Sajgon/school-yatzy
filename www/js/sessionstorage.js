// Global variables
currentGame = {};
gameVersions = [];
gamesCurrentVersion = 0;


// Function: Find localStorage keys and add template if they doesn't exist
function isLocalStorageKeys(){
	// Finns inte localStorage "yatzy-games" - skapa en mall

	if(!localStorage.getItem("yatzy-game") || localStorage.getItem("yatzy-game") === "undefined"){
		yatzygame = { currentDice: [], players:[], nbrThrows: 3, started: false, currentPlayer: 0, lockedDice: [], nbrRounds: 15};
		/*	EXAMPLE for player objec:
							players: 	[{id: 1, name: "anton", combinations: generatCombinations()}],
		*/
		
		console.log("New game created.");

		localStorage.setItem("yatzy-game", JSON.stringify(yatzygame));
	}

	// Variabel för våra yatzy spel
	currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
	setGameVersions();
	// started true
	if(currentGame.started){
		setGameStarted();
	}		
	else{	
		// game started: false
		$(".beforegame").show();
		$(".ingame").hide();
		$(".ingameFooter").hide();
		$("#undoRedoBtns").hide();
		
	}

	updateUndoRedoButtons();
	
	// Finns inte localStorage "yatzy-highscore" - skapa en mall
	if(!localStorage.getItem("yatzy-highscore")){
		var yatzyhighscore = { highscores: []};
		localStorage.setItem("yatzy-highscore", JSON.stringify(yatzyhighscore));
	}

	var yatzyhighscores = JSON.parse(localStorage.getItem("yatzy-highscore"));
	var highscores = yatzyhighscores.highscores;

	if(highscores.length == 0){
		//console.log("Inga registrerade poäng på vår highscore!");
	}else if(highscores.length > 0){
		console.log("Highscore lista:");
		for(var h = 0; h < highscores.length; h++){
			// console.log(highscores[h]);
		}
	}
}


