// global variables
// Run functions on DOM load

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

	/*
	// playernames header fixed top
	$(window).scroll( function() {
        if ($(window).scrollTop() > $('#score-table').offset().top){
            $("#hiddenPlayersName").show();    		
        }
        else{
            $("#hiddenPlayersName").hide();
        }
    });
	*/

	if (window.matchMedia('(max-width: 767px)').matches) {
        $("#wrapper").removeClass('toggled');
    };
	
	isLocalStorageKeys();
	
	// load playernames at start
	loadPlayerNamesToList();
	
	setFixedPlayersName();
	
	highscoreOutput();
});


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

function setGameVersions(){
	var gameVersion = JSON.parse(localStorage.getItem("yatzy-game"));
	if(gameVersion.started){
		if(gameVersions.length > 0 && gamesCurrentVersion < gameVersions.length - 1){
			gameVersions.splice(gamesCurrentVersion + 1);
		}

		// var tmp = { currentDice: currentGame.currentDice, players:currentGame.players, nbrThrows: currentGame.nbrThrows, started: currentGame.started,
		//  currentPlayer: currentGame.currentPlayer, lockedDice: currentGame.lockedDice, nbrRounds: currentGame.nbrThrows};
		var tmp = jQuery.extend(true, {}, gameVersion);
		gameVersions.push(tmp);
		gamesCurrentVersion = gameVersions.length - 1;

		$("#undoMove").prop("disabled", (gamesCurrentVersion < 1));
		$("#redoMove").prop("disabled", (gamesCurrentVersion >= gameVersions.length - 1));

		updateUndoRedoButtons();
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
