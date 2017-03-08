var profissaoService = (function () {
    var _inserted = 0;


    var _totalRecords = function (db, callback) {
        var queryString = 'SELECT COUNT(*) AS Total FROM Profissao';
        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _select = function (db, skip, take,callback) {
        var queryString = "SELECT * FROM Profissao limit "+ skip + ","+ take;
        var list = db.query(queryString, function (err, rows, fields) {
            //console.log(list.sql);
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }
    var _selectFiltro = function (db, filtro, callback) {
        var queryString = "SELECT * FROM Profissao WHERE DescProfissao LIKE ? limit 10";
        var list = db.query(queryString, '%' + filtro + '%', function (err, rows, fields) {
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
        selectFiltro: _selectFiltro,
        select: _select,
        save: _save,
        delete: _delete,
        totalRecords:_totalRecords
    }
})();

module.exports = profissaoService;

