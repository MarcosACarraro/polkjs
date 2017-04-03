var usuarioService = (function () {
    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM Usuario WHERE Nome LIKE ?';
        } else {
            queryString = " SELECT U.*, " +
                          " G.Descricao FROM Usuario U  "+
                          " INNER JOIN GrupoAcesso G on U.CodGrupoAcesso = G.CodGrupoAcesso" +
                          " WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
            //queryString = "SELECT * FROM Usuario WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Nome + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, usuario, callback) {
        if (usuario.CodUsuario === 0) {
            delete usuario.CodUsuario;
            var query = db.query('INSERT INTO Usuario SET ?', usuario, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var codGrupo = (usuario.CodGrupoAcesso > 0) ? usuario.CodGrupoAcesso : null;

            var query = db.query("UPDATE  Usuario SET " +
                                  " Login = ? ," +
                                  " Nome = ? ," +
                                  " Senha = ? , " +
                                  " Situacao = ? , " +
                                  " CodGrupoAcesso = ?  " +
                                  " WHERE CodUsuario = ?",
                                  [usuario.Login,
                                   usuario.Nome,
                                   usuario.Senha,
                                   usuario.Situacao,
                                   codGrupo,
                                   usuario.CodUsuario],
                                   function (err, result) {
                                       if (err) {
                                           console.log(err);
                                           throw err
                                       };
                                       callback(result);
                                   });
        }
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM Usuario WHERE CodUsuario = ?', [id], function (err, result) {
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

module.exports = usuarioService;


