var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var klientRouter = require('./routes/klientRoute');
var wypozyczenieRouter = require('./routes/wypozyczenieRoute');
var egzemplarz_ksiazkiRouter = require('./routes/egzemplarz_ksiazkiRoute');

var klientAPIRouter = require('./routes/api/KlientAPIRoute');
var wypozyczeniaAPIRouter = require('./routes/api/WypozyczenieAPIRoute');
var egzemplarz_ksiazkiAPIRouter = require('./routes/api/Egzemplarz_ksiazkiAPIRoute');

const sequelizeInit = require('./config/sequelize/init');

sequelizeInit().catch(err => {
  console.log(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/klient',klientRouter);
app.use('/wypozyczenie' , wypozyczenieRouter);
app.use('/egzemplarz_ksiazki',egzemplarz_ksiazkiRouter);

app.use('/api/klient' , klientAPIRouter);
app.use('/api/wypozyczenie' , wypozyczeniaAPIRouter);
app.use('/api/egzemplarz_ksiazki', egzemplarz_ksiazkiAPIRouter);

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

module.exports = app;
