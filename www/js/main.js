// global variables
// Run functions on DOM load

function fixNames(){

}

$(function (){
	
	// Add username
	$('#adduserBtn').click(function(){
		addUser();	
	});
	$("#usernameInput").keypress(function(e){
		if (e.which === 13) {
			addUser();				
		}
	});

	// Klick knapp
	$('#throwDices').click(function(){
		throwDice();
	});
	
	//Start the game 
	$('#startGame').click(function(){
		if(currentGame.players.length >= 1 ){
			setGameStarted();
		}
	});	
	
	$("#player-names").on("click", ".removePlayerBtn", function(){
		var id = parseInt(this.id.replace("playerNameList", ""));
		
		console.log("ID::");
		console.log(id);
		
		removeUser(id);
		loadPlayerNamesToList();
	});
	
	// End game button
	$('#endGameBtn').click(function(){
		endGame();
	});
	
	// Clean highscore
	$('#cleanHighscoreBtn').click(function(){
		removeHighscore();
	});
	
	$("body").on("click", ".tmpCombClick", function(){
		var id = $(this).data("id");
		confirmedComb(id);
	});
	
	$("#diceHolder").on("click", ".dice-free", function(){
		var id = parseInt(this.id.replace("diceHolder", ""));
		lockDie(id);
		setDiceClass();
	});

	$("#diceHolder").on("click", ".dice-locked", function(){
		var id = parseInt(this.id.replace("diceHolder", ""));
		unlockDie(id);
		setDiceClass();
	});

	$("body").on("click", ".comboBtn", function(){
		if($(this).hasClass("playableComb"))
			showRrowToClick(this.id);
		else
			showRrowToRemove(this.id);
	});
	$("body").on("click", ".closeModal", function(){
		$("#clickRowModal").modal('hide');
	});

	$("body").on("click", "#btnFinnish", function(){	
		$("#clickRowModal").remove();
		$(".modal-backdrop.fade.in").remove();
		// $("#throwDices").prop("disabled", true);
		endGame();	
	});

	$("body").on("click", "#undoMove", function(){
		if (gamesCurrentVersion > 0) {
			gamesCurrentVersion--;
			changeCurrentGameVesions();
		}
	});

	$("body").on("click", "#redoMove", function(){
		if (gameVersions.length > 0 && gamesCurrentVersion < gameVersions.length -1) {
			gamesCurrentVersion++;
			changeCurrentGameVesions();
		}
	});

	 $(window).scroll( function() {
        if ($(window).scrollTop() > $('#score-table').offset().top){
            $("#hiddenPlayersName").show();    		
        }
        else{
            $("#hiddenPlayersName").hide();
        }
    } );

	if (window.matchMedia('(max-width: 767px)').matches) {
        $("#wrapper").removeClass('toggled');
    };
	
	isLocalStorageKeys();
	
	// load playernames at start
	loadPlayerNamesToList();
	
	setFixedPlayersName();
	
	highscoreOutput();
});

function setFixedPlayersName(){
	var w0 = parseInt($('#score-table').css('width'));
    var w1 = parseInt($('#btnettor').css('width'));
    var wi = w0 - w1;
	var stl = 'float: left; margin: 0; padding: 7px; text-align: center; font-weight: bold;';
	var el = '<div style="' + stl + ' width: ' + (w1) + 'px;">Spelare</div>';
	
	for (var i = 0; i < currentGame.players.length; i++) {
		var style = stl;
		style += ' width: ' + (wi / currentGame.players.length) + 'px;';
		
		if(i === currentGame.currentPlayer)
			style += " background-color: #00dc5b;";

		el +=  '<div style="' + style + '">' + (currentGame.players[i].id + 1) + '. ' + currentGame.players[i].name + '</div>';
	};

	el += '<div class="clearfix"></div>';

   	$("#hiddenPlayersName").html(el);
    
    $("#hiddenPlayersName").hide();
}

//End current game
function endGame(){
	localStorage.removeItem("yatzy-game");
	isLocalStorageKeys();
	
	loadPlayerNamesToList();

	gamesCurrentVersion = 0;
	gameVersions = [];

	$(".beforegame").show();
	$(".ingame").hide();
	$(".ingameFooter").hide();
	$("#undoRedoBtns").hide();
}

//Add new User
function addUser(){
	username = $("#usernameInput").val();
	addUsernameToGameid(username);
	$("#usernameInput").val("");
	loadPlayerNamesToList();
}

function removeUser(id){
	currentGame.players.splice(id, 1);
	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
	setGameVersions();
}

// Remove high scores		
function removeHighscore(){
	localStorage.removeItem("yatzy-highscore");
	isLocalStorageKeys();
	highscoreOutput();
}

// Throw dice function
function throwDice(){
	for (var i = 1; i < 6; i++){
		if(currentGame.lockedDice.indexOf(i) === -1){
			currentGame.currentDice[i-1] = (randomDiceGenerator());
		}
	}
	
	// number of throws is now -1
	if(currentGame.nbrThrows > 0){
		currentGame.nbrThrows--;
	}
	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
	
	setGameVersions();

	// change button
	updateThrowButton();

	// show dice animation
	drawTable();	
	
	gifDice();

	// 
	setTimeout(function(){ 
		setDiceClass();
		displayPossibleCombinations();
	}, 800);
	
}

function updateThrowButton(){
	nbrThrowsLeft = 3 - currentGame.nbrThrows;
	$("#throwDices").text("Kasta tärningar " + nbrThrowsLeft + "/3");
	$("#throwDices").prop("disabled", (currentGame.nbrThrows < 1 ? true : false));
}

function lockDie(id){
	currentGame.lockedDice.push(id);
}

//Unlock die
function unlockDie(id){
	currentGame.lockedDice = jQuery.grep(currentGame.lockedDice, function(a){
		return a != id;
	});
}

function displayPossibleCombinations(){
	if (currentGame.currentDice.length > 0) {
		var staticArr = ["summa","bonus","total"];
		arrComboId.forEach(function(comb, i){
			displayOneCombination(comb, i);
		});

		$(".playableComb th span").addClass("glyphicon glyphicon-ok");
		$(".removableComb th span").addClass("glyphicon glyphicon-remove");
		$(".lockedCombinations th span").addClass("glyphicon glyphicon-minus");
	}
}

function displayOneCombination(comb, i){
	var s = getScore(comb);
	var pS = currentGame.players[currentGame.currentPlayer].combinations[i];
	var playedComb = currentGame.players[currentGame.currentPlayer].lockedCombinations;
	if(i !== 6 && i !== 7 && i !== 17){
		if (playedComb.indexOf(i) === -1) {
			if(s > 0){
				$("#" + comb).addClass("playableComb").addClass("comboBtn");
				$(".colPlayer-" + currentGame.currentPlayer + "-" + i).addClass("hightlightCol-green");
			}
			else{
				$("#" + comb).addClass("removableComb").addClass("comboBtn");
				$(".colPlayer-" + currentGame.currentPlayer + "-" + i).addClass("hightlightCol-red");
			}
		}else if(pS === 0){
				$("#" + comb).addClass("lockedCombinations");
				$(".colPlayer-" + currentGame.currentPlayer + "-" + i).addClass("hightlightCol-grey");
		}
	}
}

//Lock the specific die
function confirmedComb(id){
	console.log("chosed: " + id);
	$("#clickRowModal").modal('hide');
	handleOnePlay(id);
	$("#throwDices").prop("disabled", false);
}

// 
function handleOnePlay(combId){
	// gamesCurrentVersion = gameVersions.length + 1;

	var index = arrComboId.indexOf(combId);
	
	var player = currentGame.players[currentGame.currentPlayer];
	player.combinations[index] = getScore(combId);
	player.combinations = countCombinations(player.combinations);
	player.lockedCombinations.push(index);
	currentGame.players[currentGame.currentPlayer] = player;

	currentGame.nbrThrows = 3;
	currentGame.lockedDice = [];
	currentGame.currentPlayer++;
	if(currentGame.currentPlayer === currentGame.players.length){
		currentGame.currentPlayer = 0;
		currentGame.nbrRounds--;
	}

	currentGame.currentDice = [];

	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));

	setGameVersions();


	drawTable();
	
	setDiceClass();

	updateThrowButton();

	if (currentGame.nbrRounds === 0) {
		handleEndGame();
	};
}

function handleEndGame(){
	var winner = '';
	var scoreArr = [];
	var players = currentGame.players;

	players.sort(function(a,b){
		return b.combinations[17] - a.combinations[17];
	});

	var highscore = 0;
	players.forEach(function(player, i){
		var s = player.combinations[17];
		scoreArr.push(s);
		if (s > highscore) {
			highscore = s;
			winner = player.name;
		};
	}); 

	scoreArr.sort(function(a,b){ return b- a;});	
	displayGameResult(players, scoreArr, winner);
	
	
	// add result to highscore object
	for(var i = 0; i < scoreArr.length; i++){
		// Uppdatera highscore med
		updateHighscore(scoreArr[i], players[i].name);
	}
	
}

function displayGameResult(players, scoreArr, winner){
	var modalHead = scoreArr[0] > scoreArr[1] ? ('Grattis ' + winner + '! Du vann med poängen '+ scoreArr[0]) : 'Ingen vinnare.';
	
	var modalBody = '<ul>';
	players.forEach(function(pl, i){
		modalBody += '<li>'+ (i + 1) + '. ' + pl.name + ': ' + pl.combinations[17] +'</li>';
	});
	modalBody += '</ul>';
	//var modalFooter = '<span class="closeModal">Stäng</span>';
	var modalFooter = '<button id="btnFinnish" type="button" class="btn btn-success" aria-label="Left Align">Stäng</button>';
	showInModal(modalHead, modalBody, modalFooter);
}


function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}

//
function setDiceClass(){
	// utf-8 characters for dice faces
	$("#diceHolder").html("");
	if (currentGame.currentDice.length > 0) {
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
		};
	}
}

/*	Function to view a GIF image for 1.5 seconds */
function gifDice(){
	
	$("#diceHolder").html("");
	for(var i = 1; i <= 5; i++){
		var classToAdd = " dice-space-" + currentGame.currentDice[i-1];
		classToAdd += i === 1 ? " col-xs-offset-1" : "";
		classToAdd += currentGame.lockedDice.indexOf(i) > -1 ? " dice-locked" : " dice-free";
		var dieH = '<div id="diceHolder' + i + '" class="col-xs-2 dice-space' + classToAdd + '">';

		// view dice animation 
		fullDiceImage =  '<img src="images/';
		fullDiceImage += currentGame.lockedDice.indexOf(i) > -1 ? 'die_'+currentGame.currentDice[i-1]+'locked.png">' : 'dicegif.gif">';
		dieH += fullDiceImage;
		dieH += '</div>'
		$("#diceHolder").append(dieH);
	}
}

/*	Function to draw table combinations, scores and playernames */
function drawTable(){
	var head = '<thead id="fixedHead">' + 
				'<tr id="playernames">' + 
				'<th>Spelare</th>';

	$("#diceHolder").empty();
	
	currentGame.players.forEach(function(v,i){
		pos = i +1;
		var classPlayer = v.id === currentGame.currentPlayer ? ' class="high-player" ': '';
		head += '<th' + classPlayer + '>'+ pos + ". " + v.name +'</th>';
	});
							
	head += '</tr></thead>';

	var tbody =  '<tbody>';
	for (var i = 0; i < 18; i++) {
		tbody += '<tr id="' + arrComboId[i] + '" class="">' + 
		'<th id="btn' + arrComboId[i] + '" scope="row" class="col-xs-6 col-md-6 btn btn-default"><span class="col-xs-1 col-md-1"></span>' + arrComboName[i] + '</th>';

		currentGame.players.forEach(function(p,j){
			var c =   p.combinations[i] > 0 ? p.combinations[i] + "" : (p.lockedCombinations.indexOf(i) === -1 ?  '-' : '0');
			tbody += '<td class="colPlayer-' + j + '-' + i + '">' + c + '</td>';
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
	var title = 'Tryck på knappen för att bekräffta. Annars var som helst på skärmen för att välja en annan...';
	showRow(element, title, 'cmbClickGreen');
}

function showRrowToRemove(element){
	var title = 'Tryck på knappen för att Stryka vald kombination. Annars var som helst på skärmen för att välja en annan.';
	showRow(element, title, 'cmbClickRed');
}

function showRow(element, title, btnColor){
	var combName = $("#" + element + " th").html();
	var modalBody = '<table><tbody><tr class="row">' +
						'<th data-id="' + element + '" class="col-xs-12 btn btn-default tmpCombClick ' + btnColor + '">' + combName + '</th>';+
						'<td class="col-xs-12 btn btn-danger">Stäng</td>';+
					 '</tr></tbody></table>';
	showInModal(title, modalBody, '');
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
	var pNbr = currentGame.players.length;
	// make sure to clean UL before we add new list items
	$("#player-names").empty();
	console.log(currentGame);
	
	$("#startGame").prop("disabled", (pNbr < 2));
	// $("#continueGame").prop("disabled", (true));
	
	currentGame.players.forEach(function(player, i){		
		var playerPosition = i+1;
		var playerPositionString = playerPosition + "-  ";
		
		addLiUsername = '<li class="col-md-12 clearfix">' + playerPositionString + '<span class="playerName">' + player.name + '</span>' + 
						'<span id="playerNameList' +  i + 
						'" class="glyphicon glyphicon-remove removePlayerBtn pull-right" aria-hidden="true"></span></li>';
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

		setGameVersions();
		
		drawTable();
		
		// Visa korrekta element
		$(".beforegame").hide();
		$(".ingame").show();
		$(".ingameFooter").show();
		
		// Tillåt ångra är valt.
		if($('#allowRegret').is(':checked')){
			$("#undoRedoBtns").show();
		}
		
		
		updateUndoRedoButtons();

		drawTable();

		// draw dice	
		setDiceClass();

		// change button
		updateThrowButton();

		// display possible combination
		displayPossibleCombinations();
		return true;
	}
		
	return false;
}

function updateUndoRedoButtons(){	
	if (gamesCurrentVersion === 0) {
		$("#undoMove").prop("disabled", true);
		$("#undoMove").addClass("arrowDisabled");		
	}
	else {
		$("#undoMove").prop("disabled", false);
		$("#undoMove").removeClass("arrowDisabled");		
	};

	if ((gameVersions.length === 0) || (gamesCurrentVersion === gameVersions.length - 1)) {
		$("#redoMove").prop("disabled", true);
		$("#redoMove").addClass("arrowDisabled");
	}
	else{
		$("#redoMove").prop("disabled", false);
		$("#redoMove").removeClass("arrowDisabled");
	}
}

function changeCurrentGameVesions(){
	var game = gameVersions[gamesCurrentVersion];
	currentGame = jQuery.extend(true, {}, game);
	localStorage.setItem("yatzy-game", JSON.stringify(currentGame));
	
	updateUndoRedoButtons();

	// show dice animation
	drawTable();	
	
	// draw dice	
	setDiceClass();

	// change button
	updateThrowButton();

	// display possible combination
	displayPossibleCombinations();
}
