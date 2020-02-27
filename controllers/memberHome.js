var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var md5 = require('md5');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == 'member'){
		next();
	}else{
		res.redirect('/login');
		
	}
});

router.get('/', function(req, res){
	
	if(req.cookies['token'] == 'member'){
		console.log(req.cookies['token']);
		userModel.getByUname(req.cookies['uname'], function(result){
			res.render('memberHome/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});


module.exports = router;