/**
 * Created by AlexXie on 2015/8/5.
 */

require.config({

    baseUrl: "",

    paths: {
        'application': 'application',
        'angular': 'bower_components/angular/angular',
        'angularAMD': 'bower_components/angularAMD/angularAMD',
        'ngload': 'bower_components/angularAMD/ngload',
        'ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'ui-bootstrap': 'http://cdn.bootcss.com/angular-ui-bootstrap/0.13.2/ui-bootstrap-tpls', // bower 安装不了
        'angular-file-upload':'bower_components/angular-file-upload/dist/angular-file-upload.min',
        'router': 'router',

        /*services*/
        'LineClientService': 'pages/line/line.client.service'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ui-router': ['angular'],
        'ui-bootstrap': ['angular'],
        'angular-file-upload':['angular']

    },

    deps: ['application']
});
