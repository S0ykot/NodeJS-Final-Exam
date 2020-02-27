var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var md5 = require('md5');



router.get('/', function(req, res){
	res.render('homepage/index');
});

router.get('/searchFilter/:filt/:key', function(req, res){
	var srcby= req.params.filt;
	var key= req.params.key;
	userModel.globalSearch(key,srcby,function(result) {
		res.render('homepage/searchFilter',{data : result});
	})
	
});





module.exports = router;