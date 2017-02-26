var menu = (function () {

    var _create = function () {
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

    }

    return {
        create:_create
    }
})();