var express = require('express'),
    router = express.Router();

var authCtrl = require("../authentication/authentication.server.controller.js")

/* GET home page. */

router.get('/', function (req, res, next) {

    res.render('home', {title: 'Express'});
});
router.get('/ocload', function (req, res, next) {

    res.render('ocload', {title: 'Express'});
});

router.get('/ocloadrouters',function(req,res){
    var routers=[{
        statename:'user',
        state:{
            url:'/user',
            controller:'UserCtrl',
            templateUrl: 'javascripts/ocload/user.html',
            jsfile:'javascripts/ocload/usercontroller.js'
        }

    },{
        statename:'post',
        state:{
            url:'/post',
            controller:'PostCtrl',
            templateUrl: 'javascripts/ocload/post.html',
            jsfile:'javascripts/ocload/postcontroller.js'
        }
    }];
    res.json(routers)

});

module.exports = router;
