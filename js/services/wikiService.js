angular = require('angular');

angular.module('app').factory('wikiService',function($http, $q){
    
    var baseAPI = "https://query.wikidata.org/bigdata/namespace/wdq/sparql?";

    return {        
        getSparql: function(query){
            var requestURL = baseAPI + "format=json&query=" + query;
            return $http.get(requestURL).then(function(response){
                return response.data.results.bindings;
            });
        }
    }
});
