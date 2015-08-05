/**
 * Created by AlexXie on 2015/8/4.
 */


var app = angular.module("mainApp", ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("index", {
        url: "/index",
        templateUrl: "/pages/index.html"
    }).state("lines/list", {
        url: "/lines/list",
        templateUrl: "/pages/lines/list.html"
    }).state("lines/edit", {
        url: "/lines/edit",
        templateUrl: "/pages/lines/edit.html"
    });

    $urlRouterProvider.otherwise('/index');

});

