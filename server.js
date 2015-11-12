var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var session = require('express-session');

var routes = require('./api/routes/index');
var login = require('./api/routes/loginroute');
//var users = require('./api/routes/users');
//var create = require('./api/routes/create');
var addstudent = require('./api/routes/addstudentroute');
//var update = require('./api/routes/update');
//var deleteOp = require('./api/routes/delete');
var studentDetails = require('./api/routes/studentdetailsroute');
var addfeepayment = require('./api/routes/addfeepaymentroute');

var app = express();

/*
 Database and Models
 */
mongoose.connect("mongodb://localhost/mongodb");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    hash: String,
    admin: Boolean
});
var User = mongoose.model('users', UserSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('SBPUC MC190'));
app.use(session({secret: 'keyboard mc190', cookie: {maxAge: 60000},user:''}));
app.use(require('less-middleware')(path.join(__dirname, 'api')));
app.use(express.static(path.join(__dirname, './client', 'public')));
app.use(express.static(path.join(__dirname, './client', 'views')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/loginuser', login);
//app.use('/users', users);
//app.use('/create', create);
app.use('/addstudent', addstudent);
app.use('/addfeepayment', addfeepayment);
//app.use('/update', update);
//app.use('/delete', deleteOp);
app.use('/studentdetails', studentDetails);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = req.session.error,
            msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err)
        res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg)
        res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
module.exports = User;
http.createServer(app).listen(3000);
