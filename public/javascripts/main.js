/**
 * Created by AlexXie on 2015/8/5.
 */

require.config({

    baseUrl: "",

    paths: {
        'application': 'javascripts/application',
        'angular': 'angular/angular',
        'angularAMD': 'angularAMD/angularAMD',
        'ngload': 'angularAMD/ngload',
        'ui-router': 'angular-ui-router/release/angular-ui-router',

        'router':'javascripts/router'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'ui-router': ['angular'],
        'blockUI': ['angular']

    },

    deps: ['application']
});
