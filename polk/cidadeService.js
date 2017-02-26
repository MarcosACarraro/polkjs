var cidadeService = (function () {
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
    return {
        select: _select
    }
})();

module.exports = cidadeService;

