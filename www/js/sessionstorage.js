console.log("SESSIONSSTORAGE FILE LOADED");


// Function: Find localStorage keys and add template if they doesn't exist
function isLocalStorageKeys(){
	// Finns inte localStorage "yatzy-games" - skapa en mall
	if(!localStorage.getItem("yatzy-games")){
		var gameid = 1;
		var yatzygames = '{"'+gameid+'": {"playernames": [],"started": false}}';
		
		console.log("New game created.");
		localStorage.setItem("yatzy-games", yatzygames);
	}

	// Variabel för våra yatzy spel
	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));

	// Loopa alla våra spel
	for(x in yatzygames){
		yatzygame = yatzygames[x];
		started = yatzygame.started;
		gameid = x;
		
		if(started == false){
			// continue with this game id
			
			break;
		}
	}
	
	// Finns inte localStorage "yatzy-highscore" - skapa en mall
	if(!localStorage.getItem("yatzy-highscore")){
		var yatzyhighscore = '{"highscores": []}';
		localStorage.setItem("yatzy-highscore", yatzyhighscore);
	}

	var yatzyhighscores = JSON.parse(localStorage.getItem("yatzy-highscore"));
	var highscores = yatzyhighscores.highscores;

	if(highscores.length == 0){
		console.log("Inga registrerade poäng på vår highscore!");
	}else if(highscores.length > 0){
		console.log("Highscore lista:");
		for(var h = 0; h < highscores.length; h++){
			console.log(highscores[h]);
		}
	}
}


// add a user to local storage
function addUsernameToGameid(username, gameid){
	// get localstorage object
	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	
	// validate username & gameid input
	if(username.length >= 1 && gameid.length > 0){
		if(yatzygames[gameid].playernames.length <= 4){
			// push username to object
			yatzygames[gameid].playernames.push(username);
			
			yatzygames = JSON.stringify(yatzygames);
			
			// push yatzygames to localStorage
			localStorage.setItem("yatzy-games", yatzygames);
			
			return true;
		}
		
		return false;	
	}
	
	return false;
}

// changed status "started" to true when button "STARTA SPEL" is pressed
function setGameStarted(gameid){
	
	// validate input: gameid
	if(gameid.length > 0){
		// Variabel för våra yatzy spel
		var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
		
		// set started to true
		yatzygames[gameid].started = true;
		
		// redo an object to a string
		yatzygames = JSON.stringify(yatzygames);
		
		// set gameid to started in localStorage
		localStorage.setItem("yatzy-games", yatzygames);
		
		return true;
	}
	
	return false;
}

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
	
	console.log("topFiveHighscore");
	console.log(topFiveHighscore);
	
	// Amount 
	highscorelength = 5;
	
	// count length of highscore if below "5"
	if(topFiveHighscore.length < highscorelength){
		highscorelength = topFiveHighscore.length;
	}
	
	// empty highscore table
	$("#table_highscore").empty();
	
	// Loop sorted highscore
	for(var t = 0; t < highscorelength; t++){
		result = topFiveHighscore[t];
		row = t+1;
		tablerow = "<tr><th>"+row+"</th><td>"+result+"</td><tr>";
		$("#table_highscore").append(tablerow);
	}
}


// call functions
isLocalStorageKeys();



