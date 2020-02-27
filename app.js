//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var blog			= require('./controllers/blog');
var login			= require('./controllers/login');
var logout			= require('./controllers/logout');
var signup			= require('./controllers/signup');
var adminHome		= require('./controllers/adminHome');
var memberHome		= require('./controllers/memberHome');



var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/blog',blog);
app.use('/login',login);
app.use('/signup',signup);
app.use('/logout',logout);
app.use('/adminHome',adminHome);
app.use('/memberHome',memberHome);


//routes
app.get('/', function(req, res){
	res.render('index');
});

//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});