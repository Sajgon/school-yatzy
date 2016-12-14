// Write dice array to DOM
function showDices(diceArray){
	// utf-8 characters for dice faces
	var diceChars = ["\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"];

	// loop through our dice array with dice values and output dice characters
	for(var i = 0; i < diceArray.length; i++){
		$('.dice-space-' + (i+1)).html(diceChars[diceArray[i] - 1]);
	}


}

// Run showDices on DOM load
$(function (){

	// You can call show dices anywhere
	showDices([5,6,6,4,2]);


});