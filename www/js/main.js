// Write dice array to DOM
function showDices(diceArray){
	// utf-8 characters for dice faces
	var diceChars = ["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"];

	// loop through our dice array with dice values and output dice characters
	for(var i = 0; i < diceArray.length; i++){
		$('.dice-space-' + (i+1)).html(diceChars[diceArray[i] - 1]);
	}


}

function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}


// Run showDices on DOM load
$(function (){
	var arrDice = [];
	for (var i = 0; i <= 6; i++){
		arrDice.push(randomDiceGenerator());
	}
	// You can call show dices anywhere
	showDices(arrDice);


});


//Ben
currentDiceSet = [1,2,3,4,5,6];
openedGames = [];
currentGame = {};

function loadSavedData(){
	if(!localStorage.getItem("yatzy-games")){
		var players = [{"name" : "P1", "combinations" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
						  {"name" : "P2", "combinations" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
						  {"name" : "P3", "combinations" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
						  {"name" : "P4", "combinations" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}];
		var gameid = 1;
		var yatzygames = '[{"id" : '+gameid+', "players": '+ JSON.stringify(players) +',"open": true, "started" : false, "diceSet" : ' + JSON.stringify(currentDiceSet) + '}]';
		
		localStorage.setItem("yatzy-games", JSON.stringify(yatzygames));
	}

	// Variabel för våra yatzy spel
	var temp = JSON.parse(localStorage.getItem("yatzy-games"));
	temp = JSON.parse(temp);
	var yatzygames = $.grep(temp, function(n,i){
		return n.open;
	});

	if (yatzygames.length > 0){		
		// function sorting array numbers
		function sortOrder(a,b) {
			return b.id - a.id;
		}
		currentGame = yatzygames.sort(sortOrder)[yatzygames.length - 1];
		// localStorage.setItem("yatzi-games-current");
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

//Set a random number in the given index 
function setDiceRandomly(index){
	currentDiceSet[index] = randomDiceGenerator();
	currentGame.diceSet = currentDiceSet;
	//Set current game to avoid writing and reading from localstorage
	localStorage.setItem("yatzy-games-current", currentGame);
	// savedGames = localStorage.getItem("yatzy-games");
	savedGames[currentGame.id] = currentGame;
	loca.setItem("yatzy-games", savedGames);
}

//Add the combinations
function addCombinations(){
	// $("#playScore").append('<ul class="col-md-4 list-group">');
	$("#playCombinations").append('<li class="list-group-item">MAX</li>');
	$("#playCombinations").append(addOneCombination("1", [1,1,1,1,1,1]));
	$("#playCombinations").append(addOneCombination("2", [2,2,2,2,2,2]));
	$("#playCombinations").append(addOneCombination("3", [3,3,3,3,3,3]));
	$("#playCombinations").append(addOneCombination("4", [4,4,4,4,4,4]));
	$("#playCombinations").append(addOneCombination("5", [5,5,5,5,5,5]));
	$("#playCombinations").append(addOneCombination("6", [6,6,6,6,6,6]));
	$("#playCombinations").append('<li class="list-group-item combTitle">Total</li>');
	$("#playCombinations").append('<li class="list-group-item combTitle">Bonus</li>');
	$("#playCombinations").append(addOneCombination("Par", [6,6]));
	$("#playCombinations").append(addOneCombination("DoublePar", [6,6,5,5]));
	$("#playCombinations").append(addOneCombination("Triple", [6,6,6]));
	$("#playCombinations").append(addOneCombination("cQuatro", [6,6,6,6]));
	$("#playCombinations").append(addOneCombination("cFullHouse", [6,6,6,5,5]));
	$("#playCombinations").append('<li class="list-group-item combTitle">Yatzi</li>');
	$("#playCombinations").append('<li class="list-group-item combTitle">Chance</li>');
	// $("#playScore").append('</ul>');
}

function addOneCombination(id, dice){
	var s = '<li id="c' + id + '" class="list-group-item combTitle">';
	dice.forEach(function(die, i){
		s += '<div class="col-xs-2 col-md-2 dice dice-small dice-' + die + '"></div>';
	});
	s += '</li>';
	return s;
}

//Add a div element for each dice 
function addDiceClasses(){
	$("#playDice").html();
	currentDiceSet.forEach(function(die){
		$("#playDice").append('<div class="col-xs-2 col-md-2 dice dice-big dice-' + die + '"></div>')
	});
	$("#playDice").append('<div class="clearfix"></div>');
}

//Add the dice images
function setDiceImages(){
	for (var i = 1; i <= 6; i++) {
		$(".dice-" + i).append('<img src="images/die_' + i + '.png" />');
	};
}
function addDice(e, diceSet){
	diceSet.forEach(function(d,i){
		drawDie(e, d);
	});
}
function addDie (e, die) {
	e.append($(".dice-" + die));
}

function displayPlayersScore(){
	currentGame.players.forEach(function(p, i){
		var s = '<ul id="player' + p.name + '" class="col-xs-3 col-md-3 list-group">' +
					'<li class="list-group-item player">' + p.name + '</li>';
		p.combinations.forEach(function(c, i){
					s += '<li class="list-group-item comb c1">' + p.combinations[i] + '</li>';
		});
		s += "</ul>";
		$("#playersScore").append(s);
	});
}

$(document).ready(function(){
	loadSavedData();
	addCombinations();
	displayPlayersScore();
	addDiceClasses()
	setDiceImages();
});