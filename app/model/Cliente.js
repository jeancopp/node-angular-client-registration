"use strict";

var Optional = require('optional-js');

class Cliente {

    constructor(cliente) {

        Optional.ofNullable(cliente.codigo)
                .ifPresent(codigo => this.codigo = codigo);

        Optional.ofNullable(cliente.rg)
                .ifPresent(rg => this.rg = rg);
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.cpf = cliente.cpf.replace(/(\.|-|\/)/g, ''); 
    }

}

module.exports = Cliente;

module.exports.isValid = function (req,outrasValidacoes) {

    req.checkBody('codigo', 'Codigo tem que ser inteiro').optional().isInt();
    req.checkBody('nome', 'Nome do cliente não pode estar em branco').notEmpty();
    req.checkBody('email', 'E-mail inválido').isEmail();
    req.checkBody('cpf', 'CPF inválido').notEmpty().matches("^\\d{3}[.-]?\\d{3}[.-]?\\d{3}(\\.|-|/)?\\d{2}$");
    if(outrasValidacoes) outrasValidacoes(req);
    return req.validationErrors();

};