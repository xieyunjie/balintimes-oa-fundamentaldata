/**
 * Created by AlexXie on 2015/8/5.
 */

"use strict";

define(["application", "LineClientService"], function (app) {
    app.register.controller("LineController", ['$scope', '$http', '$state', 'LineClientService', function ($scope, $http, $state, LineClientService) {
        var vm = $scope.vm = {
            line: {},
            lines: [],
            status:{
                opend:false
            }
        };

        $scope.open = function() {
            vm.status.opened = true;
        };

        $scope.Save = function () {
            if (angular.isUndefined(vm.line.uid)) {
                $http.post('/line/', vm.line).then(function (res) {
                    if (res.data == "success") $state.go("line/list");
                });
            }
            else {
                $http.post('/line/' + vm.line.uid, vm.line).then(function (res) {
                    if (res.data == "success") $state.go("line/list");
                });
            }
        };
        $scope.delete = function (uid) {
            $http.delete("/line/" + uid).then(function (res) {
                $scope.initList();
            });
        };

        $scope.initEdit = function () {
            if ($state.params.uid != 0) {
                $http.get('/line/' + $state.params.uid).then(function (res) {
                    vm.line = res.data;
                });
            }

        };
        $scope.initList = function () {
            LineClientService.list().then(function (res) {
                vm.lines = res.data;
            });
        };
    }]);
});