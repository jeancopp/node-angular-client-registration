"use strict";

var Optional = require('optional-js');

class Telefone {

    constructor(telefone) {
        this.numero = telefone.numero;
        this.ddd = telefone.ddd;
    }

}

module.exports = Telefone;

var telefoneValido = function (telefone,outrasValidacoes) {
    var erro = [];
    if(!telefone.numero || !telefone.numero.match(/^((\d \d{4}|\d{4,5})\s?-?\s?\d{4})$/)) 
        erro.push({param : "telefone.numero", value: telefone.numero || "", msg:"Telefone inválido"}) 
    if(!telefone.ddd || !telefone.ddd.match(/^\d{2,3}$/)) 
        erro.push({param : "telefone.ddd", value: telefone.ddd || "", msg:"DDD inválido"})
    
    if(outrasValidacoes) outrasValidacoes(telefone);
    return !erro.length ? erro : null ;

};
module.exports.isValid = telefoneValido;
module.exports.areValids = function(telefones,outrasValidacoes){
    var erros = [];
    for(var indice in telefones){
        Optional.ofNullable(telefoneValido(telefones[indice])).ifPresent( ret => erros.push(ret) );
    }
    return erros;
}
