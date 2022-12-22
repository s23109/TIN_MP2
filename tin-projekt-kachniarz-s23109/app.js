const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const klientRouter = require('./routes/klientRoute');
const wypozyczenieRouter = require('./routes/wypozyczenieRoute');
const egzemplarz_ksiazkiRouter = require('./routes/egzemplarz_ksiazkiRoute');

const klientAPIRouter = require('./routes/api/KlientAPIRoute');
const wypozyczeniaAPIRouter = require('./routes/api/WypozyczenieAPIRoute');
const egzemplarz_ksiazkiAPIRouter = require('./routes/api/Egzemplarz_ksiazkiAPIRoute');

const sequelizeInit = require('./config/sequelize/init');
const mongoInit = require('./config/mongodb/mongoInit');

const fmt = require('./utils/formatting');


mongoInit.init().catch(err => {
    console.log(err)
})

sequelizeInit().catch(err => {
  console.log(err);
})


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  res.locals.fmt = fmt;
  next();
});

app.use(session(
    {
      secret: "aMoGuS_hueHUEhue",
      resave: false
    }
));

app.use((req,res,next)=>{
    const loggedUser = req.session.loggedUser;

    res.locals.loggedUser = loggedUser;

    if (res.locals.loginError){
        res.locals.loginError = undefined;
    }
    next();
})

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
