var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var icdRouter = require('./routes/icdcodes');
var icdVersion = require('./routes/icdversion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/icd', icdRouter);
app.use('/icdversion', icdVersion);

mongoose.connect(`mongodb+srv://xelahaippa:4ppi4h44@cluster0.oevxs.mongodb.net/Cluster0?retryWrites=true&w=majority`, { 
    useUnifiedTopology: true,
    useNewUrlParser: true
 })
 
    .then(() => console.log('connected, App running'))
    .catch((err) => console.log('error', err));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);   

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
        res.status(404).send("Page Not Found");
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
