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
    .when("/IsEmriTanimla", {
        templateUrl : "html/IsEmriTanimla.html"
    })
    .when("/IsEmriHareket", {
        templateUrl : "html/IsEmriHareket.html"
    })
});