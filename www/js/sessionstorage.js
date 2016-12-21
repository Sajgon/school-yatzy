//Ben
//console.log("SESSIONSSTORAGE FILE LOADED");
function generatCombinations(){
	return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
currentGame = {};

//EndBen

// Function: Find localStorage keys and add template if they doesn't exist
function isLocalStorageKeys(){
	// Finns inte localStorage "yatzy-games" - skapa en mall
	if(!localStorage.getItem("yatzy-games")){
		// var yatzygames = '{"game": {"playernames": [],"started": false}}';
		var yatzygame = { 	currentDice: [],
							players: 	[{	
											id: 1,
											namn: "anton",
											combination: generatCombinations()
											}],
							nbrThrows: 3,
							started: false,
							currentPlayer : 1
						};
		
		
		console.log("New game created.");
		localStorage.setItem("yatzy-game", JSON.stringify(yatzygame));
	}

	// Variabel för våra yatzy spel
	currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
	
	var started = currentGame.started;
	
	//
	if(started){
		$(".beforegame").hide();
		$(".ingame").show();
	}
	else{
		$(".beforegame").show();
		$(".ingame").hide();
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


// // add a user to local storage
// function addUsernameToGameid(username){
// 	// get localstorage object
// 	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	
// 	// validate username & gameid input
// 	if(username.length >= 1 && username.length <= 10){
// 		if(yatzygames["game"].playernames.length < 4){
// 			// push username to object
// 			yatzygames["game"].playernames.push(username);
			
// 			yatzygames = JSON.stringify(yatzygames);
			
// 			// push yatzygames to localStorage
// 			localStorage.setItem("yatzy-games", yatzygames);
			
// 			return true;
// 		}
		
// 		// Error: we couldnt find username object from localstorage
// 		return false;	
// 	}else{
// 		// Inget användarnamn inskrivet
// 	}
	
// 	return false;
// }

// // changed status "started" to true when button "STARTA SPEL" is pressed
// function setGameStarted(){

// 	// Variabel för våra yatzy spel
// 	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	
// 	if(yatzygames){
// 		// set started to true
// 		yatzygames["game"].started = true;
		
// 		for(var i = 0; i < 4; i++){
// 			var p = i+1;
// 			var playerPositionString = p + ". ";
			
// 			if(yatzygames["game"].playernames[i]){
				
// 				$($('#playernames').children()[p]).html(playerPositionString + "" + yatzygames["game"].playernames[i]);
// 			}else{
// 				$($('#playernames').children()[p]).html("-");
// 			}
// 		}
		
// 		// redo an object to a string
// 		yatzygames = JSON.stringify(yatzygames);
		
// 		// set game to started in localStorage
// 		localStorage.setItem("yatzy-games", yatzygames);
		
// 		// Visa korrekta element
// 		$(".beforegame").hide();
// 		$(".ingame").show();
			
// 		return true;
// 	}
		
// 	return false;
// }

// update the highscore when game is finnished
function updateHighscore(result){
	// validate input: result
	if(result){
		// Variabel för våra yatzy spel
		var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));
		
		// add result to highscore object
		yatzyhighscore.highscores.push(result);
		
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


// call functions
isLocalStorageKeys();



