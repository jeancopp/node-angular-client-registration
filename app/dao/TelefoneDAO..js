"use strict";

class TelefoneDAO {

    constructor(){
        var configuracao = require("./../../package.json").database;
        var ConexaoFactory = require("./../factory/ConexaoFactory");
        this.__fabrica = new ConexaoFactory(configuracao);
    }
    listar(cliente,callback){
        var conexao = this.__fabrica.criar();
        conexao.query("select * from cliente_telefone where cliente = ?",[cliente],callback );
        conexao.end();
    }

    salvar(telefone,callback){
        var conexao = this.__fabrica.criar();
        conexao.query("insert into cliente_telefone set ?",telefone,callback);
        conexao.end();
    }
    atualizar(telefone, callback){
       var conexao = this.__fabrica.criar();
        conexao.query("update cliente_telefone set numero = ?, ddd = ? where codigo = ? and cliente = ?",
            [telefone.numero, telefone.ddd, telefone.codigo, telefone.cliente ],callback);
        conexao.end();
    }
    remover(telefone,callback){
       var conexao = this.__fabrica.criar();
        conexao.query("delete from cliente_telefone where codigo = ?",[telefone.codigo],callback);
        conexao.end();
    }
}


module.exports = () => TelefoneDAO;