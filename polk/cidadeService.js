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
    var _result = function () {
        return _inserted;
    }

    return {
        select: _select,
        insert: _insert,
        result: _result

    }
})();

module.exports = cidadeService;

