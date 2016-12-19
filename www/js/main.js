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
		var players = new [{"name" : "P1", "combinations" : []},
						  {"name" : "P2", "combinations" : []},
						  {"name" : "P3", "combinations" : []},
						  {"name" : "P4", "combinations" : []}];
		var gameid = 1;
		var yatzygames = '{"'+gameid+'": {"players": '+ players +',"open": true, "started" : false, "diceSet", ' + currentDiceSet + '}}';
		
		localStorage.setItem("yatzy-games", yatzygames);
	}

	// Variabel för våra yatzy spel
	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	yatzygames = $.grep(yatzygames, function(n,i){
		return n.open;
	});

	if (yatzygames.length > 0){		
		// function sorting array numbers
		function sortOrder(a,b) {
			return b.gameid - a.gameid;
		}
		currentGame = yatzygames.sort(sortOrder)[ya.length - 1];
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


$(document).ready(function(){
	addCombinations();
	addDiceClasses()
	setDiceImages();
});