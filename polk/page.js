var router = require('./router');
var cidadeService = require('./cidadeService');
var profissaoService = require('./profissaoService');
var bairroService = require('./bairroService');
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
        var _skip = req.parameters[1].value;
        var _take = req.parameters[2].value;
        profissaoService.select(db,_skip, _take,function (rows) {
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
    if (req.parameters[0].parameter === "Count") {
        profissaoService.totalRecords(db, function (rows) {
            //console.log(rows);
            res.write(JSON.stringify(rows));
            res.end();
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

app.post('/bairro', function (req, res) {
    var body = req.body;
    var bairro = JSON.parse(body);
    bairroService.save(db, bairro, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/bairro', function (req, res) {
    if (req.parameters[0].parameter === "Select" && req.parameters[0].value === "All") {
        bairroService.select(db, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    } else {
        if (req.parameters[0].parameter === "Select") {
            var filtro = req.parameters[0].value;
            bairroService.selectFiltro(db, filtro, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        bairroService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});



//db.end();