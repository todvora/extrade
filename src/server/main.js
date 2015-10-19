import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import compression from 'compression';
import config from './config';
import api from './routes/api';
import path from 'path';

const app = express();

app.use(compression());
app.use('/build', express.static('build'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




app.use('/api', api);

app.get('/app*', (req, res) => {
  const version = config.version;
  const isProduction = config.isProduction;
  const appSrc = isProduction ? `/build/app.js?v=${version}`: '//localhost:8888/build/app.js';
  res.render('react', {
    appSrc: appSrc,
    version: version,
    isProduction:isProduction
  });
});

app.use('/', (req, res) => {
  res.redirect('/app');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(config.port);
console.log(`Server started on port ${config.port}`);
