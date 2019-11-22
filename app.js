var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var weathersim = require('./public/javascripts/WeatherSim');
//var productionSim = require('./public/javascripts/ProductionSim')

var WindTurbine = require('./public/javascripts/WindTurbine')
//var productionSim = require('./public/javascripts/productionSIm');

//var house = require('./public/javascripts/house');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('*', function(req,res){
  console.log("Enter check")
  console.log(res);
})
app.use('/users', usersRouter);

//app.use('/weathersim', express.static('./public/javascripts/WeatherSim.js'));

//app.use('/productionSim', express.static('./public/javascripts/ProductionSim.js'));

app.use('/WindTurbine', express.static('./public/javascripts/WindTurbine.js'));

//app.use('/house', express.static('./public/javascripts/house.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const test = new house("Adam");
// test.testCons();

module.exports = app;

