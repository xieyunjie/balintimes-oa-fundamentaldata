/**
 * Created by AlexXie on 2015/8/10.
 */


var uuid = require('node-uuid'),
    Line = require("./line.server.model");

var LineServerController = {};
module.exports = LineServerController;

// '/'

LineServerController.list = function (req, res, next) {
    console.info(req.user);

    Line.find(function (err, docs) {
        if (err) next(err);
        res.send(docs);
    });
};

LineServerController.create = function (req, res, next) {
    var line = new Line(req.body);
    line.uid = uuid.v4();
    line.save(function (err) {
        if (err) return next(err);

        res.send("success");
    });
};

LineServerController.findOne = function (req, res, next) {
    Line.findOne({uid: req.params.uid}, function (err, doc) {
        if (err) return next(err);
        res.send(doc);
    })
};

LineServerController.update = function (req, res, next) {
    var line = req.body;
    Line.update({uid: line.uid}, line, {}, function (err, raw) {
        if (err) return next(err);

        res.send("success");
    })
};

LineServerController.delete = function (req, res, next) {
    var uid = req.params.uid;

    Line.findOneAndRemove({uid: uid}, function (err, raw) {
        if (err) return next(err);
        res.send("success");

    })
};