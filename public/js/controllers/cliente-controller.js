
angular.module("cadastro-cliente").controller("ClienteController", function ($scope, $routeParams, $http) {
    $scope.cliente = { telefones: [], imagem: null };
    $scope.mensagem = {};

    $scope.uploadme = {};
    $scope.uploadme.src = "";

    if ($routeParams.cliente) {
        $http.get("/cliente/" + $routeParams.cliente).success(function (data) {
            $scope.cliente = data;
            if (!$scope.cliente.telefones) $scope.cliente.telefones = [];
            if (!$scope.cliente.imagem) $scope.cliente.imagem = null;
        }).error(function (error) {
            $scope.mensagem = error.mensagem;
        })
    }

    var mensagemErro = ret => {
        $scope.mensagem.class = "alert alert-danger";
        $scope.mensagem.texto = ret.mensagem;
        for (var e in ret.erros) $scope.mensagem.texto += ret.erros[e].msg;
    };

    $scope.submeter = function () {
        (!$scope.cliente.codigo ? $http.post : $http.put)('/cliente', $scope.cliente)
            .success(function (ret) {
                $scope.mensagem.texto = "Cliente Adicionado com sucesso";
                $scope.mensagem.class = "alert alert-success";
                console.log(ret);
                $scope.cliente.codigo = ret.codigo;
            }).error(mensagemErro);
    };
    
    $scope.add = function () {
        $scope.cliente.telefones.push({ ddd: "", numero: "" });
    };

    $scope.removerTelefone = function (telefone) {
        var indice = $scope.cliente.telefones.indexOf(telefone);
        $scope.cliente.telefones.splice(indice, 1);
    };
});