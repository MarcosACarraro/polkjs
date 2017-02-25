var lateral = (function () {

    var _create = function () {
        var _divRow = window.document.getElementById("lateralDiv");
        _divRow.setAttribute("class", "row affix-row");
 
        var _divSide = window.document.createElement("div");
        _divSide.setAttribute("class", "col-sm-3 col-md-2 affix-sidebar");
        _divRow.appendChild(_divSide);

        var _divSideNav = window.document.createElement("div");
        _divSideNav.setAttribute("class", "sidebar-nav");
        _divSide.appendChild(_divSideNav)

        var _divNave= window.document.createElement("div");
        _divNave.setAttribute("class", "navbar navbar-default");
        _divNave.setAttribute("role", "navigation");
        _divSideNav.appendChild(_divNave);

        var _divHeader = window.document.createElement("div");
        _divHeader.setAttribute("class", "navbar-header");
        _divNave.appendChild(_divHeader);

        var _button = window.document.createElement("button");
        _button.setAttribute("class", "navbar-toggle");
        _button.setAttribute("data-toggle", "collapse");
        _button.setAttribute("data-target", ".sidebar-navbar-collapse");

        var _icon1 = window.document.createElement("span");
        _icon1.setAttribute("class", "icon-bar");
        var _icon2 = window.document.createElement("span");
        _icon2.setAttribute("class", "icon-bar");
        var _icon3 = window.document.createElement("span");
        _icon3.setAttribute("class", "icon-bar");

        _button.appendChild(_icon1);
        _button.appendChild(_icon2);
        _button.appendChild(_icon3);

        _divHeader.appendChild(_button);

        var _spanVisible = window.document.createElement("span");
        _spanVisible.setAttribute("class", "visible-xs navbar-brand");
        _spanVisible.innerHTML = "Menu Lateral";
        _divHeader.appendChild(_spanVisible);

        var _divCollapse = window.document.createElement("div");
        _divCollapse.setAttribute("class", "navbar-collapse collapse sidebar-navbar-collapse");
        _divNave.appendChild(_divCollapse);

        var _ul = window.document.createElement("ul");
        _ul.setAttribute("id", "sidenav01");
        _ul.setAttribute("class", "nav navbar-nav");
        _divCollapse.appendChild(_ul);

        var _li1 = window.document.createElement("li");
        _li1.setAttribute("class", "active");
        _ul.appendChild(_li1);


        var _menu1 = window.document.createElement("a");
        _menu1.setAttribute("href", "#");
        _menu1.setAttribute("class", "collapsed");
        _menu1.setAttribute("data-toggle", "collapse");
        _menu1.setAttribute("data-target", "#toggleDemo0");
        _menu1.setAttribute("data-parent", "#sidenav01");
        _menu1.innerHTML = "<h4>Cadastro</h4>";
        _li1.appendChild(_menu1);
       
        var _li2 = window.document.createElement("li");
        _ul.appendChild(_li2);

        var _menu2 = window.document.createElement("a");
        _menu2.setAttribute("class", "collapsed");
        _menu2.setAttribute("data-toggle", "collapse");
        _menu2.setAttribute("data-target", "#toggleDemo0");
        _menu2.setAttribute("data-parent", "#sidenav01");
        _menu2.setAttribute("href", "#");
        _menu2.innerHTML = "Cadastro";
        _li2.appendChild(_menu2);

        var _content = window.document.createElement("div");
        _content.setAttribute("class", "col-sm-9 col-md-10 affix-content");
        _divRow.appendChild(_content)

        var _container = window.document.createElement("div");
        _container.setAttribute("class", "container");
        _content.appendChild(_container)

        var _header = window.document.createElement("div");
        _header.setAttribute("class", "page-heade");
        _header.innerHTML = "<h3><span class='glyphicon glyphicon-th-list'></span>&nbsp;Cidades</h3>";
        _container.appendChild(_header);


        var _grid = window.document.createElement("div");
        _grid.setAttribute("id", "tableGrid");
        _header.appendChild(_grid);


    }

    return {
        create:_create
    }
})();