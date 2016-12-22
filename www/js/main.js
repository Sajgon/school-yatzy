// global variables
// Run functions on DOM load
$(function (){
	
	// Klick knapp
	$('#throwDices').click(function(){
		for (var i = 1; i < 6; i++){
			if(currentGame.lockedDice.indexOf(i) === -1){
				currentGame.currentDice[i-1] = (randomDiceGenerator());
			}
		}
		currentGame.nbrThrows--;
		localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
		// You can call show dices anywhere
		drawTable();
		setDiceClass();
		// showDices();
		// scores = runScoreTest(arrDice);
		displayPossibleCombinations();
		$("#throwDices").prop("disabled", (currentGame.nbrThrows < 1 ? true : false));
		//console.log(scores);
	});
	
	$('#startGame').click(function(){
		
		// check that atleast 1 player is added to the playernames
		
		if(currentGame.players.length >= 1 ){
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

	// End game button
	$('#endGameBtn').click(function(){
		
		function endGame(){
			localStorage.removeItem("yatzy-game");
			// $("#player-names").empty();
			isLocalStorageKeys();
			
			loadPlayerNamesToList()
			
			$(".beforegame").show();
			$(".ingame").hide();
			$(".ingameFooter").hide();
		}

		endGame();
	});
	
	// Clean highscore
	$('#cleanHighscoreBtn').click(function(){
		
		function removeHighscore(){
			localStorage.removeItem("yatzy-highscore");
			isLocalStorageKeys();
			highscoreOutput();
		}

		removeHighscore();
	});
	
	$("body").on("click", ".tmpCombClick", function(){
		var confirmedComb = $(this).data("id");
		console.log("chosed: " + confirmedComb);
		$("#clickRowModal").modal('hide');
		handlePlayerDone(confirmedComb);
		$("#throwDices").prop("disabled", false);
	});
	
	$("#diceHolder").on("click", ".dice-free", function(){
		var id = parseInt(this.id.replace("diceHolder", ""));
		currentGame.lockedDice.push(id);
		// $(this).replaceClass("dice-free", "dice-locked");
		// showDices()
		setDiceClass();
	});

	$("#diceHolder").on("click", ".dice-locked", function(){
		var id = parseInt(this.id.replace("diceHolder", ""));
		currentGame.lockedDice = jQuery.grep(currentGame.lockedDice, function(a){
			return a != id;
		});
		// showDices();
		setDiceClass();
	});

	$("body").on("click", ".comboBtn", function(){
		if($(this).hasClass("playableComb"))
			showRrowToClick(this.id);
		else
			showRrowToRemove(this.id);
	});

	isLocalStorageKeys();
	
	// load playernames at start
	loadPlayerNamesToList();
	highscoreOutput();
	
	
});

// 
function handlePlayerDone(combId){
	var index = arrComboId.indexOf(combId);
	var combinations = currentGame.players[currentGame.currentPlayer].combinations;
	combinations[index] = updateScore(combId);
	// if(currentGame.players[cu.currentPlayer].lockedCombinations.indexOf(combId) > -1)
	// 	currentGame.players[currentGame.currentPlayer].combinations = 0;
	// else	
	currentGame.players[currentGame.currentPlayer].combinations = countCombinations(combinations);
	currentGame.players[currentGame.currentPlayer].lockedCombinations.push(combId);
	currentGame.nbrThrows = 3;
	currentGame.currentPlayer++;
	currentGame.lockedDice = [];
	if(currentGame.currentPlayer === currentGame.players.length){
		currentGame.currentPlayer = 0;
		currentGame.nbrRounds--;
	}

	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));

	drawTable();
	setDiceClass();
	if (currentGame.nbrRounds === 0) {
		handleEndGame();
	};
}

function handleEndGame(){
	var winner = '';
	var hs = 0;
	var hsArr = [];
	var p = currentGame.players;
	for (var i = 0; i < p.length; i++) {
		var s = p[i].combinations[17];
		hsArr.push(s);
		if (s > hs) {
			hs = s;
			winner = p[i].name;
		};
	};
	p.sort(function(a,b){
		return b.combinations[17] - a.combinations[17];
	});
	hsArr.sort(function(a,b){ return b- a;});
	
	var modalHead = hsArr[0] > hsArr[1] ? ('Grattis ' + winner + '! Du vann med '+ hs + ' pöang') : 'Ingen vinnare.';
	var modalBody = '<ul>';
	p.forEach(function(pl, i){
		modalBody += '<li>'+ (i+1) + '. '+ pl.name + ': ' + pl.combinations[17] +'</li>';
	});
	modalBody += '</ul>';
	showInModal(modalHead, modalBody, '');
}
// 
function displayPossibleCombinations(){
	var staticArr = ["summa","bonus","total"];
	arrComboId.forEach(function(comb, i){
		var s = updateScore(comb);
		if(s > 0 && currentGame.players[currentGame.currentPlayer].combinations[i] === 0){
			$("#" + comb).addClass("playableComb").addClass("comboBtn");
		}else if(staticArr.indexOf(comb) === -1){
			$("#" + comb).addClass("removableComb").addClass("comboBtn");
		}
		// currentGame.players[currentGame.currentPlayer].lockedCombinations.forEach(function(c, i){
		// 	$("#" + c).addClass("expiredComb");
		// });
	});
}

function setDiceClass(){
	// utf-8 characters for dice faces
	$("#diceHolder").html("");
	for(var i = 1; i <= 5; i++){
		var classToAdd = " dice-space-" + currentGame.currentDice[i-1];
		classToAdd += i === 1 ? " col-xs-offset-1" : "";
		classToAdd += currentGame.lockedDice.indexOf(i) > -1 ? " dice-locked" : " dice-free";
		var dieH = '<div id="diceHolder' + i + '" class="col-xs-2 dice-space' + classToAdd + '">';

		var fullDiceImage =  '<img src="images/die_' + currentGame.currentDice[i-1];
		fullDiceImage += currentGame.lockedDice.indexOf(i) > -1 ? 'locked.png">' : '.png">';
		dieH += fullDiceImage;
		dieH += '</div>'
		$("#diceHolder").append(dieH);

	}
}

function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}

function loadPlayerNamesToList(){
	if(currentGame.players.length){
		
		// make sure to clean UL before we add new list items
		$("#player-names").empty();
		
		for(var i = 0; i < currentGame.players.length; i++){
			
			var playerPosition = i+1;
			var playerPositionString = playerPosition + ". ";
			
			addLiUsername = '<li class="row">' + playerPositionString + currentGame.players[i]+"<span class='glyphicon glyphicon-remove removeButton pull-right' aria-hidden='true'></span></li>"
			$("#player-names").append(addLiUsername);
			$("#startGame").prop("disabled", false);
		}
		
	}
}

/*	Function to draw table combinations, scores and playernames */
function drawTable(){
	var head = '<thead>' + 
	'<tr id="playernames">' + 
	'<th>Spelare</th>';

		// var players = [{id:1, name:"youssef", combinations : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}, {id:2, name:"", combinations : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}];//llllll

		currentGame.players.forEach(function(v,i){
			var classPlayer = v.id === currentGame.currentPlayer ? '" class="high-player" ': "";
			head += '<th id="playerName'+ v.id + '"' + classPlayer + ' >'+ v.name +'</th>';
		});
								
		head += '</tr></thead>';

		var tbody =  '<tbody>';
		for (var i = 0; i < 18; i++) {
			tbody += '<tr id="' + arrComboId[i] + '" class="">' + 
			'<th id="btn' + arrComboId[i] + '" scope="row" class="col-xs-12 col-md-12 btn btn-default">' + arrComboName[i] + '</th>';

			currentGame.players.forEach(function(p,j){
				var c = p.lockedCombinations.indexOf(arrComboId[i] === -1) ?  p.combinations[i] +'' : '-';
				tbody += '<td>' + c + '</td>';
			});
			tbody += '</tr>';
		};

		tbody += '</tbody>';

		$("#score-table").html("");
		$("#score-table").append(head+tbody);

};

var arrComboId = ['ettor', 'tvaor', 'treor', 'fyror', 'femmor', 'sexor', 'summa', 'bonus', 'ettpar', 'tvapar', 'triss', 'fyrtal', 'litenstege', 'storstege', 'kak', 'chans', 'yatzy', 'total' ];
var arrComboName = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor', 'Summa', 'Bonus', 'Ett Par', 'Två Par', 'Triss', 'Fyrtal', 'Liten Stege', 'Stor Stege', 'Kåk', 'Chans', 'Yatzy!', 'Total'];


function showRrowToClick(element){
	var combName = $("#" + element + " th").html();
	var modalHead = 'Tryck på knappen för att bekräffta.. Annars var som helst på skärmen för att välja en annan...';
	var modalBody = '<table><tbody><tr class="row">' +
	      									'<th data-id="' + element + '" class="col-xs-12 btn btn-default tmpCombClick cmbClickGreen">' + combName + '</th>';+
	      									'<td class="col-xs-12 btn btn-danger">Stäng</td>';+
	      								 '</tr></tbody></table>';
	showInModal(modalHead, modalBody, '');
}

function showRrowToRemove(element){
	var combName = $("#" + element + " th").html();
	var modalHead = 'Tryck på knappen för att bekräffta. Annars var som helst på skärmen för att välja en annan.';
	var modalBody = '<table><tbody><tr class="row">' +
	      									'<th data-id="' + element + '" class="col-xs-12 btn btn-default tmpCombClick cmbClickRed">' + combName + '</th>';+
	      									'<td class="col-xs-12 btn btn-danger">Stäng</td>';+
	      								 '</tr></tbody></table>';
	showInModal(modalHead, modalBody, '');
}

// add a user to local storage
function addUsernameToGameid(username){
	// get localstorage object
	//var yatzygames = JSON.parse(localStorage.getItem("yatzy-games"));
	currentGame = JSON.parse(localStorage.getItem("yatzy-game"));
	
	// validate username & gameid input
	if(username.length >= 1 && username.length <= 12){
		if(currentGame.players.length < 4){
			
			// Visa att knappen är klickbar
			$("#adduserBtn").prop("disabled", false);
			
			// push username to object
			var newPlayer = { id: currentGame.players.length, name: username, combinations : generatCombinations(), lockedCombinations : []};
			currentGame.players.push(newPlayer);
			// push yatzygames to localStorage
			localStorage.setItem("yatzy-game", JSON.stringify(currentGame));

			$("#warningAlert").hide();
			
			// if maximum players length has been reached
			if(currentGame.players.length == 4){
				// disable "lägg till användare" knapp
				$("#adduserBtn").prop("disabled", true);
			}
			
			return true;
		}
		
		// Error: we couldnt find username object from localstorage
		return false;	
	}
	else{
		// Inget användarnamn inskrivet eller mer än maxlängd 12
		// retunera felmeddelande

		$("#warningAlert").show();
	}
	
	return false;
}

function loadPlayerNamesToList(){
	// make sure to clean UL before we add new list items
	$("#player-names").empty();

	console.log(currentGame);
	
	if(currentGame.players.length){
		$("#startGame").prop("disabled", false);
		$("#continueGame").prop("disabled", false);
	}
	
	currentGame.players.forEach(function(player, i){		
		var playerPosition = i+1;
		var playerPositionString = playerPosition + ". ";
		
		addLiUsername = "<li>" + playerPositionString + player.name +" <span class='glyphicon glyphicon-remove removePlayerBtn' aria-hidden='true'></span></li>"
		$("#player-names").append(addLiUsername);
	});
	
}

// changed status "started" to true when button "STARTA SPEL" is pressed
function setGameStarted(){
	
	if(currentGame !==  null){
		// set started to true
		currentGame.started = true;
		
		// set game to started in localStorage
		localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
		
		drawTable();
		
		// Visa korrekta element
		$(".beforegame").hide();
		$(".ingame").show();
		$(".ingameFooter").show();
			
		return true;
	}
		
	return false;
}