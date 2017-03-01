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
    cidadeService.select(db, function (rows) {
        res.write(JSON.stringify(rows));
        res.end();
    });
});

app.post('/cidades', function (req, res) {

    //console.log(res);
    var body = req.body;

    var cidade = JSON.parse(body);
    
    //cidadeService.insert(db, cidade);
    //res.end();
    
    cidadeService.insert(db, cidade, function (id) {
        //console.log(id);
        res.send(id);
    });
    res.end();
    //console.log(cidadeService.result());

    //cidadeService.insert(db, cidade, function (result) {
    //      //console.log(result);
    //    //console.log(result.insertId);
    //    //res.write({ success: "success" });
    //    //s.end();
    //});
    //res.end();
});


//db.end();