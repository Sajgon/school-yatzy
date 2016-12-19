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

function loadPlayerNamesToLi(){
	var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	if(yatzygames["1"].playernames.length){
		
		for(var i = 0; i < yatzygames["1"].playernames.length; i++){
			addLiUsername = "<li>"+yatzygames["1"].playernames[i]+"</li>"
			$("#player-names").append(addLiUsername);
		}
		
	}
}


// Run showDices on DOM load
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
		$(".beforegame").hide();
		$(".ingame").show();
		
	});
	
	$('#adduserBtn').click(function(){
		username = $("#usernameInput").val();
		addUsernameToGameid(username, "1");
		
		loadPlayerNamesToLi();
	});

	// load playernames at start
	loadPlayerNamesToLi();
	
});



