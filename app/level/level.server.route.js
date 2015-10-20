/**
 * Created by AlexXie on 2015/10/13.
 */
var express = require('express'),
    router = express.Router();
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var request = require('superagent');
var lodash = require('lodash-node');
var fs = require("fs");


router.post('/att', function (req, res, next) {
    if(req.header("content-type").indexOf("multipart/form-data") >= 0){

    }
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'tmp';	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {

        clientFileUpload({
            url: "http://www.balintimes-web.net:9090/ShiroWeb/angular/upload",
            fields: fields,
            files: files,
            req: req,
            callback: function (err, response) {
                res.writeHead(200, {'content-type': 'text/plain'});
                res.write('received upload:\n\n');
                res.end("OK");
            }
        });

        //console.log(fields);
        //lodash.forEach(fields, function (value, key) {
        //    console.log(key, value);
        //});
        //request.post("http://www.balintimes-web.net:9090/ShiroWeb/angular/upload")
        //    .set("Content-Type","multipart/form-data")
        //    .field("title","lhms")
        //    .attach("file",files.upload.path,files.upload.name)
        //    .end(function(err,response){
        //        res.writeHead(200, {'content-type': 'text/plain'});
        //        res.write('received upload:\n\n');
        //        res.end(util.inspect({fields: fields, files: files}));
        //    })

        //var call = request.post("http://www.balintimes-web.net:9090/ShiroWeb/angular/upload")
        //                .set("Content-Type", "multipart/form-data");
        //foreach()
    });
});

//config
//    url
//    fields
//    files
//    req
//    callback
var clientFileUpload = function (config) {

    var call = request.post(config.url)
        .set("Content-Type", "multipart/form-data");
    lodash.forEach(config.fields, function (value, key) {
        call.field(key, value);
    });

    var deleteFiles = [];
    lodash.forEach(config.files, function (file, key) {
        call.attach(key, file.path, file.name);
        deleteFiles.push(file.path);
    });
    call.end(function (err, response) {
        lodash.forEach(deleteFiles, function (f) {
            fs.unlinkSync(f)
        });

        config.callback(err, response);
    });
};


router.post('/attb', function (req, res, next) {
    request.post("http://www.balintimes-web.net:9090/ShiroWeb/angular/upload")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({title: "lhms"}).end(function () {
            res.send("OK");
        })
});

router.get('/upload', function (req, res) {
    //res.end(
    //    '<html>' +
    //    '<form action="/level/att?uploadpath=wq" enctype="multipart/form-data" method="post">' +
    //    '<input type="text" name="title"><br>' +
    //    '<input type="text" name="name"><br>' +
    //    '<input type="file" name="upload"><br>' +
    //    '<input type="file" name="uploadb"><br>' +
    //    '<input type="submit" value="Upload">' +
    //    '</form>' +
    //    '</html>'
    //);
    res.render("upload");
});

module.exports = router;