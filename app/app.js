'use strict';

/**
 * @ngdoc overview
 * @name kphoneBookApp
 * @description
 * # kphoneBookApp
 *
 * Main module of the application.
 */
angular
  .module('kphoneBookApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'messages.factory'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url: '/home',
            params: {},
            views: {
                'main@': {
                    controller: 'HomeCtrl',
                    templateUrl: 'home.html'
                }
            },
            data: {
                pageMainTitle: 'K-Phone Book Home',
                displayName: 'K-Phone Book Home',
                pageSubTitle: null
            }
        })
        .state('header', {
            url: '/header',
            params: {},
            views: {
                'header@': {
                    templateUrl: 'header.html'
                }
            },
            data: {
                pageMainTitle: 'K-Phone Book',
                displayName: 'K-Phone Book',
                pageSubTitle: null
            }
        })
        .state('phonebook', {
            url: '/phonebook',
            params: {},
            views: {
                'main@': {
                    controller: 'PhonebookCtrl',
                    templateUrl: 'kphoneBook.html'
                }
            },
            data: {
                pageMainTitle: 'K-Phone Book',
                displayName: 'K-Phone Book',
                pageSubTitle: null
            }
        });
}]);
