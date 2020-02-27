var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var md5 = require('md5');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == 'admin'){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		console.log(req.cookies['token']);
		userModel.getByUname(req.cookies['uname'], function(result){
			res.render('adminHome/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/profileUpdate', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		console.log(req.cookies['token']);
		userModel.getByUname(req.cookies['uname'], function(result){
			res.render('adminHome/profileUpdate', {details: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.post('/profileUpdate', function(req, res){
	
	if(req.cookies['token'] == 'admin'){

		var info = {
		uid :req.body.uid,
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		contact : req.body.contact,
		type : req.body.type
		};

		console.log(info.uid)

		userModel.update(info, function(result){
			res.redirect('/adminHome');
		});

	}else{
		res.redirect('/logout');
	}
});


router.get('/userDetails', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		console.log(req.cookies['token']);
		userModel.userGetAll(null, function(result){
			res.render('adminHome/userDetails', {userlist: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/deleteUser/:id', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		var ID = req.params.id;
		userModel.getById(ID, function(result){
			res.render('adminHome/deleteUser', {details: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/addRestau', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		
			res.render('adminHome/addRestau');
	}else{
		res.redirect('/logout');
	}
});

router.post('/addRestau', function(req, res){
	
	var info ={
		name : req.body.name,
		loc : req.body.loc,
		sb : req.body.sb
	};

	if(req.cookies['token'] == 'admin'){
		userModel.addRestau(info,function(status) {
			if (status) {
				res.redirect('/adminHome');
			}
			else
			{
				res.redirect('/');
			}
		});
			
	}else{
		res.redirect('/logout');
	}
});


router.get('/viewRestau', function(req, res){
	
	if(req.cookies['token'] == 'admin'){
		
		userModel.getAllrestau(null,function(result) {
			res.render('adminHome/viewRestau',{details:result});
		})
		
	}else{
		res.redirect('/logout');
	}
});



module.exports = router;