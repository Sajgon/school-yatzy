var combos = {

	"Ettor" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 1){ points += 1; }
		}
		return points;
	},
	"Tvåor" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 2){ points += 2; }
		}
		return points;
	}

}


function runScoreTest(dices){

	var scores = {};

	for(var i in combos){
		scores[i] = combos[i](dices);
	}

	return scores;
}

function comboNames(){
	var arr = [];
	for(var i in combos){
		arr.push(i);
	}
	return arr;
}