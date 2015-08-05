/**
 * Created by AlexXie on 2015/8/5.
 */
"use strict";
define(["application"], function (app) {
    app.register.controller("LineListController", ['$scope', '$http', function ($scope, $http) {
        var vm = $scope.vm = {
            lines: []
        };

        $scope.delete = function (uid) {
            $http.post("/lines/delete", {uid: uid}).then(function (res) {
               init();
               // console.info(res);
            });
        };

        var init = function () {

            $http.get("/lines/listall").then(function (res) {

                vm.lines = res.data;
            });
        };
        init();
    }]);
});