var storageDB = (function () {

    var _insert = function (strToken) {
        localStorage.setItem("token", strToken);
    }

    var _read = function (strUsuario, strToken) {
        var token = localStorage.getItem("token");
        return token;
    }

    return {
        insert: _insert,
        read: _read
    }

})();