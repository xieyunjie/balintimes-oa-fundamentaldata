// app.controller('UserCtrl', ['$scope', function($scope) {
//     var vm = $scope.vm = {
//         title: 'userTitle'
//     };

//     $scope.consoleInfo = function() {
//         console.log("user user user");
//     }

// }]);
angular.module('UserModule', []).controller('UserCtrl', ['$scope', function($scope) {
    var vm = $scope.vm = {
        title: 'userTitle'
    };

    $scope.consoleInfo = function() {
        console.log("user user user");
    }

}])
