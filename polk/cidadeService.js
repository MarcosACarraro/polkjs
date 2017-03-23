var cidadeService = (function () {
    var _inserted = 0;

    var _totalRecords = function (db, callback) {
        var queryString = 'SELECT COUNT(*) AS Total FROM Cidade';
        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM Cidade WHERE NomeCidade LIKE ?';
        } else {
            queryString = "SELECT * FROM Cidade WHERE NomeCidade LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.descCidade + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, cidade, callback) {
        if (cidade.CodCidade === 0) {
            delete cidade.CodCidade;
            var query = db.query('INSERT INTO Cidade SET ?', cidade, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Cidade SET NomeCidade = ? ,Estado = ? WHERE CodCidade = ?', [cidade.NomeCidade, cidade.Estado,cidade.CodCidade], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
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

    return {
        select: _select,
        save: _save,
        delete: _delete,
        totalRecords: _totalRecords
     }
})();

module.exports = cidadeService;

