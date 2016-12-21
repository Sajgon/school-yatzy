// Write dice array to DOM
function showDices(diceArray){
	// utf-8 characters for dice faces
	var diceChars = ["die_1","die_2","die_3","die_4","die_5","die_6"];

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
	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	if(yatzygames["game"].playernames.length){
		
		// make sure to clean UL before we add new list items
		$("#player-names").empty();
		
		for(var i = 0; i < yatzygames["game"].playernames.length; i++){
			
			var playerPosition = i+1;
			var playerPositionString = playerPosition + ". ";
			
			addLiUsername = "<li>" + playerPositionString + yatzygames["game"].playernames[i]+"</li>"
			$("#player-names").append(addLiUsername);
			$("#startGame").prop("disabled", false);
		}
		
	}
}


// Run functions on DOM load
$(function (){
	
	$('#throwDices').click(function(){
		var arrDice = [];
		for (var i = 0; i < 5; i++){
			arrDice.push(randomDiceGenerator());
		}
		
		// You can call show dices anywhere
		showDices(arrDice);
		scores = runScoreTest(arrDice);
		
		console.log(scores);
	});
	
	$('#startGame').click(function(){
		
		// check that atleast 1 player is added to the playernames
		var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
		
		if(yatzygames["game"].playernames.length >= 1 ){
			// call function to set game started
			setGameStarted();
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



