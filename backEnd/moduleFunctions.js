function randomer () {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 13; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function dateNowFormat () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	} 
	if (mm < 10) {
		mm = '0' + mm;
	} 
	var today = mm + ' ' + dd + ', ' + yyyy;

	return today;
	
	}



exports.randomer = randomer;
exports.dateNowFormat = dateNowFormat;