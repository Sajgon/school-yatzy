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
	
	drawTable();
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

function drawTable(){
	var head = '<thead>' + 
					'<tr id="playernames">' + 
						'<th>Max Poäng</th>';

	var players = [{id:1, name:"youssef", combinations : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}, {id:2, name:"", combinations : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}];//llllll

		players.forEach(function(v,i){
			head += '<th id="playerName'+ v.id +'" class="high-player">'+ v.name +'</th>';
		});
								
		head += '</tr></thead>';

		var tbody =  '<tbody>';

		for (var i = 0; i < 18; i++) {
			tbody += '<tr id="' + arrComboId[i] + '" class="comboBtn">' + 
			'<th scope="row">' + arrComboName[i] + '</th>';

			players.forEach(function(p,j){
				tbody += '<td>' + p.combinations[i] + '</td>';
			});
			tbody += '</tr>';
		};

		tbody += '</tbody>';

		$("#score-table").append(head+tbody);
};

var arrComboId = ['ettor', 'tvaor', 'treor', 'Fyror', 'femmor', 'sexor', 'summa', 'bonus', 'ettpar', 'tvapar', 'triss', 'fyrtal', 'litenstege', 'storstege', 'kak', 'chans', 'yatzy', 'total' ];
var arrComboName = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor', 'Summa', 'Bonus', 'Ett Par', 'Två Par', 'Triss', 'Fyrtal', 'Liten Stege', 'Stor Stege', 'Kåk', 'Chans', 'Yatzy!', 'Total'];



