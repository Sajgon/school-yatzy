function rollDice() {
    var randomDice = Math.floor(6*Math.random())+1;  
    return randomDice;
}

function rollDices() {
    dice1 = rollDice();
    dice2 = rollDice();
    dice3 = rollDice();
    dice4 = rollDice();
    dice5 = rollDice();
    dice6 = rollDice();
 return dice1 + " " + dice2 + " " + dice3 +" "+ dice4 +" " + dice5 + " " + dice6;     
}

alert(rollDice());