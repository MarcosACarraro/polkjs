var router = require('./router');
var cidade = require('./cidadeService');
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
    cidade.select(db,function (rows) {
        res.write(JSON.stringify(rows));
        res.end();
    });
});

//db.end();