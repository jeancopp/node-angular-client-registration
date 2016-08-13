"use strict";


class ConexaoFactory{

    constructor(configuration){
        this.__configuration = configuration;
    }

    criar(){
        var mysql = require("mysql");
        return mysql.createConnection(this.__configuration);
    }
    
}

module.exports = ConexaoFactory ;