angular.module('cadastro-cliente', ["ngAnimate", "ngRoute","ngResource"])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/index', {
            controller: "HomeController",
            templateUrl: "/partials/principal.html"
        }).when('/cadastro/:cliente', {
            controller: "ClienteController",
            templateUrl: "/partials/cliente/formulario.html"
        }).when('/cadastro', {
            controller: "ClienteController",
            templateUrl: "/partials/cliente/formulario.html"
        }).when('/login',{
            controller: "LoginController",
            templateUrl: "/partials/login.html"
        }).otherwise({
            redirectTo: "/index"
        });
    });