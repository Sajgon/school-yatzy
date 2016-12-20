// // Write dice array to DOM
// function showDices(diceArray){
// 	// utf-8 characters for dice faces
// 	var diceChars = ["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"];

// 	// loop through our dice array with dice values and output dice characters
// 	for(var i = 0; i < diceArray.length; i++){
// 		$('.dice-space-' + (i+1)).html(diceChars[diceArray[i] - 1]);
// 	}


// }

function emptyCombinations(){
	return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}

//Ben
currentDiceSet = [1,2,3,4,5,6];
openedGames = [];
currentGame = {};

function loadSavedData(){
	if(!localStorage.getItem("yatzy-games")){
		var players = [{"id" : 0, "name" : "+", "combinations" : emptyCombinations()},
						  {"id" : 1, "name" : "+", "combinations" : emptyCombinations()},
						  {"id" : 2, "name" : "+", "combinations" : emptyCombinations()},
						  {"id" : 3, "name" : "+", "combinations" : emptyCombinations()}];
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

function saveData(){	
	var savedGames = localStorage.getItem("yatzy-games");
	savedGames[currentGame.id] = currentGame;
	localStorage.setItem("yatzy-games", savedGames);
}

//Add the combinations
function setCombinations(){
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

	function addOneCombination(id, dice){
		var s = '<li id="c' + id + '" class="list-group-item combTitle">';
		dice.forEach(function(die, i){
			s += '<div class="col-xs-2 col-md-2 dice dice-small dice-' + die + '"></div>';
		});
		s += '</li>';
		return s;
	}
}

//Add a div element for each dice in the play set
function setOrUpdatePlayDice(){
	$("#playDice").html("");
	currentDiceSet.forEach(function(die, i){
		$("#playDice").append('<div id="playDie' + i + '" class="col-xs-2 col-md-2 dice dice-free dice-' + die + '"></div>')
	});
	$("#playDice").append('<div class="clearfix"></div>');
}

//Add the dice images to all dice-n classes
function setDiceImages(){
	for (var i = 1; i <= 6; i++) {
		$(".dice-" + i).html("");
		$(".dice-" + i).append('<img src="images/die_' + i + '.png" />');
	};
}

//Draw the scores for all players
function displayCurrentGame(){
	currentGame.players.forEach(function(p, i){
		var s = '<ul id="player' + p.id + '" class="col-xs-3 col-md-3 list-group">' +
					'<li class="list-group-item player">' + p.name + '</li>';
		p.combinations.forEach(function(c, i){
					s += '<li class="list-group-item comb c1">' + p.combinations[i] + '</li>';
		});
		s += "</ul>";
		$("#playersScore").append(s);
	});
}

//Set a random number in the given index 
function setDiceRandomly(index){
	currentDiceSet[index] = randomDiceGenerator();
	currentGame.diceSet = currentDiceSet;
	saveData();
}

function throwDice(){
	$(".dice-free").each(function(){
		var index = parseInt(this.id.replace("playDie", ""));
		setDiceRandomly(index);
	});
}


$(document).ready(function(){
	loadSavedData();
	setCombinations();
	displayCurrentGame();
	setOrUpdatePlayDice();
	setDiceImages();

	$("#playButton").click(function(){
		throwDice();
		setOrUpdatePlayDice();
		setDiceImages();
	});

	$("#playDice").on("click", ".dice-free", function(){
			$(this).removeClass("dice-free").addClass("dice-chosed");
		});
	$("#playDice").on("click", ".dice-chosed", function(){
			$(this).removeClass("dice-chosed").addClass("dice-free");
		});
	$("#playersScore").on("click", ".player", function(){
		var name = prompt("Player's name:", "Player 1");
		$(this).text(name);
		var newPlayer = {"id" : currentGame.players.length, "name" : name, "combinations" : emptyCombinations()};
		currentGame.players.push(newPlayer);
		saveData();
	})
});


function rotateDice(){
	$(".dice-free").each(function(){
		rotateDie(this.id);
	});
}

function rotateDie(id){
	$("#playDie"+ id).rotate({
	  bind: {
	    click: function(){
	      $("#playDie"+ id).rotate({
	        angle: 0,
	        animateTo: 180,
	        duration: 6000
	      });
	      setTimeout(function(){
	        $("#playDie"+ id).stopRotate();
	      }, 1000);
	    }
	  }
	});
}


// function bindEvents(){
// 		$(".dice-free").click(function(){
// 			$(this).removeClass("dice-free").addClass("dice-chosed");
// 		});

// 		$(".dice-chosed").click(function(){
// 			$(this).removeClass("dice-chosed").addClass("dice-free");
// 		});
// }