var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./libs/mongoose');
//сессии
var session = require('express-session');
//для конфигурации
var config = require('./config');
//routes
var indexRouter = require('./routes/index');
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
//для того, чтобы сохранять и загружать сессии нужен класс connect-mongo,
//к которому будет обращаться middleware session
const MongoStore = require('connect-mongo')(session);
app.use(session({
	secret: config.get('session:secret'),
	key: config.get('session:key'),
	cookie: config.get('session:cookie'),
	saveUninitialized: false,
	resave: false,
	//объект класса connect-mongo
	//строку соединения mongoStore может взять из mongoose
	store: new MongoStore({mongooseConnection: mongoose.connection})
})); //когда посетитель впервые заходит на сайт ему ставится cookie connect.sid
//подсчет количества сессий
/*app.use(function(req, res, next) {
	req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
	res.send("Visits: " + req.session.numberOfVisits);
})*/
//если никакие middleware не сработали, тогда управление передается этому middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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
app.listen(3000);

module.exports = app;
