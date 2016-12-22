dicehand = [];
constDice = [1,2,3,4,5,6];
sortDice = function (a,b) { return b - a;}

function pointsForNumber(nbr){
	if(hasNumber(nbr))
		return (countOccurence(nbr) * nbr);
	else
		return 0;
}

function pointsPar(){
	var p = 0;
	constDice.sort(sortDice).forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			p = (v * 2);
		};
	});
	return p;
	// $("#c1").css("border",case "5px solid green");
}
function pointsDoublePar(){
	var p = 0;
	constDice.sort(sortDice).forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			constDice.forEach(function(w,j){
				if (w != v && nbrOccurence(w,2)) {
					p  = ((v * 2) + (w * 2));
				};
			});
		};
	});
	return p;
}
function pointsTriple(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,3)) {
			return (v * 3);
		}
	});
	return 0;
}

function pointsQuatro(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,4)) {
			return (v * 4);
		}
	});
	return 0;
}

function pointsSmallStage(){
	var stage = true;
	var tmpArr = dicehand;
	tmpArr.splice(5,1); 
	tmpArr.forEach(function(v,i){
		stage = stage && hasNumber(v);
	});
	return (stage ? 15 : 0);
}
function pointsBigStage(){
	var stage = true;
	var tmpArr = dicehand;
	tmpArr.splice(0,1); 
	tmpArr.forEach(function(v,i){
		stage = stage && hasNumber(v);
	});
	return (stage ? 20 : 0);
}
function pointsFullHouse(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,3)) {
			constDice.forEach(function(w,j){
				if (w != v && nbrOccurence(w,2)) {
					return ((v * 3) + (w * 2));
				};
			});
		};
	});
	return 0;
}
function pointsForChance(){
	var sum = 0;
	dicehand.forEach(function(v,i){
		sum += v;
	});
	return sum;
}
function pointsYatzi(){
	constDice.forEach(function(v,i){
		if(countOccurence(v) === 5){
			return (v * 5);
		}
	});
	return 0;
}

//Help functions
function hasNumber(nbr){
	return dicehand.indexOf(nbr) > -1;
}
function nbrOccurence(nbr, cpt){
	return countOccurence(nbr) >= cpt;
}
function countOccurence(nbr){
	var cpt = 0;
	dicehand.forEach(function(v, i){
		if (v === nbr) { cpt++;};
	});
	return cpt;
}
function updateScore(id){
	switch(id){
		 case "ettor" : return  pointsForNumber(1);
		 case "tvaor" : return pointsForNumber(2);
		 case "treor" : return pointsForNumber(3);
		 case "fyror" : return pointsForNumber(4);
		 case "femmor" : return pointsForNumber(5);
		 case "sexor" : return pointsForNumber(6);
		 case "summa" : return 0;
		 case "bonus" : return 0;
	     case "ettpar" : return pointsPar();
		 case "tvapar" : return pointsDoublePar();
		 case "triss": return pointsTriple();
		 case "fyrtal" : return pointsQuatro();
		 case "litenstege" : return pointsSmallStage();
		 case "storstege" : return pointsBigStage();
		 case "kak" : return pointsFullHouse();
		 case "chance" : return pointsForChance();
		 case "yatzi" : return pointsYatzi();
	}

}