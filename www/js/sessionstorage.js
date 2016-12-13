console.log("SESSIONSSTORAGE FILE LOADED");

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