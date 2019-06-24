const db = require('./mongoUtil');



function randomer () {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 13; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function dateNowFormat () {
	this.today = new Date();
	var dd = this.today.getDate();
	var mm = this.today.getMonth() + 1;
	var yyyy = this.today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	} 
	if (mm < 10) {
		mm = '0' + mm;
	} 
	this.today = mm + ' ' + dd + ', ' + yyyy;

	return today;
	
	}


function loginToShopyfy(req,res){
	let password = req.body.Password;
	let email = req.body.Email;

	db.get().collection("users").find({'password':password,'username':email}).toArray(function(err,result) {
		if (err) throw err;
		if (result.length != 0){
			res.json({
				ok:true,
				user:email,
				reviewerID:result[0].reviewerID
			})
		}
		else res.json({
			ok:false
		});
	});
}



module.exports = {
	randomer,
	dateNowFormat,
	loginToShopyfy
};
