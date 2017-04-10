var profissionalService = (function () {
    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM Profissional WHERE Nome LIKE ?';
        } else {
            queryString = "SELECT * FROM Profissional WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Nome + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, profissional, callback) {
        if (profissional.CodProfissional === 0) {
            delete profissional.CodProfissional;
            var query = db.query('INSERT INTO Profissional SET ?', profissional, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var dataNasc = null;

            if (profissional.DataNasc) dataNasc = new Date(profissional.DataNasc);
            var codCid = (profissional.CodCidade > 0) ? profissional.CodCidade : null;
            var codBai = (profissional.CodBairro > 0) ? profissional.CodBairro : null;
            var codGrupo = (profissional.CodGrupoAcesso > 0) ? profissional.CodGrupoAcesso : null;

            var query = db.query("UPDATE  Profissional SET " +
                                  " Login = ? ," +
                                  " Nome = ? ," +
                                  " Senha = ? ," +
                                  " CodGrupoAcesso = ? ," +
                                  " Endereco = ? ," +
                                  " CEP = ? , " +
                                  " FoneCom = ? , " +
                                  " FoneRes = ? , " +
                                  " Celular = ? , " +
                                  " Email = ? , " +
                                  " RG = ? , " +
                                  " CPF = ? , " +
                                  " Sexo = ? , " +
                                  " Situacao = ? , " +
                                  " EstadoCivil = ? , " +
                                  " DataNasc = ? , " +
                                  " CodCidade = ? , " +
                                  " CodBairro = ? , " +
                                  " Obs = ?  " +
                                  " WHERE CodProfissional = ?",
                                  [profissional.Login,
                                   profissional.Nome,
                                   profissional.Senha,
                                   codGrupo,
                                   profissional.Endereco,
                                   profissional.CEP,
                                   profissional.FoneCom,
                                   profissional.FoneRes,
                                   profissional.Celular,
                                   profissional.Email,
                                   profissional.RG,
                                   profissional.CPF,
                                   profissional.Sexo,
                                   profissional.Situacao,
                                   profissional.EstadoCivil,
                                   dataNasc,
                                   codCid,
                                   codBai,
                                   profissional.Obs,
                                   profissional.CodProfissional],
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
        var query = db.query('DELETE FROM Profissional WHERE CodProfissional = ?', [id], function (err, result) {
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

module.exports = profissionalService;


