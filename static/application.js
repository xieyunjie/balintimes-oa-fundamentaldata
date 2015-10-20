/**
 * Created by AlexXie on 2015/8/4.
 */
"use strict";
define(["angularAMD", "router", "ui-router", "ui-bootstrap","angular-file-upload"], function (angularAMD, router) {

    var app = angular.module("mainApp", ['ui.router', 'ui.bootstrap','angularFileUpload']);


    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest = [function (data) {
            if (data) {
                return $.param(data);
            }
            return data;
        }];
    }]);

    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state("index", {
            url: "/index",
            templateUrl: "/pages/index.html",
            controller: indexController
        });

        angular.forEach(router.routers, function (r) {
            var route = angularAMD.route({
                url: r.url,
                templateUrl: "/pages" + r.view,
                resolve: {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var loadController = "/pages/" + r.controller;
                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                },
                controllerProvider: function ($stateParams) {
                    return r.controllername;
                }
            });
            $stateProvider.state(r.state, route);
        });

        $urlRouterProvider.otherwise('/index');
    });

    app.config(function (datepickerPopupConfig) {
        datepickerPopupConfig.datepickerPopup = "yyyy/MM/dd";
        datepickerPopupConfig.showButtonBar = true;
        datepickerPopupConfig.currentText = "今天";
        datepickerPopupConfig.clearText = "清除";
        datepickerPopupConfig.closeText = "完成";
        datepickerPopupConfig.currentText = "今天";
    });

    app.run(function ($rootScope, $state) {
        var init = function () {
        };

        init();
    });

    var indexController = function ($scope, $state) {
        var vm = $scope.vm = {
            title: "这是个大标题"
        };

    };
    indexController.$inject = ['$scope', '$state'];

    angularAMD.bootstrap(app);

    return app;
});





