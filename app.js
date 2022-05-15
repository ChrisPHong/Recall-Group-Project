const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { environment, sessionSecret } = require('./config');
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const tasksRouter = require('./routes/tasks');
const { restoreUser } = require('./auth');
const listRouter = require('./routes/lists');
const searchRouter = require('./routes/search');
const aboutUsRouter = require('./routes/aboutUs')

const app = express();
// Bobby1!
// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static('./public'))
// app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    name: 'recall.sid',
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);
// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use(loginRouter);
app.use('/lists', listRouter);
app.use('/tasks', tasksRouter);
app.use('/search', searchRouter);
app.use('/aboutUs', aboutUsRouter);

app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
