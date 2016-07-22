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
            templateUrl:'partials/countryInfo.html',
            controller: 'countryCtrl',
            resolve: {
                wikiService: ['wikiService', function(wikiService){
                    return wikiService;
                }]
            }
        })
        .when('/country/:idCountry/:idState',{
            templateUrl:'partials/stateInfo.html',
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
require('navigation');


