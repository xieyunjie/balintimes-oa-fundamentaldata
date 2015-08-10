/**
 * Created by AlexXie on 2015/8/5.
 */

"use strict";

define([], function () {

    var routers = [];

    // 线路列表
    routers.push({
        state: "line/list",
        url: '/line/list',
        controllername:"LineController",

        view:'/line/line.client.view.list.html',
        controller: "/line/line.client.controller.js"
    });
    // 线路编辑
    routers.push({
        state: "line/edit",
        url: '/line/edit/:uid',
        controllername:"LineController",

        view:'/line/line.client.view.edit.html',
        controller: "/line/line.client.controller.js"
    });


    var util = {
        makeControllerProvider: function (url) {
        }
    };

    return {
        routers: routers,
        util: util
    };

});
