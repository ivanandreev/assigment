angular = require('angular');

angular.module('app').controller('controller',function ($scope, wikiService, sparqlQuery){

    wikiService.getSparql(sparqlQuery.getCountryListQuery()).then(function(data){
        $scope.countries = data;
    });
});

angular.module('app').controller('countryCtrl',function ($scope, wikiService, sparqlQuery, $routeParams){
    $scope.idCountry = $routeParams.id;
    
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

angular.module('app').controller('stateCtrl',function ($scope, wikiService, sparqlQuery, $routeParams){
    wikiService.getSparql(sparqlQuery.getCityListOfStateQuery($routeParams.idCountry, $routeParams.idState)).then(function(data){
        $scope.cities = data;
    });

    wikiService.getSparql(sparqlQuery.getStateInfoQuery($routeParams.idCountry, $routeParams.idState)).then(function(data){
        $scope.city = data[0];
    });
});

angular.module('app').filter('splitLink', function() {
        return function(input, splitChar) {            
            var arr = input.split(splitChar);
            return arr[arr.length-1];
        }
    });