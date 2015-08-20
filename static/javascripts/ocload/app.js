var app = angular.module('app', ["ui.router", "oc.lazyLoad"]);

app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'otherjs',
            files: ['javascripts/ocload/a.js', 'javascripts/ocload/b.js']
        }]
    });
}]);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'javascripts/ocload/user.html',
        resolve: {
            deps: ['$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load('otherjs').then(function(){
                    	return $ocLazyLoad.load(['javascripts/ocload/usercontroller.js']);
                    });
                }
            ]
        }
    }).state('post', {
        url: '/post',
        controller: 'PostCtrl',
        templateUrl: 'javascripts/ocload/post.html',
        resolve: {
            deps: ['$ocLazyLoad',
                function($ocLazyLoad) {
                    return $ocLazyLoad.load(['javascripts/ocload/postcontroller.js']);
                }
            ]
        }
    })
}]);

app.controller('appController', ['$scope', function($scope) {
    var vm = $scope.vm = {
        appTitle: 'AppTitle'
    }
}]);
