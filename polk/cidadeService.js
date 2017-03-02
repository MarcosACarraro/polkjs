var cidadeService = (function () {
    var _inserted = 0;

    var _select = function (db,callback) {
         var queryString = 'SELECT * FROM Cidade';
         var list = db.query(queryString, function (err, rows, fields) {
             if (err) {
                 console.log(err);
                 throw err
             };
             callback(rows)
         });
    }

    var _insert = function (db, cidade,callback) {
        var query = db.query('INSERT INTO Cidade SET ?', cidade, function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(result.insertId);
        });
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM Cidade WHERE CodCidade = ?', [id], function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback();
        });
    }

    var _update = function (db, id,Nome, callback) {
        var query = db.query('UPDATE  Cidade SET NomeCidade = ? WHERE CodCidade = ?', [id, Nome], function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback();
        });
    }

    return {
        select: _select,
        insert: _insert,
        delete: _delete,
        update: _update
    }
})();

module.exports = cidadeService;

