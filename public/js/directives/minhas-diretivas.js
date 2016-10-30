angular.module('cadastro-cliente')
    .directive("meuPainel", function () {
        return {
            restric: "AE",
            scope: {
                titulo: "@",
                css: "@"
            },
            transclude: true,
            templateUrl: 'js/directives/meu-painel.html'
        };
    }).directive("minhaImagem", function () {
        return {
            restric: "E",
            scope: {
                imagem: "@",
                titulo: "@"
            },
            template: '<img class="img-responsive center-block ng-scope" src="{{imagem}}">'
        }
    }).directive("botaoRemocao", function () {
        return {
            restric: "E",
            scope: {
                click: "&",
                nome: "@"
            },
            template: ' <buttton class="btn btn-danger btn-block" ng-click="click()">{{nome}}</buttton>'
        };
    });
    