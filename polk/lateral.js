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
        //_menu1.innerHTML = "<h4>Cadastro</h4>";
        _menu1.innerHTML = "Cadastro";
        _li1.appendChild(_menu1);
       
        var _li2 = window.document.createElement("li");
        _ul.appendChild(_li2);
        var _menu2 = window.document.createElement("a");
        _menu2.setAttribute("class", "collapsed");
        _menu2.setAttribute("data-toggle", "collapse");
        _menu2.setAttribute("data-target", "#toggleDemo0");
        _menu2.setAttribute("data-parent", "#sidenav01");
        _menu2.setAttribute("href", "Cidade.html");
        _menu2.innerHTML = "<span class='glyphicon glyphicon-align-justify'></span>&nbsp;Cidade";
        _li2.appendChild(_menu2);

        var _li3 = window.document.createElement("li");
        _ul.appendChild(_li3);
        var _menu3 = window.document.createElement("a");
        _menu3.setAttribute("class", "collapsed");
        _menu3.setAttribute("data-toggle", "collapse");
        _menu3.setAttribute("data-target", "#toggleDemo0");
        _menu3.setAttribute("data-parent", "#sidenav01");
        _menu3.setAttribute("href", "Profissao.html");
        _menu3.innerHTML = "<span class='glyphicon glyphicon-align-justify'></span>&nbsp;Profissao";
        _li3.appendChild(_menu3);

        var _li4 = window.document.createElement("li");
        _ul.appendChild(_li4);
        var _menu4 = window.document.createElement("a");
        _menu4.setAttribute("class", "collapsed");
        _menu4.setAttribute("data-toggle", "collapse");
        _menu4.setAttribute("data-target", "#toggleDemo0");
        _menu4.setAttribute("data-parent", "#sidenav01");
        _menu4.setAttribute("href", "Cliente.html");
        _menu4.innerHTML = "<span class='glyphicon glyphicon-align-justify'></span>&nbsp;Cliente";
        _li4.appendChild(_menu4);

        var _li5 = window.document.createElement("li");
        _ul.appendChild(_li5);
        var _menu5 = window.document.createElement("a");
        _menu5.setAttribute("class", "collapsed");
        _menu5.setAttribute("data-toggle", "collapse");
        _menu5.setAttribute("data-target", "#toggleDemo0");
        _menu5.setAttribute("data-parent", "#sidenav01");
        _menu5.setAttribute("href", "GrupoAcesso.html");
        _menu5.innerHTML = "<span class='glyphicon glyphicon-align-justify'></span>&nbsp;Grupo Acesso";
        _li5.appendChild(_menu5);

        var _li6 = window.document.createElement("li");
        _ul.appendChild(_li6);
        var _menu6 = window.document.createElement("a");
        _menu6.setAttribute("class", "collapsed");
        _menu6.setAttribute("data-toggle", "collapse");
        _menu6.setAttribute("data-target", "#toggleDemo0");
        _menu6.setAttribute("data-parent", "#sidenav01");
        _menu6.setAttribute("href", "Usuario.html");
        _menu6.innerHTML = "<span class='glyphicon glyphicon-align-justify'></span>&nbsp;Usuario";
        _li6.appendChild(_menu6);


        var _content = window.document.createElement("div");
        _content.setAttribute("id", "divMainContent");
        _content.setAttribute("class", "col-sm-9 col-md-10 affix-content");
        _divRow.appendChild(_content);

    }


    return {
        create: _create
    }
})();