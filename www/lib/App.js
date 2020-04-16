var app = angular.module("app", 
[
    "ngRoute",
    'app.controller',
    'app.db',
    'app.compile'
]);
app.config(function($routeProvider) {
    
    $routeProvider

    .when("/", {
        templateUrl : "html/AnaSayfa.html"
    })
    .when("/PersonelTanimla", {
        templateUrl : "html/PersonelTanimla.html"
    })
    .when("/GemiTanimla", {
        templateUrl : "html/GemiTanimla.html"
    })
    .when("/IsEmriTanimla", {
        templateUrl : "html/IsEmriTanimla.html"
    })
    .when("/IsEmriHareket", {
        templateUrl : "html/IsEmriHareket.html"
    })
    .when("/IscilikOzetRaporu", {
        templateUrl : "html/raporlar/IscilikOzetRaporu.html"
    })
});