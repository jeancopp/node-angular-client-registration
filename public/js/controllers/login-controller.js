angular.module("cadastro-cliente").controller("LoginController", function ($scope, $routeParams, $http,$routeScope) {
    $scope.teste = {};
    $scope.filtro = "";
    $scope.login = { usuario: "", password: "" };
    $scope.mensagem = "";

    $scope.entrar = function () {
        $http.post("/login", $scope.login)
            .success(function (data) {
                $routeScope = data;
            }).error(function (err) {
                $scope.mensagem = err.mensagem;
            });

    };



});

