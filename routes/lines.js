/**
 * Created by AlexXie on 2015/8/4.
 */
var express = require('express'),
    router = express.Router(),
    uuid = require('node-uuid'),
    Line = require("../models/line");

/* GET users listing. */
//router.get('/:uid', function (req, res, next) {
//    Line.findOne({uid: req.params.uid}, function (err, line) {
//        if (err) return next(err);
//        res.send(line);
//    });
//});

router.get("/create", function (req, res, next) {

    var line = new Line({
        uid: uuid.v4(),
        name: "1号线",
        cityname: "广州",
        openingtime: new Date()
    });

    line.save(function (err) {

        if (err) return next(err);

        res.send("success");
    });
});

router.post("/save", function (req, res, next) {

});

router.post("/delete", function (req, res, next) {
});

module.exports = router;