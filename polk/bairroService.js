var bairroService = (function () {
    var _inserted = 0;

    var _select = function (db, callback) {
        var queryString = 'SELECT * FROM Bairro';
        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }
    var _selectFiltro = function (db, filtro, callback) {
        var queryString = 'SELECT * FROM Bairro WHERE NomeBairro LIKE ?';
        var list = db.query(queryString, '%' + filtro + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, bairro, callback) {
        if (bairro.CodBairro === 0) {
            delete bairro.CodBairro;
            var query = db.query('INSERT INTO Bairro SET ?', bairro, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Bairro SET NomeBairro = ?, CodCidade = ?  WHERE CodBairro = ?', [bairro.NomeBairro, bairro.CodCidade,bairro.CodBairro], function (err, result) {
                //console.log(bairro.CodCidade);
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM Bairro WHERE CodBairro = ?', [id], function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback();
        });
    }

    return {
        selectFiltro: _selectFiltro,
        select: _select,
        save: _save,
        delete: _delete,
    }
})();

module.exports = bairroService;

