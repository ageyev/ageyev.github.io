'use strict';

/**
 * see example:
 * https://github.com/maximepvrt/angular-google-gapi/blob/gh-pages/app/router.js
 */

var router = angular.module('app.ui.router', []);

router
    .config(['$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
        }
    ]);

router
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    controller: 'app.home',
                    templateUrl: 'app/home/home.html'
                })
                .state('eventsMonitor', {
                    url: '/eventsMonitor',
                    controller: 'app.eventsMonitor',
                    templateUrl: 'app/eventsMonitor/eventsMonitor.html'
                })
                .state('smartContractEvents', {
                    url: '/smartContractEvents',
                    controller: 'app.eventsMonitor',
                    templateUrl: 'app/eventsMonitor/eventsMonitor.html'
                })
                .state('deploy', {
                    url: '/deploy',
                    controller: 'app.deploy',
                    templateUrl: 'app/deploy/deploy.html'
                })
                .state('test', {
                    url: '/test',
                    controller: 'app.test',
                    templateUrl: 'app/test/test.html'
                })
        } // end of function ($stateProvider)..
    ]); // end of .config
