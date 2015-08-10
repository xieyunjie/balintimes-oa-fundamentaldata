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

        'router':'router'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ui-router': ['angular'],
        'blockUI': ['angular']

    },

    deps: ['application']
});
