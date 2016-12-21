dicehand = [];
constDice = [1,2,3,4,5,6];

function hands(dice){
	dicehand = dice;
}
function hasOnes(){
	return hasNumber(1);
}
function hasTwos(){
	return hasNumber(2);
}
function hasTrees(){
	return hasNumber(3);
}
function hasFours(){
	return hasNumber(4);
}
function hasFives(){
	return hasNumber(5;
}
function hasSexes(){
	return hasNumber(6);
}

function isPar(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			return true;
		};
	});
	return false;
	// $("#c1").css("border", "5px solid green");
}
function isDoublePar(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,2)) {
			constDice.forEach(function(w,j){
				if (w != v && nbrOccurence(w,2)) {
					return true;
				};
			});
		};
	});
	return false;
}
function isTriple(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,3)) {
			return true;
		}
	});
	return false;
}

function isQuatro(){
	constDice.forEach(function(v,i){
		if (nbrOccurence(v,4)) {
			return true;
		}
	});
	return false;
}

function isSmallStage(){
	var stage = true;
	var tmpArr = dicehand;
	tmpArr.splice(5,1); 
	tmpArr.forEach(function(v,i){
		stage = stage && hasNumber(v);
	});
	return stage;
}
function isBigStage(){
	var stage = true;
	var tmpArr = dicehand;
	tmpArr.splice(0,1); 
	tmpArr.forEach(function(v,i){
		stage = stage && hasNumber(v);
	});
	return stage;
}
function yatzi(){
	return countOccurence(6) === 5;
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