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

router.get('/listall', function (req, res, next) {

    Line.find(function (err, docs) {
        if (err) next(err);
        res.send(docs);
    });
});

router.get('/get/:uid', function (req, res, next) {
    Line.findOne({uid: req.params.uid}, function (err, doc) {
        if (err) return next(err);
        res.send(doc);
    })
});

router.get("/create", function (req, res, next) {

    var line = new Line({
        uid: uuid.v4(),
        name: "2号线",
        cityname: "广州",
        openingtime: new Date()
    });

    line.save(function (err) {

        if (err) return next(err);

        res.send("success");
    });
});

router.post("/save", function (req, res, next) {

    if (!req.body._id) {
        var line = new Line(req.body);
        line.uid = uuid.v4();
        line.save(function (err) {
            if (err) return next(err);

            res.send("success");
        });
    }
    else {
        var line = req.body;
        Line.update({uid: line.uid}, line, {}, function (err, raw) {
            if (err) return next(err);

            res.send("success");
        })

    }

});

router.post("/delete", function (req, res, next) {
    var uid = req.body.uid;

    Line.findOneAndRemove({uid: uid}, function (err, raw) {
        if (err) return next(err);
        res.send("success");

    })
});

module.exports = router;