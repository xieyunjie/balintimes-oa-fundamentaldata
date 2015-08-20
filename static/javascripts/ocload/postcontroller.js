angular.module('UserModule', []).controller('PostCtrl', ['$scope', function($scope) {
    var vm = $scope.vm = {
        title: 'PostTitle'
    };

    $scope.consoleInfo = function() {
        console.log("PostPostPost");
    }

}]);