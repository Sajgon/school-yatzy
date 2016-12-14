// Write dice array to DOM
function showDices(diceArray){
	// utf-8 characters for dice faces
	var diceChars = ["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"];

	// loop through our dice array with dice values and output dice characters
	for(var i = 0; i < diceArray.length; i++){
		$('.dice-space-' + (i+1)).html(diceChars[diceArray[i] - 1]);
	}


}

function randomDiceGenerator(){
	var random = Math.floor(Math.random() * 6) + 1;
	return random;
}


// Run showDices on DOM load
$(function (){
	var arrDice = [];
	for (var i = 0; i <= 6; i++){
		arrDice.push(randomDiceGenerator());
	}
	// You can call show dices anywhere
	showDices(arrDice);


});