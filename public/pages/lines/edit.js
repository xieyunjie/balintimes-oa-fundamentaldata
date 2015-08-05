/**
 * Created by AlexXie on 2015/8/5.
 */

"use strict";

define(["application"], function (app) {
    app.register.controller("LineEditController", ['$scope', '$http', '$state', function ($scope, $http, $state) {
        var vm = $scope.vm = {
            line: {}
        };

        $scope.Save = function () {
            $http.post('/lines/save', vm.line).then(function (res) {
                if (res.data == "success") $state.go("lines/list");
            });
        };

        $scope.init = function () {

            if ($state.params.uid != 0) {
                $http.get('/lines/get/' + $state.params.uid).then(function (res) {
                    vm.line = res.data;
                });
            }

        };
        $scope.init();
    }]);
});