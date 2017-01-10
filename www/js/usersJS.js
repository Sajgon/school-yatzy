
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
