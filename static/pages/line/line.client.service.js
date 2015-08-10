/**
 * Created by AlexXie on 2015/8/10.
 */

define(['application'], function (app) {

    app.register.factory("LineClientService", ['$http', function ($http) {
        return {
            list: function () {
                return $http.get("/line/");
            }
        }
    }]);
});

