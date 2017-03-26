var ctrProfissao = (function () {
    var _mainDiv;
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;
    var _pagination = {};
    var _skip = 0;
    var _take = 10;
    var _indexPage = 1;
    var _divleft = {};
    var _divRight = {};
    var _mainDiv = {};
    var _divFilterBody = {};
    var _divFilter = {};
    var _divBottom = {};
    var _toShow = true;

    var _txtDescProfissao;

    var _create = function () {
        loginVerify();
        createMainContainer();
        createFilter();
        createTable();
        createEdit();
        createBottom();

        _confirmDeleteProfissao = ConfirmDelete();
        _confirmDeleteProfissao.create("mainContainer", "Profissao");
    }

    function loginVerify() {
        var login = storageDB.read();
        if (!login) {
            window.location = "login.html";
        }
    }

    function createMainContainer() {

        var _mainContent = window.document.getElementById("divMainContent");

        var _gridPainel = window.document.createElement("div");
        _gridPainel.setAttribute("id", "gridPainel");
        _gridPainel.setAttribute("class", "panel-collapse collapse in");
        _mainContent.appendChild(_gridPainel);

         _divFilter = window.document.createElement("div");
        _divFilter.setAttribute("class", "panel panel-default");
        _gridPainel.appendChild(_divFilter);

        var _divFilterHeader = window.document.createElement("div");
        _divFilterHeader.setAttribute("class", "panel-heading");
        _divFilter.appendChild(_divFilterHeader);

        var _filterHeaderTitle = window.document.createElement("h3");
        _filterHeaderTitle.setAttribute("class", "panel-title");
        _filterHeaderTitle.innerHTML = "<span class='glyphicon glyphicon-th-list'></span><span>&nbsp;Profissao</span>";
        _divFilterHeader.appendChild(_filterHeaderTitle);

        var _iconFilter = window.document.createElement("span");
        _iconFilter.setAttribute("id", "iconFilter");
        _iconFilter.setAttribute("onclick", "javascript:ctrProfissao.toggleFilter();")
        _iconFilter.setAttribute("class", "pull-right clickable");
        _iconFilter.innerHTML = "Filtrar &nbsp;<i class='glyphicon glyphicon-filter'>";
        _divFilterHeader.appendChild(_iconFilter);

        var _divFilterBodyCollapse = window.document.createElement("div");
        _divFilterBodyCollapse.setAttribute("id", "divFilterBodyCollapse");
        _divFilterBodyCollapse.setAttribute("class", "panel-collapse collapse");
        _divFilter.appendChild(_divFilterBodyCollapse);

        _divFilterBody = window.document.createElement("div");
        _divFilterBody.setAttribute("id", "bodyFilter");
        _divFilterBody.setAttribute("class", "panel-body");
        _divFilterBodyCollapse.appendChild(_divFilterBody);

        _mainDiv = window.document.createElement("div");
        _mainDiv.setAttribute("class", "container panel-table");
        _mainDiv.setAttribute("id", "mainContainer");
        _divFilter.appendChild(_mainDiv);

        var _editPainel = window.document.createElement("div");
        _editPainel.setAttribute("id", "editPainel");
        _editPainel.setAttribute("class", "panel-collapse collapse in");
        _mainContent.appendChild(_editPainel);

        var _editForm = window.document.getElementById("editForm");
        _editPainel.appendChild(_editForm);

    }

    function createFilter() {
        /*filtro vai no Filter body*/
        _txtBusca = window.document.createElement("input");
        _txtBusca.setAttribute("type", "text");
        _txtBusca.setAttribute("class", "search");
        _txtBusca.onkeyup = _onBuscar;
        _divFilterBody.appendChild(_txtBusca);
    }

    function createTable() {
        /*table vai na div principal*/
        _table = window.document.createElement("table");
        _table.setAttribute("class", "table table-striped table-hover table-responsive");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Profissao";
        cell2.innerHTML = "Editar";
        cell3.innerHTML = "Excluir"
        _mainDiv.appendChild(_table);

        _search("");
    }

    function createEdit() {
        _txtDescProfissao = window.document.getElementById("txtDescProfissao");
        _txtDescProfissao.onchange = _txtDescProfissaoValidade;
        _txtDescProfissao.onkeyup = _txtDescProfissaoValidade;
        _txtDescProfissao.setAttribute("maxlength", "50");
        _resetValidation.call(this);

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');

    }

    function createBottom() {

        _divBottom = window.document.createElement("div");
        _divBottom.setAttribute("class", "panel-footer");

        _divleft = window.document.createElement("div");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary pull-right");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:ctrProfissao.newItem();")

        var _clear = window.document.createElement("div");
        _clear.setAttribute("class", "clearfix");

        _divBottom.appendChild(_divleft);
        _divBottom.appendChild(_btnNew);
        _divBottom.appendChild(_clear);
        _divFilter.appendChild(_divBottom);
    }

    var _tableDataBind = function () {
        _limpar.call(this);
        var linha = 0;
        for (var i = 0; i < _datasource.length; i++) {
            linha++;
            var row = _table.insertRow(linha);
            var cell0 = row.insertCell(0);
            cell0.setAttribute("width", "30px");

            var cell1 = row.insertCell(1);

            var cell2 = row.insertCell(2);
            cell2.setAttribute("width", "30px");
            cell2.setAttribute("align", "center");
            var cell3 = row.insertCell(3);
            cell3.setAttribute("width", "30px");
            cell3.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].CodProfissao;
            cell1.innerHTML = _datasource[i].DescProfissao;
            cell2.innerHTML = "<a href='#' onClick='ctrProfissao.editAt(" + _datasource[i].CodProfissao + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrProfissao.confirm(" + _datasource[i].CodProfissao + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    var _onBuscar = function () {
        _skip = 0;
        _indexPage = 1;
        if (_txtBusca.value.length > 3) {
            _search(_txtBusca.value);
        } else if (_txtBusca.value.length === 0) {
            _search("");
        }
    }

    var _newItem = function () {
        _idEdit = 0;
        _txtDescProfissao.value = "";
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtDescProfissaoValidade.call(this);
        return (_formValid == 0);
    }

    var _txtDescProfissaoValidade = function () {
        if (_txtDescProfissao.value.length > 3) {
            return _toggleValidade.call(this, _txtDescProfissao, true, "");
        } else {
            return _toggleValidade.call(this, _txtDescProfissao, false, "Erro na Profissao!!!");
        }
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtDescProfissao, true, "");
   
        $("#divAlertSave").hide();
        _formValid = 0;
    }

    var _toggleValidade = function (input, valid, message) {
        var _div = $(input).parent();
        if (valid) {
            $(_div).removeClass("form-group has-error has-feedback");
            $(_div).find("span").hide();
            return 0;
        } else {
            $(_div).addClass("form-group has-error has-feedback");
            $(_div).find("span").show();
            $(_div).find("span")[1].innerHTML = message;
            return 1;
        }
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    var _save = function () {
        if (_validate.call(this)) {
            var _item = {
                CodProfissao: _idEdit,
                DescProfissao: _txtDescProfissao.value
            };

            _sabeDB(_item);

            _txtDescProfissao.value = "";
            _idEdit = 0;

            _skip = 0;
            _indexPage = 1;

            _search(_txtBusca.value);
            $("#gridPainel").collapse('show');
            $("#editPainel").collapse('hide');

        } else {
            $("#divAlertSave").show();
        }
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodProfissao === id) {
                _txtDescProfissao.value = _datasource[i].DescProfissao;
                _idEdit = id;
            }
        }
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodProfissao === id) {
                _confirmDeleteProfissao.setMessage(_datasource[i].DescProfissao);
            }
        }
        _confirmDeleteProfissao.show();
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;
        
        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmDeleteProfissao.hide();
        _resetValidation.call(this);
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "POST",
            data: JSON.stringify(item),
            datatype: "JSON",
            success: function (response) {
                //alert(response.success);
            },
            error: function () {
                alert('Erro ao salvar!');
            }
        });
    }

    function _deleteDB(id) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "GET",
            data: {
                Delete: id
            },
            datatype: "JSON",
            success: function (response) {
                //alert(response.success);
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }

    function _search(descProfissao) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "GET",
            data: {
                Select: descProfissao,
                skip: _skip,
                take: _take
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    _datasource = data;
                    _tableDataBind.call(this);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });

        _searchTotalRecords(descProfissao, _paginacao);

    }

    function _paginacao(total) {

        var totalPages = Math.ceil(total / _take);
        
         _pagination = window.document.getElementById("ulProfissao");
         if (_pagination) _pagination.remove();


        if (totalPages > 1) {
            var limitButtons = 5;
            var lastButton = 0;
            var start = 1;
        
            lastButton = (totalPages < limitButtons) ? totalPages : limitButtons;

            if (_indexPage > limitButtons) {
                start = (_indexPage - limitButtons + 1);
                lastButton = (start + limitButtons - 1);
            }
          
            _pagination = window.document.createElement("ul");
            _pagination.setAttribute("id","ulProfissao")
            _pagination.setAttribute("class", "pagination");

            if (_indexPage > limitButtons) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrProfissao.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrProfissao.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }
          
            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrProfissao.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }
            _divleft.appendChild(_pagination);
        }
       
    }

    function _searchTotalRecords(descProfissao, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "GET",
            data: {
                Select: descProfissao,
                skip: _skip,
                take: _take
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    callback(data[0].Total);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    var _SetPage = function (index) {
        _skip = ((index - 1) * _take);
        _indexPage = index;
        _search(_txtBusca.value);
    }

    var _editClose = function () {
        _idEdit = 0;
        _txtDescProfissao.value = "";
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _toggleFilter = function () {

        if (_toShow) {
            $("#divFilterBodyCollapse").collapse('show');
            $("#iconFilter").find('i').removeClass('glyphicon-filter').addClass('glyphicon-chevron-up');
            _toShow = false;
        }
        else {
            $("#divFilterBodyCollapse").collapse('hide');
            $("#iconFilter").find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-filter');
            _toShow = true;
        }
    }


    return {
        create: _create,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        removeAt: _removeAt,
        SetPage: _SetPage,
        editClose: _editClose,
        toggleFilter: _toggleFilter
    }
})();