
function showRrowToClick(element){
	var title = 'Tryck på knappen för att bekräffta. Annars var som helst på skärmen för att välja en annan...';
	showRow(element, title, 'cmbClickGreen');
}

function showRrowToRemove(element){
	var title = 'Tryck på knappen för att Stryka vald kombination. Annars var som helst på skärmen för att välja en annan.';
	showRow(element, title, 'cmbClickRed');
}

function showRow(element, title, btnColor){
	var combName = $("#" + element + " th").html();
	var modalBody = '<table><tbody><tr class="row">' +
						'<th data-id="' + element + '" class="col-xs-12 btn btn-default tmpCombClick ' + btnColor + '">' + combName + '</th>';+
						'<td class="col-xs-12 btn btn-danger">Stäng</td>';+
					 '</tr></tbody></table>';
	showInModal(title, modalBody, '');
}

function updateUndoRedoButtons(){	
	if (gamesCurrentVersion === 0) {
		$("#undoMove").prop("disabled", true);
		$("#undoMove").addClass("arrowDisabled");		
	}
	else {
		$("#undoMove").prop("disabled", false);
		$("#undoMove").removeClass("arrowDisabled");		
	};

	if ((gameVersions.length === 0) || (gamesCurrentVersion === gameVersions.length - 1)) {
		$("#redoMove").prop("disabled", true);
		$("#redoMove").addClass("arrowDisabled");
	}
	else{
		$("#redoMove").prop("disabled", false);
		$("#redoMove").removeClass("arrowDisabled");
	}
}

/*	Function to draw table combinations, scores and playernames */
function drawTable(){
	var head = '<thead id="fixedHead">' + 
				'<tr id="playernames">' + 
				'<th>Spelare</th>';

	$("#diceHolder").empty();
	
	currentGame.players.forEach(function(v,i){
		pos = i +1;
		var classPlayer = v.id === currentGame.currentPlayer ? ' class="high-player" ': '';
		head += '<th' + classPlayer + '>'+ pos + ". " + v.name +'</th>';
	});
							
	head += '</tr></thead>';

	var tbody =  '<tbody>';
	for (var i = 0; i < 18; i++) {
		tbody += '<tr id="' + arrComboId[i] + '" class="">' + 
		'<th id="btn' + arrComboId[i] + '" scope="row" class="col-xs-6 col-md-6 btn btn-default"><span class="col-xs-1 col-md-1"></span>' + arrComboName[i] + '</th>';

		currentGame.players.forEach(function(p,j){
			var c =   p.combinations[i] > 0 ? p.combinations[i] + "" : (p.lockedCombinations.indexOf(i) === -1 ?  '-' : '0');
			tbody += '<td class="colPlayer-' + j + '-' + i + '">' + c + '</td>';
		});
		tbody += '</tr>';
	};

	tbody += '</tbody>';

	$("#score-table").html("");
	$("#score-table").append(head+tbody);

};

function showInModal(head, body, foot){	
	$("#clickRowModal").remove();
	var modalContainer = '<div id="clickRowModal" class="modal fade" role="dialog">' + 
	  						'<div class="modal-dialog" role="document">' + 
	    						'<div class="modal-content">' + 
	    							'<div class="modal-header">' +
								        '<h6 class="modal-title">'+ 
								        	head +
								        '</h6>' +
							      	'</div>' +
	      							'<div class="modal-body">' + 
	      								body + 
	      							'</div>' + 
								    '<div class="modal-footer">' +
										foot +
								  	'</div>' +
      							'</div>' + 
  							'</div>'  + 
						 '</div>';
	$("body").append(modalContainer);
  	$("#clickRowModal").modal("show");
}

function setFixedPlayersName(){
	
	var w0 = parseInt($('#score-table').css('width'));
    var w1 = parseInt($('#btnettor').css('width'));
    var wi = w0 - w1;
	var stl = 'float: left; margin: 0; padding: 7px; text-align: center; font-weight: bold;';

	var el = '<div style="' + stl + ' width: ' + (w1) + 'px;">Spelare</div>';	
	for (var i = 0; i < currentGame.players.length; i++) {
		var style = stl;
		style += ' width: ' + (wi / currentGame.players.length) + 'px;';
		
		if(i === currentGame.currentPlayer)
			style += " background-color: #00dc5b;";

		el +=  '<div style="' + style + '">' + (currentGame.players[i].id + 1) + '. ' + currentGame.players[i].name + '</div>';
	};
	el += '<div class="clearfix"></div>';

   	$("#hiddenPlayersName").html(el);    
    $("#hiddenPlayersName").hide();
}
