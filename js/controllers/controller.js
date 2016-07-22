
angular = require('angular');

angular.module('app').controller('controller',function ($scope, wikiService, sparqlQuery){

    wikiService.getSparql(sparqlQuery.getCountryListQuery()).then(function(data){
        $scope.countries = data;
    });
});

angular.module('app').controller('countryCtrl',function ($scope, wikiService, sparqlQuery, $routeParams){
    wikiService.getSparql(sparqlQuery.getCountryInfoQuery($routeParams.id)).then(function(data){
        $scope.country = data[0];
    });

    wikiService.getSparql(sparqlQuery.getCountrySharesBorderQuery($routeParams.id)).then(function(data){
        $scope.sharesBorder = data;
    });    

    wikiService.getSparql(sparqlQuery.getCountryRegionOrStateQuery($routeParams.id)).then(function(data){
        $scope.states = data;
    });  
});

angular.module('app').filter('splitLink', function() {
        return function(input, splitChar, splitIndex) {            
            var arr = input.split(splitChar);
            return arr[arr.length-1];
        }
    });