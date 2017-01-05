// Global variables
currentGame = {};
gameVersions = [];
gamesCurrentVersion = 0;

function generateDiceRandmly(){
	var arr = [];
	for (var i = 0; i < 5; i++) {
		arr.push(randomDiceGenerator());
	};
	return arr;
}

function generatCombinations(){
	// Length 18
	return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}


// Function: Find localStorage keys and add template if they doesn't exist
function isLocalStorageKeys(){
	// Finns inte localStorage "yatzy-games" - skapa en mall

	if(!localStorage.getItem("yatzy-game") || localStorage.getItem("yatzy-game") === "undefined"){
		yatzygame = { currentDice: [], players:[], nbrThrows: 3, started: false, currentPlayer: 0, lockedDice: [], nbrRounds: 15};
		/*	EXAMPLE for player objec:
							players: 	[{id: 1, name: "anton", combinations: generatCombinations()}],
		*/
		
		console.log("New game created.");
		if(gameVersions.length > 0){
			gameVersions.splice(gamesCurrentVersion);
		}
		gameVersions.push(currentGame);
		localStorage.setItem("yatzy-game", JSON.stringify(yatzygame));
	}

	// Variabel för våra yatzy spel
	currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
	setGameVersions();
	// started true
	if(currentGame.started){
		$(".beforegame").hide();
		$(".ingame").show();
		$(".ingameFooter").show();
		
		drawTable();

		// draw dice	
		setDiceClass();

		// change button
		upadteThrowButton();

		// display possible combination
		displayPossibleCombinations();
	}		
	else{	// started false
		$(".beforegame").show();
		$(".ingame").hide();
		$(".ingameFooter").hide();
	}
	
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


// update the highscore when game is finnished
function updateHighscore(scoreArr){
	// validate input: result
	if(scoreArr){
		// Variabel för våra yatzy spel
		var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));
		
		yatzyhighscore.highscores.push(scoreArr);
		
		// redo an object to a string
		yatzyhighscore = JSON.stringify(yatzyhighscore);
		
		// set gameid to started in localStorage
		localStorage.setItem("yatzy-highscore", yatzyhighscore);
		
		// call function highscoreOutput() to update highscore table
		highscoreOutput();
		
		return true;
	}
	
	// no result input
	return false;
}

// output table rows to highscore
function highscoreOutput(){
	
	// function sorting array numbers
	function sortNumber(a,b) {
		return b - a;
	}
	
	// Variabel för våra yatzy highscore object
	var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));
	
	// sortera vårt highscore efter högsta poäng
	topFiveHighscore = yatzyhighscore.highscores.sort(sortNumber);
	
	// Amount 
	highscorelength = 5;

	$("#table_highscore").empty();
	
	if(topFiveHighscore.length == 0){
		tablerow = "<tr><td>Vi har inga sparade högsta poäng!</td><tr>";
		$("#table_highscore").append(tablerow);
	}else{
		// count length of highscore if below "5"
		if(topFiveHighscore.length < highscorelength){
			highscorelength = topFiveHighscore.length;
		}
		
		// empty highscore table
		// Loop sorted highscore
		for(var t = 0; t < highscorelength; t++){
			result = topFiveHighscore[t];
			row = t+1;
			tablerow = "<tr><th>#"+row+"</th><td>"+result+"</td><tr>";
			$("#table_highscore").append(tablerow);
		}
	}
	
}


function showInModal(head, body, foot){	
	$("#clickRowModal").remove();
	var modalContainer = '<div id="clickRowModal" class="modal fade" role="dialog">' + 
	  						'<div class="modal-dialog" role="document">' + 
	    						'<div class="modal-content">' + 
	    							'<div class="modal-header">' +
								        '<h6 class="modal-title">'+ 
								        	head +
								        '</h6>' +
							      	'</div>' +
	      							'<div class="modal-body">' + 
	      								body + 
	      							'</div>' + 
								    '<div class="modal-footer">' +
										foot +
								  	'</div>' +
      							'</div>' + 
  							'</div>'  + 
						 '</div>';
	$("body").append(modalContainer);
  	$("#clickRowModal").modal("show");
}

function setGameVersions(){
	if(gameVersions.length > 0 && gamesCurrentVersion < gameVersions.length - 1){
		gameVersions.splice(gamesCurrentVersion);
	}

	// var tmp = { currentDice: currentGame.currentDice, players:currentGame.players, nbrThrows: currentGame.nbrThrows, started: currentGame.started,
	//  currentPlayer: currentGame.currentPlayer, lockedDice: currentGame.lockedDice, nbrRounds: currentGame.nbrThrows};
	var tmp = jQuery.extend(true, {}, currentGame);
	gameVersions.push(tmp);
	gamesCurrentVersion = gameVersions.length - 1;
}