var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
require("express-async-errors");
var indexRouter = require('./routes');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(!err.code)
    console.error(err);
  res.json(err.code ? err: { code: -1, message: "Internal error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
})
module.exports = app;
