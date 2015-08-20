var express = require('express'),
    router = express.Router();

var authCtrl = require("../authentication/authentication.server.controller.js")

/* GET home page. */

router.get('/', authCtrl.IsAuth, function (req, res, next) {

    res.render('home', {title: 'Express'});
});
router.get('/ocload', function (req, res, next) {

    res.render('ocload', {title: 'Express'});
});

module.exports = router;
