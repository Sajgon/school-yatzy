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
	},
	"Treor" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 3){ points += 3; }
		}
		return points;
	},
	"Fyror" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 4){ points += 4; }
		}
		return points;
	},
	"Femmor" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 5){ points += 5; }
		}
		return points;
	},
	"Sexor" : function(dices){
		var points = 0;
		for(var i = 0; i < 5; i++){
			if(dices[i] == 6){ points += 6; }
		}
		return points;
	},
	"Liten stege": function(dices){
		if(
			dices.indexOf(1) >= 0 && 
			dices.indexOf(2) >= 0 && 
			dices.indexOf(3) >= 0 && 
			dices.indexOf(4) >= 0 && 
			dices.indexOf(5) >= 0
		){
			return 15;
		}
		return 0;
	},
	"Stor stege": function(dices){
		if(
			dices.indexOf(2) >= 0 && 
			dices.indexOf(3) >= 0 && 
			dices.indexOf(4) >= 0 && 
			dices.indexOf(5) >= 0 && 
			dices.indexOf(6) >= 0
		){
			return 20;
		}
		return 0;
	},
	"Kåk": function(dices){
		var points = 0;
		var amounts = [0,0,0,0,0,0];
		
		for(var i = 0; i < 5; i++){
			if(dices[i] == 1){
				amounts[0]++;
			}else if(dices[i] == 2){
				amounts[1]++;
			}else if(dices[i] == 3){
				amounts[2]++;
			}else if(dices[i] == 4){
				amounts[3]++;
			}else if(dices[i] == 5){
				amounts[4]++;
			}else if(dices[i] == 6){
				amounts[5]++;
			}
		}
		
		var TwoOfSame = false;
		var ThreeOfSame = false;
		
		// Find two and three of the same amount
		for(var i = 0; i < amounts.length; i++){
			if(amounts[i] == 2){
				TwoOfSame = true;
				
				points += (i + 1) * 2;
			}
			
			if(amounts[i] == 3){
				ThreeOfSame = true;
				
				points += (i + 1) * 3;
			}
		}
		
		
		
		
		//return amounts;
		//return TwoOfSame + " " + ThreeOfSame;
		
		if(TwoOfSame && ThreeOfSame){
			return points;
		}else{
			return 0;
		}
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