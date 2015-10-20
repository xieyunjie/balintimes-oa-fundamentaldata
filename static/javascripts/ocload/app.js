var app = angular.module('app', ["ui.router", "oc.lazyLoad"]);

app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'otherjs',
            files: ['javascripts/ocload/a.js', 'javascripts/ocload/b.js']
        }]
    });
}]);

var internalStates = {}, stateRegisteredCallbacks = [];
app.config([ '$stateProvider', '$injector', function ($stateProvider, $injector) {
    // Decorate any state attribute in order to get access to the internal state representation.
    $stateProvider.decorator('parent', function (state, parentFn) {
        // Capture each internal UI-Router state representations as opposed to the user-defined state object.
        // The internal state is, e.g., the state returned by $state.$current as opposed to $state.current
        internalStates[state.self.name] = state;
        // Add an accessor for the internal state from the user defined state
        state.self.$$state = function () {
            return internalStates[state.self.name];
        };

        angular.forEach(stateRegisteredCallbacks, function(callback) { callback(state); });
        return parentFn(state);
    });
}]);


app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        //    .state('user', {
        //    url: '/user',
        //    controller: 'UserCtrl',
        //    templateUrl: 'javascripts/ocload/user.html',
        //    resolve: {
        //        deps: ['$ocLazyLoad',
        //            function($ocLazyLoad) {
        //                return $ocLazyLoad.load('otherjs').then(function(){
        //                	return $ocLazyLoad.load(['javascripts/ocload/usercontroller.js']);
        //                });
        //            }
        //        ]
        //    }
        //}).state('post', {
        //    url: '/post',
        //    controller: 'PostCtrl',
        //    templateUrl: 'javascripts/ocload/post.html',
        //    resolve: {
        //        deps: ['$ocLazyLoad',
        //            function($ocLazyLoad) {
        //                return $ocLazyLoad.load(['javascripts/ocload/postcontroller.js']);
        //            }
        //        ]
        //    }
        //})
        .state('level', {
            url: '/level',
            controller: 'LevelCtrl',
            templateUrl: 'javascripts/ocload/post.html',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['javascripts/ocload/postcontroller.js']);
                    }
                ]
            }
        })
}]);
RegisterRoutersProvider.$inject = ['$http','$stateProvider'];
function RegisterRoutersProvider($http,$stateProvider) {
    return {
        reg: function (name, state) {
            //$stateProvider.state(name, state);
            console.log('#######');
        }
    }
}
app.factory('registerRouters',RegisterRoutersProvider);
//app.factory('registerRouters',['$http','$stateProvider',function($http,$stateProvider){
//    return {
//        reg: function (name, state) {
//            //$stateProvider.state(name, state);
//            console.log('#######');
//        },
//        con:function(){
//            console.log('!!!!!!!!!!!!!!!!!');
//        }
//    }
//}]);


app.controller('appController', ['$rootScope', '$scope','$http','registerRouters', function ($rootScope, $scope, $http,registerRouters) {
    var vm = $scope.vm = {
        appTitle: 'AppTitle'
    };

    var initRouter = function () {
        registerRouters.con();
        $http.get('/ocloadrouters').then(function (res) {
            var routers = res.data;

            //angular.forEach(routers, function (router) {
            //    registerRouters.reg(router.statename, {
            //        url: router.state.url,
            //        controller: router.state.controller,
            //        templateUrl: router.state.templateUrl,
            //        resolve: {
            //            deps: ['$ocLazyLoad',
            //                function ($ocLazyLoad) {
            //                    return $ocLazyLoad.load([router.jsfile]);
            //                }
            //            ]
            //        }
            //    });
            //    //$state.state(router.statename, {
            //    //    url: router.state.url,
            //    //    controller: router.state.controller,
            //    //    templateUrl: router.state.templateUrl,
            //    //    resolve: {
            //    //        deps: ['$ocLazyLoad',
            //    //            function ($ocLazyLoad) {
            //    //                return $ocLazyLoad.load([router.jsfile]);
            //    //            }
            //    //        ]
            //    //    }
            //    //})
            //});
        });


    };

    initRouter();
}]);
