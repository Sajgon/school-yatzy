
var arrComboId = ['ettor', 'tvaor', 'treor', 'fyror', 'femmor', 'sexor', 'summa', 'bonus', 'ettpar', 'tvapar', 'triss', 'fyrtal', 'litenstege', 'storstege', 'kak', 'chans', 'yatzy', 'total' ];
var arrComboName = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor', 'Summa', 'Bonus', 'Ett Par', 'Två Par', 'Triss', 'Fyrtal', 'Liten Stege', 'Stor Stege', 'Kåk', 'Chans', 'Yatzy!', 'Total'];

function generatCombinations(){
	// Length 18
	return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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