/**
 * Created by AlexXie on 2015/8/17.
 */
"use strict";
define(['angularAMD', 'balintimesConstant', 'ui-bootstrap'], function (angularAMD, balintimesConstant) {

    var app = angular.module("levelModule", ['ui.router', 'ui.bootstrap']);

    var mainState = {
        name: 'org/level',
        url: '/org/level',
        templateUrl: "/pages/level/level.client.view.list.html",
        controller: 'LevelController'
    };
    app.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state(mainState);
        }]);

    app.controller("LevelController", function ($scope,AjaxRequest) {
        var vm = $scope.vm = {msg: "这个是什么信息？？？"};

        $scope.GetMsg = function(){

            AjaxRequest.Get("/usertype/list").then(function(re){

                console.info(re.data);
            });

        }
    });

    return {
        mainState: mainState,
        module: app
    };
});