"use strict";

class ClienteDAO {

    constructor(){
        var configuracao = require("./../../package.json").database;
        var ConexaoFactory = require("./../factory/ConexaoFactory");
        this.__fabrica = new ConexaoFactory(configuracao);
        this.__callbackBanco = (err,resultado,callback,error,fields)=>{
            if(err) {
                console.log(err);
                if(err.code && err.code === "ECONNREFUSED"){
                    error({ mensagem: "Não foi possível conectar com o banco de dados"});
                }
                else error({ mensagem: "Erro inexperado"});
            }
            else {
                if( resultado instanceof Array && resultado.length===1)
                    callback(resultado[0]);
                else
                    callback(resultado);
            }
        };
    }
    listarTodos(callbackSucesso,callbackError){
        var conexao =  this.__fabrica.criar();
        conexao.connect();
        conexao.query("select * from cliente",(err,r)=>this.__callbackBanco(err,r,callbackSucesso,callbackError));
        conexao.end();
    }
    
    listar(codigo,callbackSucesso,callbackError){
        var conexao = this.__fabrica.criar();
        conexao.query("select * from cliente where codigo = ?",[codigo], (err,r)=> this.__callbackBanco(err,r,callbackSucesso,callbackError ) );
        conexao.end();
    }

    salvar(cliente,callbackSucesso,callbackError){
        var conexao = this.__fabrica.criar();
        conexao.query("insert into cliente set ?",cliente,
        (err,r)=> {
            cliente.codigo = r && r.insertId ? r.insertId : 0;
            this.__callbackBanco(err,cliente,callbackSucesso,callbackError)
        });
        conexao.end();
    }
    atualizar(cliente, callbackSucesso, callbackError){
       var conexao = this.__fabrica.criar();
        conexao.query("update cliente set nome = ?, cpf = ?, rg = ?, email =?, imagem = ? where codigo = ?",
            [cliente.nome, cliente.cpf, cliente.rg, cliente.email, cliente.imagem, cliente.codigo ],
            (err,r)=>{
                if( err || (!err && r.affectedRows && r.changedRows) ) this.__callbackBanco(err,cliente,callbackSucesso,callbackError);
                else if( !r.affectedRows ) callbackError({mensagem:"Registro não encontrado"});
                else callbackError({mensagem:"Registro não modificado"});

            }
        );
        conexao.end();
    }
    remover(cliente,callbackSucesso,callbackError){
       var conexao = this.__fabrica.criar();
        conexao.query("delete from cliente where codigo = ?",[cliente.codigo],(err,r)=>{
           console.log(r);
            this.__callbackBanco(err,r,callbackSucesso,callbackError);
        });
        conexao.end();
    }
}


module.exports = ClienteDAO;