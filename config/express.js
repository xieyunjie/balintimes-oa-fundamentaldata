/**
 * Created by AlexXie on 2015/8/11.
 */
'use strict';
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    uuid = require('node-uuid');

module.exports = function () {
    var app = express();

// view engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
        genid: function (req) {
            return uuid.v4();
        },
        secret: 'balintimes-oa-fd-secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    /* ==== middlewares begin ==== */
//var authMid = require("./app/authentication/authentication.server.controller");
//
//app.use(authMid.MidShow);

    /* ==== middlewares end ==== */

    /* ==== routers begin ==== */


    var homeroute = require('../app/home/home.server.route'),
        users = require('../app/user/users'),
        login = require('../app/login/login.server.route'),
        line = require('../app/line/line.server.route'),
        level = require("../app/level/level.server.route");

    app.use('/', homeroute);
    app.use('/users', users);
    app.use('/level', level);
    app.use('/login', login);
    app.use('/line', line);

    /* ==== routers end ==== */




    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        if (req.method == "OPTIONS") res.send(200);
        else next();
    });
    app.use(express.static(path.join(__dirname, '../static')));

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
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

    return app;
};

//module.exports = app;
