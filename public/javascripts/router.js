/**
 * Created by AlexXie on 2015/8/5.
 */

"use strict";

define([], function () {

    var routers = [];

    // 线路列表
    routers.push({
        state: "lines/list",
        url: '/lines/list',
        controller: "LineListController"
    });
    // 线路编辑
    routers.push({
        state: "lines/edit",
        url: '/lines/edit/:uid',
        controller: "LineEditController"
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
