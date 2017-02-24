var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "100senha",
    database:"bd_Sistema"
});

connection.connect();

var profissao = {
    DescProfissao: "Analista"
};

var query = connection.query("insert into Profissao set ?", profissao, function (err, result) {
    console.log(query);

    if (err) {
        console.error(err);
        return;
    }
    //console.error(result);
    console.log(result.insertId);
});