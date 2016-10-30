
var package = require("./package.json");
/**
 * Lemos as configurações padrões, que ficaram dispostas no package.json
 */
var serverOptions = package.server;
global.database = package.database;

console.log("Lendo arquivo de callback do serviço:" + serverOptions.startFunction)
var startFunction = require(serverOptions.startFunction);

console.log("Lendo arquivo de configuração do app:" + serverOptions.configuration)
var app = require(serverOptions.configuration);

console.log("Configurando as rotas: " + serverOptions.routingFile);
var server = app.getServer();
require(serverOptions.routingFile)(server);

console.log("Inicializando o servidor - Porta : " + serverOptions.port);
app.run(serverOptions.port,startFunction);

