
// Remove high scores		
function removeHighscore(){
	localStorage.removeItem("yatzy-highscore");
	isLocalStorageKeys();
	highscoreOutput();
}

// update the highscore when game is finnished
function updateHighscore(score, name){
	// validate input: result
	if(score){
		// Variabel för våra yatzy spel
		var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));
		
		var newdate = new Date();
		var getyear = newdate.getFullYear();
		//month
		var getmonth = newdate.getMonth()+1;
		if ( getmonth < 10) {
			getmonth = "0" + getmonth;
		};
		
		
		var getday = newdate.getDate();
		if ( getday < 10) {
			getday = "0" + getday;
		};
		
		
		var gethour = newdate.getHours();
		if (gethour < 10) {
			gethour = "0" + gethour;
		};
		
		
		var getminute = newdate.getMinutes();
		if (getminute < 10) {
			getminute = "0" + getminute;
		};

		var hightime = getyear + "-" + getmonth + "-" + getday + " " + gethour + ":" + getminute;
		
		var highscoreObject = {
			name: name,
			points: score,
			datetime: hightime
		};
		
		yatzyhighscore.highscores.push(highscoreObject);
		
		
		function compare(a,b){
			if (a.points < b.points)
				return 1;
			if (a.points > b.points)
				return -1;
			return 0;
		}

		yatzyhighscore.highscores.sort(compare);
		
		console.log(yatzyhighscore);
		
		// redo an object to a string
		yatzyhighscore = JSON.stringify(yatzyhighscore);
		
		// set gameid to started in localStorage
		localStorage.setItem("yatzy-highscore", yatzyhighscore);
		
		// call function highscoreOutput() to update highscore table
		highscoreOutput();
		
		return true;
	}
	
	// no result input
	return false;
}

// output table rows to highscore
function highscoreOutput(){	
	
	// Variabel för våra yatzy highscore object
	var yatzyhighscore = JSON.parse(localStorage.getItem("yatzy-highscore"));
	
	// sortera vårt highscore efter högsta poäng
	// topFiveHighscore = yatzyhighscore.highscores.sort(sortNumber);
	topFiveHighscore = yatzyhighscore.highscores;
	
	// Amount 
	highscorelength = 5;

	// empty highscore table
	$("#table_highscore").empty();
	
	if(topFiveHighscore.length == 0){
		tablerow = "<tr><td>Vi har inga sparade högsta poäng!</td><tr>";
		$("#table_highscore").append(tablerow);
	}else{
		// count length of highscore if below "5"
		if(topFiveHighscore.length < highscorelength){
			highscorelength = topFiveHighscore.length;
		}
		
		// print tableheader
		tablerow = "<tr><th>Rank</th><th>Namn</th><th>Poäng</th><th>Datum</th></tr>";
		$("#table_highscore").append(tablerow);
		
		// Loop sorted highscore
		for(var t = 0; t < highscorelength; t++){
			points = topFiveHighscore[t].points;
			name = topFiveHighscore[t].name;
			date = topFiveHighscore[t].datetime;
			
			row = t+1;	// winners position
			
			tablerow = "<tr><td>#"+row+"</td><td>"+name+"</td><td>"+points+"</td><td>"+date+"</td><tr>";
			$("#table_highscore").append(tablerow);
		}
	}
}
