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
	"Ett par" : function(dices){
		var amounts = amountSameNumbers(dices);
		var points = 0;
		
		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
			
		//	console.log("amount: " + amount);
			
			if(amounts[diceNumber] >= 2){
				points = diceNumber * 2;
				// break;
			}
		}
		
		return points;
	},
	"Två par" : function(dices){
		var amounts = amountSameNumbers(dices);
		var points = 0;
		var pairs = 0;
		
		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
			
			if(pairs <= 2){
				if(amounts[diceNumber] >= 2){
					points += diceNumber * 2;
					pairs += 1;
				}
			}else{
				break;
			}
		}
		
		if(pairs == 2){
			return points;
		}else{
			return 0;
		}
		
	},
	"Triss" : function(dices){
		// Tre av en siffra
		var amounts = amountSameNumbers(dices);
		var points = 0;
		
		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
		
			if(amounts[diceNumber] >= 3){
				points = diceNumber * 3;
			}
		}
		
		return points;
	},
	"Fyrtal" : function(dices){
		// Fyra av ett nummer
		var amounts = amountSameNumbers(dices);
		var points = 0;
		
		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
		
			if(amounts[diceNumber] >= 4){
				points = diceNumber * 4;
			}
		}
		
		return points;
	},
	"Chans" : function(dices){
		// Fyra av ett nummer
		var amounts = amountSameNumbers(dices);
		var points = 0;
		
		
		for(var i = 0; i < dices.length; i++){
			points += dices[i];
		}
		
		return points;
	},
	"Yatzy!" : function(dices){
		// Fyra av ett nummer
		var amounts = amountSameNumbers(dices);
		var points = 0;
		
		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
		
			if(amounts[diceNumber] == 5){
				points = 50; // Bonus poäng för yazty
			}
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
		// ingångsvariablar
		var points = 0;
		var TwoOfSame = false;
		var ThreeOfSame = false;
		
		// Spara värdet från vår funktion
		var amounts = amountSameNumbers(dices);

		// Find two and three of the same amount
		for(var diceNumber in amounts){
			amount = amounts[diceNumber];
			if(amount == 2){
				points += amount * diceNumber;
				TwoOfSame = true;
			}
			if(amount == 3){
				points += amount * diceNumber;
				ThreeOfSame = true;
			}
		}
		
		if(!TwoOfSame || !ThreeOfSame){ return 0; }
		
		return points;
	}
	
	
	
}


function printValues(scores){

	// Printa Antalet poäng
	$($('#ettor').children()[1]).html(scores["Ettor"]);
	$($('#tvaor').children()[1]).html(scores["Tvåor"]);
	$($('#treor').children()[1]).html(scores["Treor"]);
	$($('#fyror').children()[1]).html(scores["Fyror"]);
	$($('#chans').children()[1]).html(scores["Chans"]);
	$($('#ettpar').children()[1]).html(scores["Ett par"]);
	$($('#femmor').children()[1]).html(scores["Femmor"]);
	
	$($('#fyrtal').children()[1]).html(scores["Fyrtal"]);
	$($('#kak').children()[1]).html(scores["Kåk"]);
	$($('#litenstege').children()[1]).html(scores["Liten stege"]);
	$($('#sexor').children()[1]).html(scores["Sexor"]);
	$($('#storstege').children()[1]).html(scores["Stor stege"]);
	
	$($('#triss').children()[1]).html(scores["Triss"]);
	$($('#tvapar').children()[1]).html(scores["Två par"]);
	$($('#yatzy').children()[1]).html(scores["Yatzy!"]);
	
}


function runScoreTest(dices){

	var scores = {};

	for(var i in combos){
		scores[i] = combos[i](dices);
	}

	// Kalla funktion
	printValues(scores);
	
	return scores;
}

// Funktion som retunerar alla namn från objektet "combos"
function comboNames(){
	var arr = [];
	for(var i in combos){
		arr.push(i);
	}
	return arr;
}

// Funktion som retunerar antal av varje siffra från 1 till 6
function amountSameNumbers(dices){
	// Antal av varje siffra från 6 till 1
	var amounts = {"6":0, "5":0, "4":0, "3":0, "2":0, "1":0};

	for(var i = 0; i < 5; i++){
		for(var j = 1; j <=6 ; j++){
			if(dices[i] == j){ amounts[j]++; }
		}
	}
	
	return amounts;
}