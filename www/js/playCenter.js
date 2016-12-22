dicehand = [];
constDice = [1,2,3,4,5,6];

function pointsForNumber(nbr){
	if(hasNumber(nbr))
		return (countOccurence(nbr) * nbr);
	return 0;
}

function pointsPar(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			return (v * 2);
		};
	});
	return 0;
	// $("#c1").css("border", "5px solid green");
}
function pointsDoublePar(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			constDice.forEach(function(w,j){
				if (w != v && nbrOccurence(w,2)) {
					return ((v * 2) + (w * 2));
				};
			});
		};
	});
	return 0;
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
	return stage ? 15 : 0;
}
function pointsBigStage(){
	var stage = true;
	var tmpArr = dicehand;
	tmpArr.splice(0,1); 
	tmpArr.forEach(function(v,i){
		stage = stage && hasNumber(v);
	});
	return stage ? 20 : 0;
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
	return $.inArray(dicehand, nbr) > -1;
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
function updateScore(){
	playCombi = {"ettor" : pointsForNumber(1),
			  "tvaor" : pointsForNumber(2),
			  "treor" : pointsForNumber(3),
			  "fyror" : pointsForNumber(4),
			  "femmor" : pointsForNumber(5),
			  "sexor" : pointsForNumber(6),
			  "total" : 0,
			  "bonus" : 0,
 			  "ettpar" : pointsPar(),
			  "tvapar" : pointsDoublePar(),
			  "triss": pointsTriple(),
			  "fyrtal" : pointsQuatro(),
			  "litenstege" : pointsSmallStage(),
			  "storstege" : pointsBigStage(),
			  "kak" : pointsFullHouse(),
			  "chance" : pointsForChance(),
			  "yatzi" : pointsYatzi()
			}

}