var grupoAcessoService = (function () {


    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM GrupoAcesso WHERE Descricao LIKE ?';
        } else {
            queryString = "SELECT * FROM GrupoAcesso WHERE Descricao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Descricao + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, grupoAcesso, callback) {
        if (grupoAcesso.CodGrupoAcesso === 0) {
            delete grupoAcesso.CodGrupoAcesso;
            var query = db.query('INSERT INTO GrupoAcesso SET ?', grupoAcesso, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  GrupoAcesso SET Descricao = ?  WHERE CodGrupoAcesso = ?', [grupoAcesso.Descricao, grupoAcesso.CodGrupoAcesso], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM GrupoAcesso WHERE CodGrupoAcesso = ?', [id], function (err, result) {
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
    }
})();

module.exports = grupoAcessoService;
