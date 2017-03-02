var router = require('./router');
var cidadeService = require('./cidadeService');
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
    }
    if (req.parameters[0].parameter === "Delete") {
        var id = req.parameters[0].value;
        cidadeService.delete(db, id, function (rows) {
            //console.log(id);
            res.end();
        });
    }
    if (req.parameters[0].parameter === "Update") {
        var id = req.parameters[1].value;
        var Nome = req.parameters[2].value;
        cidadeService.delete(db, id,Nome, function (rows) {
            //console.log(id);
            res.end();
        });
    }
});

app.post('/cidades', function (req, res) {
    var body = req.body;
    var cidade = JSON.parse(body);

    cidadeService.insert(db, cidade, function (id) {
        //console.log(id);
    });
    res.end();
});


//db.end();