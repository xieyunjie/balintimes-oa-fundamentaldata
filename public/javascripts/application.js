/**
 * Created by AlexXie on 2015/8/4.
 */
"use strict";
define(["angularAMD", "router", "ui-router"], function (angularAMD, router) {

    var app = angular.module("mainApp", ['ui.router']);


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
                templateUrl: "/pages/" + r.state + ".html",
                resolve: {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var loadController = "/pages/" + r.state + ".js";
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
                    return r.controller;
                }
            });
            $stateProvider.state(r.state, route);
        });

        $urlRouterProvider.otherwise('/index');
    });

    var indexController = function ($rootScope, $scope) {
        var vm = $scope.vm = {
            title: "这是个大标题"
        };

    };
    indexController.$inject = ['$rootScope', '$scope'];

    angularAMD.bootstrap(app);

    return app;
});





