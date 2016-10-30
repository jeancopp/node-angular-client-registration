angular.module("cadastro-cliente").controller("HomeController", function ($scope, $routeParams, $http) {
	$scope.clientes = {};
	$scope.filtro = "";
	$http.get("/cliente").success(function (data) {
		$scope.clientes = data;
	}).error(function (error) {
		$scope.mensagem = error.mensagem;
	})

	$scope.remover = function (cliente) {
		$http.delete("/cliente/" + cliente.codigo)
			.success(function (data) {
				var indice = $scope.clientes.indexOf(cliente);
				$scope.clientes.splice(indice, 1);
				$scope.mensagem = 'Cliente ' + cliente.nome + ' removida com sucesso!';
			}).error(function (erro) {
				console.log(erro);
			})
	};

});

