var path = require('path');

module.exports = function(app){
    require('./../controller/ClienteController')(app);

    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
}