dicehand = [];
function hands(dice){
	dicehand = dice;
}

function isPar(){

	$("#c1").css("border", "5px solid green");
}
function isDoublePar(){}


function countOccurence(nbr){
	var cpt = 0;
	dicehand.forEach(function(v, i){
		if (v === nbr) { cpt++;};
	});
	return cpt;
}