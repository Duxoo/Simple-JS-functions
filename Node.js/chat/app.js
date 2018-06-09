var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//для конфигурации
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//экземпляр объекта экспресса(instance of express)
var app = express();
app.set('port', config.get('port'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//файлы с раширением ejs нужно обрабатывать ejs-locals движком
app.engine('ejs', require('ejs-locals'));//layout partial block
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//если никакие middleware не сработали, тогда управление передается этому middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler if args length == 4 then next() goes to error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //if NODE_ENV do not exists then app.get('env') = development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
