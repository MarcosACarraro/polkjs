var menu = (function () {

    var _create = function () {

        var _user = storageDB.read();
        
        var _menuDiv = window.document.getElementById("menuDiv");

        var _nav = window.document.createElement("nav");
        _nav.setAttribute("class", "navbar navbar-default toppolk");
        _menuDiv.appendChild(_nav);

        var _container = window.document.createElement("div");
        _container.setAttribute("class", "container-fluid");
        _nav.appendChild(_container);

        var _header = window.document.createElement("div");
        _header.setAttribute("class", "navbar-header");
        _container.appendChild(_header);

        var _brand = window.document.createElement("a");
        _brand.setAttribute("class", "navbar-brand titlepolk");
        _brand.setAttribute("href", "#");
        _brand.innerHTML = "<span class='glyphicon glyphicon-globe'></span>&nbsp;Polk System";
        _header.appendChild(_brand);

        var _collapse = window.document.createElement("div");
        _collapse.setAttribute("class", "collapse navbar-collapse");
        _collapse.setAttribute("id", "myNavbar");
        
        var _ul = window.document.createElement("ul");
        _ul.setAttribute("class", "nav navbar-nav navbar-right");
        var _li = window.document.createElement("li");
        _ul.appendChild(_li)

        var _login = window.document.createElement("a");
        _login.setAttribute("class", "titlepolk");
        _login.setAttribute("href", "#");
        _login.innerHTML = "<span class='glyphicon glyphicon-user'></span>&nbsp;"+ _user+ "</a>";
        _li.appendChild(_login);

        var _li2 = window.document.createElement("li");
        _ul.appendChild(_li2)

        var _off = window.document.createElement("a");
        _off.setAttribute("class", "titlepolk");
        _off.setAttribute("href", "#");
        _off.setAttribute("onclick", "javascript:menu.logOff();")
        _off.innerHTML = "<span class='glyphicon glyphicon-off'></span></a>";
        _li2.appendChild(_off);

        _container.appendChild(_collapse);
        _collapse.appendChild(_ul);

    }

    var _logOff = function() {
        storageDB.insert('');
        window.location = "Login.html";

    }

    return {
        create: _create,
        logOff: _logOff
    }
})();