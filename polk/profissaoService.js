var profissaoService = (function () {
    var _inserted = 0;
    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM Profissao WHERE DescProfissao LIKE ?';
        } else {
            queryString = "SELECT * FROM Profissao WHERE DescProfissao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.descProfissao + '%', function (err, rows, fields) {
            //console.log(list.sql);
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, profissao, callback) {
        if (profissao.CodProfissao === 0) {
            delete profissao.CodProfissao;
            var query = db.query('INSERT INTO Profissao SET ?', profissao, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Profissao SET DescProfissao = ? WHERE CodProfissao = ?', [profissao.DescProfissao, profissao.CodProfissao], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM Profissao WHERE CodProfissao = ?', [id], function (err, result) {
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
        delete: _delete
    }
})();

module.exports = profissaoService;

