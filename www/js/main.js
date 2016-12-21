// Write dice array to DOM
function showDices(diceArray){
	// utf-8 characters for dice faces
	var diceChars = ["die_1locked","die_2","die_3","die_4locked","die_5","die_6"];

	// loop through our dice array with dice values and output dice characters
	for(var i = 0; i < diceArray.length; i++){
		var diceImage = diceChars[diceArray[i] - 1] + ".png";
		var fullDiceImage = "<img src='images/"+diceImage+"'>";
		$('.dice-space-' + (i+1)).html(fullDiceImage);
	}
}

function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}

function loadPlayerNamesToList(){
	currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
		
	// make sure to clean UL before we add new list items
	$("#player-names").empty();
	
	currentGame.players.forEach(function(player, i){			
		var playerPosition = i+1;
		var playerPositionString = playerPosition + "- ";
		
		addLiUsername = "<li>" + playerPositionString + player +"</li>";
		$("#player-names").append(addLiUsername);
	});

	if (currentGame.length > 0) {
		$("#startGame").prop("disabled", true);
		$("#continueGame").prop("disabled", false);
	};
	
}


// Run functions on DOM load
$(function (){
	
	$('#throwDices').click(function(){
		var arrDice = [];
		for (var i = 0; i < 5; i++){
			arrDice.push(randomDiceGenerator());
		}		
		currentGame.currentDice = arrDice;

		// You can call show dices anywhere
		showDices(arrDice);
		scores = runScoreTest(arrDice);
		currentGame.currentDice = arrDice;
		console.log(scores);
	});
	
	$('#startGame').click(function(){
		
		// check that atleast 1 player is added to the playernames
		currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
		
		if(currentGame.playes.length >= 1 ){
			// call function to set game started
			drawTable();//Youssef's new generat html function
		}
	});
	
	
	// Add username
	$('#adduserBtn').click(function(){
		username = $("#usernameInput").val();
		addUsernameToGameid(username);
		
		loadPlayerNamesToList();
		$("#usernameInput").val("");
	});

	// load playernames at start
	loadPlayerNamesToList();
	highscoreOutput();
	
});


//Ben
function showPlayableCombinations(){
	diceHand = currentGame.dice
	playCombi.forEach(function(comb, i){

	});
}
