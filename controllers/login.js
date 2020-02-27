var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('/', function(req, res){

	res.render('login/index');
});

router.post('/', function(req, res){
	var info= {
		username : req.body.username,
		password : req.body.password
	};

	userModel.validate(info, function(status){
			if(status){
				userModel.getByUname(req.body.username,function(get){
					type = get.type;
					if (type=='admin') {
					 	res.cookie('token', type);
					 	res.cookie('uname', req.body.username);
					 	res.redirect('/adminHome');
					}else
					{
						type = get.type;
					 	res.cookie('token', type);
					 	res.cookie('uname', req.body.username);
					 	res.redirect('/memberHome');
					}
				});
				
				
				
			}else{
				res.redirect('/login');
			}
		});

});

module.exports = router;