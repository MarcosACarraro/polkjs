var clienteService = (function () {
    var _inserted = 0;
    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.skip == 0 && filtro.take == 0) {
            queryString = 'SELECT COUNT(*) AS Total FROM Cliente WHERE Nome LIKE ?';
        } else {
            queryString = "SELECT * FROM Cliente WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.NomeCliente + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, cliente, callback) {
        if (cliente.CodCliente === 0) {
            delete cliente.CodCliente;
            var query = db.query('INSERT INTO Cliente SET ?', cliente, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var dataNasc = new Date(cliente.DataNasc);
            var query = db.query("UPDATE  Cliente SET " +
                                  " Nome = ? ," +
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
                                  " Obs = ?  " +
                                  " WHERE CodCliente = ?",
                                  [cliente.Nome,
                                   cliente.Endereco,
                                   cliente.CEP,
                                   cliente.FoneCom,
                                   cliente.FoneRes,
                                   cliente.Celular,
                                   cliente.Email,
                                   cliente.RG,
                                   cliente.CPF,
                                   cliente.Sexo,
                                   cliente.Situacao,
                                   cliente.EstadoCivil,
                                   dataNasc,
                                   cliente.Obs,
                                   cliente.CodCliente],
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
        var query = db.query('DELETE FROM Cliente WHERE CodCliente = ?', [id], function (err, result) {
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

module.exports = clienteService;

