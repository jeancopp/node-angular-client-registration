var ClienteDAO = require("./../dao/ClienteDAO");
var Cliente = require("./../model/Cliente");

var retorno = function (status, res, valor) {
    res.status(status).json(valor);
};


var retornoCorreto = (res, valor) => retorno(200, res, valor)
var retornoErro = (res, valor) => retorno(403, res, valor)


module.exports = function (app) {
    var clienteDAO = new ClienteDAO();
    app.route("/cliente")
        .get(function (req, res) {
            clienteDAO.listarTodos(
                clientes => retornoCorreto(res, clientes),
                error => retornoErro(res, error)
            );

        })
        .post(function (req, res) {
            console.log(req.body);
            var error = Cliente.isValid(req);
            console.log(JSON.stringify(error));
            if (error && error.length > 0) {
                retornoErro(res, JSON.stringify({ mensagem: "Cliente inválido!", erros: error }));
            }
            else {
                var cliente = new Cliente(req.body);
                clienteDAO.salvar(
                    cliente,
                    cliente => retornoCorreto(res, cliente),
                    error => retornoErro(res, error)
                );
            }
        }).put(function (req, res) {
            var error = Cliente.isValid(req, req => req.checkBody('codigo', 'Codigo não informado').notEmpty().isInt());
            if (error) {
                retornoErro(res, { mensagem: "Cliente inválido!", erros: error })
            } else {
                var cliente = new Cliente(req.body);
                console.log(cliente);

                clienteDAO.atualizar(cliente,
                    cliente => retornoCorreto(res, cliente),
                    error => retornoErro(res, error)
                );
            }
        });

    app.route("/cliente/:codigo")
        .get(function (req, res) {
            req.checkParams('codigo', 'Codigo não informado').notEmpty().isInt();
            var codigoInvalido = req.validationErrors();

            if (codigoInvalido) {
                retornoErro(res, { mensagem: "Cliente inválido!", erros: codigoInvalido })
            } else {
                    clienteDAO.listar(
                    req.params.codigo,
                    clientes => retornoCorreto(res, clientes),
                    error => retornoErro(res, error)
                );
            }
        }).delete(function (req, res) {
            req.checkParams('codigo', 'Codigo não informado').notEmpty().isInt();
            var codigoInvalido = req.validationErrors();

            if (codigoInvalido) {
                retornoErro(res, { mensagem: "Cliente inválido!", erros: codigoInvalido })
            } else {
                clienteDAO.remover(req.params.codigo,
                    clientes => retornoCorreto(res, clientes),
                    error => retornoErro(res, error)
                );
            }
        });
}

