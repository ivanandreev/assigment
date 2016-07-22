angular = require('angular');
require('angular-route');

angular.module('app', ['ngRoute']).config(function($routeProvider){
    
    $routeProvider
        .when('/',{
            templateUrl:'partials/countryList.html',
            controller: 'controller',
            resolve: {
                wikiService: ['wikiService', function(wikiService){
                    return wikiService;
                }]
            }
        })
        .when('/country/:id',{
            templateUrl:'partials/country.html',
            controller: 'countryCtrl',
            resolve: {
                wikiService: ['wikiService', function(wikiService){
                    return wikiService;
                }]
            }
        })
        .when('/state/:id',{
            templateUrl:'partials/state.html',
            controller: 'stateCtrl',
            resolve: {
                wikiService: ['wikiService', function(wikiService){
                    return wikiService;
                }]
            }
        })
        .otherwise({redirectTo: '/'});
});

require('controller');
require('wikiService');
require('sparqlQuery');


