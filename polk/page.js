var router = require('./router');
var cidadeService = require('./cidadeService');
var profissaoService = require('./profissaoService');
var connection = require('./connection');
var db = connection.db;
db.connect();

var app = router(3412);

app.interceptor(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.interceptor(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    next();
});

app.get('/cidades', function (req, res) {
    if (req.parameters[0].parameter === "Select" && req.parameters[0].value === "All") {
        cidadeService.select(db, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    } else {
        if (req.parameters[0].parameter === "Select") {
            var filtro = req.parameters[0].value;
            cidadeService.selectFiltro(db, filtro, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        cidadeService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/cidades', function (req, res) {
    var body = req.body;
    var cidade = JSON.parse(body);
    cidadeService.save(db, cidade, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/profissao', function (req, res) {
    if (req.parameters[0].parameter === "Select" && req.parameters[0].value === "All") {
        profissaoService.select(db, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    } else {
        if (req.parameters[0].parameter === "Select") {
            var filtro = req.parameters[0].value;
            profissaoService.selectFiltro(db, filtro, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        profissaoService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/profissao', function (req, res) {
    var body = req.body;
    var profissao = JSON.parse(body);
    profissaoService.save(db, profissao, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


//db.end();