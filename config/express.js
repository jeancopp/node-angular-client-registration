"use strict"


class ConfiguraExpress {

    constructor() {
        var express =  require("express");
        this.app = express();
        var bodyParser = require('body-parser');
        var validator = require("express-validator");

        this.app.use(express.static('./public'));

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(bodyParser.json());
        this.app.use(validator());

    }

    run(port, startFunction) {
        return this.app.listen(port, startFunction);
    }

    getServer() {
        return this.app;
    }

}


module.exports = new ConfiguraExpress();