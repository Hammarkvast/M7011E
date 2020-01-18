var createError = require('http-errors');
var express = require('express');
var session = require('express-session'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt')
var APIRouter = require('./routes/API');

//const cors = require("cors");

// var corsOptions = {
  // origin: "*" ,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// const result = dotenv.config()
//  
// if (result.error) {
  // throw result.error
// }
//  
// console.log(result.parsed);

//var totalElectrictyRouter = require('./routes/totalelectricity');
//var weathersim = require('./public/javascripts/WeatherSim');
//var productionSim = require('./public/javascripts/ProductionSim')

//var WindTurbine = require('./public/javascripts/WindTurbine')
//var productionSim = require('./public/javascripts/productionSIm');

const {Simulationtest} = require('./public/javascripts/Simulation.js')

//var house = require('./public/javascripts/house');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var windRouter = require('./routes/wind');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var signoutRouter = require('./routes/signout');
var signinManagerRouter = require('./routes/signin_manager');
var managerpageRouter = require('./routes/indexmanager');
var handleusersRouter = require('./routes/handleusers');
var blackoutsRouter = require('./routes/blackouts');
var profileRouter = require('./routes/profile');
var updatecredentialsRouter = require('./routes/updatecredentials');

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
//app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blackouts', blackoutsRouter);
// app.use('/handleusers',cors(), handleusersRouter);
app.use('/handleusers', handleusersRouter);
app.use('/', indexRouter);
app.use('/managerhome', managerpageRouter); //call for managers home page
app.use('/signup', signupRouter);//call for signup page
app.use('/signin', signinRouter);//call for signup page
app.use('/signout', signoutRouter);//call for signup page
// app.use('/signin_manager',cors(), signinManagerRouter);
app.use('/signin_manager', signinManagerRouter);
app.use('/profile', profileRouter);
app.use('/updatecredentials', updatecredentialsRouter);

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
// app.get('*', function(req,res){
// })
// ///app.use('/users', usersRouter);
app.use('/API', APIRouter);

app.use('/windtessst', windRouter);
// ///console.log("passed users");

//app.use('/weathersim', express.static('./public/javascripts/WeatherSim.js'));
// console.log("Det är inte lätt när det är svårt");
//console.log("ännu eett testtestestestestestest")
//app.use('/productionSim', express.static('./public/javascripts/ProductionSim.js'));

//app.use('/WindTurbine', express.static('./public/javascripts/WindTurbine.js'));

//app.use('/house', express.static('./public/javascripts/house.js'));

//app.use('/Simulation', express.static('./public/javascripts/Simulation,js'));
var jada  = Simulationtest({});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("error Message: " + err.message);
  console.log("error log: " + err.log);
  //console.log("error message" + err.);
  //res.render('signup',{message: err});
});

// const test = new house("Adam");
// test.testCons();

module.exports = app;

