angular.module('ClienteService', ['ngResource'])
    .factory('clienteService', function ($resource) {

        return $resource('/cliente/:clienteCodigo', null, {
            'update': {
                method: 'PUT'
            }
        });
    })
    .factory('cadastroCliente', function (clienteService, $q) {
        var funcaoErro = function (reject,cliente,erro) {
            console.log(erro);
            reject({
                mensagem: 'Não foi possível atualizar o Cliente'
            });
        };
        var retorno = (cliente,isInclusao) => {
            return {
                mensagem: 'Cliente ' + cliente.titulo + ' atualizada/incluída com sucesso',
                inclusao: isInclusao
            }
        };
        return {
            cadastrar: (cliente) => $q(function (resolve, reject) {
                    if (cliente.codigo) {
                        clienteService.update(
                            { clienteCodigo: cliente.codigo }, 
                            cliente, 
                            (() => resolve(retorno(cliente,true))), 
                            ((erro)=> funcaoErro(reject,cliente,erro))
                         );
                    } else {
                        clienteService.save(
                            cliente,
                            (() => resolve(retorno(cliente,false))), 
                            ((erro)=> funcaoErro(reject,cliente,erro))
                         );
                    }
                })
            
        };
    });

