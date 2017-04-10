var router = require('./router');
var cidadeService = require('./cidadeService');
var profissaoService = require('./profissaoService');
var bairroService = require('./bairroService');
var clienteService = require('./clienteService');
var grupoAcessoService = require('./grupoAcessoService');
var usuarioService = require('./usuarioService');
var profissionalService = require('./profissionalService');

var connection = require('./connection');

var fs = require('fs');

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

app.get('/cidade', function (req, res) {

    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            descCidade: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        cidadeService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
   
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        cidadeService.delete(db, id, function (err, result) {
            if (err) {
                res.end('{"error" : "error", "status" : 500}');
            };
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/cidade', function (req, res) {
    var body = req.body;
    var cidade = JSON.parse(body);
    cidadeService.save(db, cidade, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/profissao', function (req, res) {
    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            descProfissao: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        profissaoService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
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

app.post('/bairro', function (req, res) {
    var body = req.body;
    var bairro = JSON.parse(body);
    bairroService.save(db, bairro, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/bairro', function (req, res) {

    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            CodCidade: req.parameters[0].value
        };

        
        bairroService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
  
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        bairroService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});


app.get('/login', function (req, res) {

    fs.readFile('Login.html', function (err, html) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        }
    });
});

app.get('/cliente', function (req, res) {

    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            NomeCliente: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        clienteService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }

    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        clienteService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/cliente', function (req, res) {
    var body = req.body;
    var cidade = JSON.parse(body);
    clienteService.save(db, cidade, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/profissional', function (req, res) {

    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            Nome: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        profissionalService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }

    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        profissionalService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/profissional', function (req, res) {
    var body = req.body;
    var profissional = JSON.parse(body);
    profissionalService.save(db, profissional, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/grupoAcessoService', function (req, res) {
    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            Descricao: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        grupoAcessoService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        grupoAcessoService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/grupoAcessoService', function (req, res) {
    var body = req.body;
    var grupoAcesso = JSON.parse(body);
    grupoAcessoService.save(db, grupoAcesso, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/usuario', function (req, res) {

    if (req.parameters[0].parameter === "Select") {

        var filtro = {
            Nome: req.parameters[0].value,
            skip: req.parameters[1].value,
            take: req.parameters[2].value,
        };

        usuarioService.select(db, filtro, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }

    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        usuarioService.delete(db, id, function (rows) {
            res.end('{"success" : "success", "status" : 200}');
        });
    }
});

app.post('/usuario', function (req, res) {
    var body = req.body;
    var usuario = JSON.parse(body);
    usuarioService.save(db, usuario, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});
