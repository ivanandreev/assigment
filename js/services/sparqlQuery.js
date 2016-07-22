angular = require('angular');

angular.module('app').service('sparqlQuery',function(){

    this.getCountryListQuery = function(){

        return "SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel\n" +
            "WHERE { \n" +
            "?country wdt:P31 wd:Q3624078 .\n" +
            "FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}\n" +
            "OPTIONAL { ?country wdt:P36 ?capital } .\n" +
            "SERVICE wikibase:label { bd:serviceParam wikibase:language 'en' }\n" +
            "}\n" +
            "ORDER BY ?countryLabel\n";        
    }

    this.getCountryInfoQuery = function(id) {
        return "SELECT DISTINCT ?_flag_image ?countryLabel ?_currencyLabel ?_population ?_capitalLabel ?_official_languageLabel ?_head_of_stateLabel WHERE { \n" + 
                      "SERVICE wikibase:label { bd:serviceParam wikibase:language 'en'. } \n" + 
                      "?country wdt:P31 wd:Q6256. \n" + 
                      "?country wdt:P17 wd:" + id + " \n" + 
                      "OPTIONAL { ?country wdt:P41 ?_flag_image . } \n" + 
                      "OPTIONAL { ?country wdt:P38 ?_currency . } \n" + 
                      "OPTIONAL { ?country wdt:P1082 ?_population . } \n" + 
                      "OPTIONAL { ?country wdt:P36 ?_capital . } \n" + 
                      "OPTIONAL { ?country wdt:P37 ?_official_language . } \n" + 
                      "OPTIONAL { ?country wdt:P35 ?_head_of_state . } \n" + 
                    "} \n" + 
                    "LIMIT 1";        
    }

    this.getCountrySharesBorderQuery = function(id) {
        return "SELECT DISTINCT ?countryLabel ?_shares_border_withLabel ?_shares_border_with WHERE { \n" + 
                  "SERVICE wikibase:label { bd:serviceParam wikibase:language 'en'. } \n" + 
                  "?country wdt:P31 wd:Q6256. \n" + 
                  "?country wdt:P17 wd:" + id + ". \n" +   
                  "OPTIONAL { ?country wdt:P47 ?_shares_border_with. } \n" + 
                "} ORDER BY (?_shares_border_withLabel)";
    }

    this.getCountryRegionOrStateQuery = function(id) {
        return "SELECT DISTINCT ?state_regionLabel ?state_region WHERE { \n" + 
                  "SERVICE wikibase:label { bd:serviceParam wikibase:language 'en'. } \n" + 
                  "?country wdt:P31 wd:Q6256. \n" + 
                  "?country wdt:P17 wd:" + id + ". \n" + 
                  "OPTIONAL { ?country wdt:P150 ?state_region. } \n" + 
                "} ORDER BY (?state_regionLabel)";
    }
});
