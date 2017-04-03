var ctrUsuario = (function () {
    var _mainDiv;
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;
    var _pagination = {};
    var _skip = 0;
    var _take = 8;
    var _indexPage = 1;
    var _divleft = {};
    var _divRight = {};
    var _mainDiv = {};
    var _divFilterBody = {};
    var _divFilter = {};
    var _divBottom = {};
    var _toShow = true;

    var _txtLogin = {};
    var _txtSenha = {};
    var _txtConfirma = {};
    var _txtNomeUsuario = {};
    var _ddlGrupoAcesso = {};
    var _ddlSituacao = {};

    var _create = function () {
        //loginVerify();
        createMainContainer();
        createFilter();
        createTable();
        createEdit();
        createBottom();

        _confirmDeleteUsuario = ConfirmDelete();
        _confirmDeleteUsuario.create("mainContainer", "Usuario");
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
        _filterHeaderTitle.innerHTML = "<span class='glyphicon glyphicon-th-list'></span><span>&nbsp;Usuario</span>";
        _divFilterHeader.appendChild(_filterHeaderTitle);

        var _iconFilter = window.document.createElement("span");
        _iconFilter.setAttribute("id", "iconFilter");
        _iconFilter.setAttribute("onclick", "javascript:ctrUsuario.toggleFilter();")
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
        _mainDiv.setAttribute("class", "container");
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

    var _onBuscar = function () {
        _skip = 0;
        _indexPage = 1;
        if (_txtBusca.value.length > 3) {
            _search(_txtBusca.value);
        } else if (_txtBusca.value.length === 0) {
            _search("");
        }
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
        var cell4 = row.insertCell(4);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Nome Usuario";
        cell2.innerHTML = "GrupoAcesso";
        cell3.innerHTML = "Editar";
        cell4.innerHTML = "Excluir"
        _mainDiv.appendChild(_table);

        _search("");
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
            var cell3 = row.insertCell(3);
            cell3.setAttribute("width", "30px");
            cell3.setAttribute("align", "center");
            var cell4 = row.insertCell(4);
            cell4.setAttribute("width", "30px");
            cell4.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].CodUsuario;
            cell1.innerHTML = _datasource[i].Nome;
            cell2.innerHTML = _datasource[i].Descricao;
            cell3.innerHTML = "<a href='#' onClick='ctrUsuario.editAt(" + _datasource[i].CodUsuario + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell4.innerHTML = "<a href='#' onClick='ctrUsuario.confirm(" + _datasource[i].CodUsuario + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

  

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    function _search(Nome) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/usuario",
            type: "GET",
            data: {
                Select: Nome,
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

        _searchTotalRecords(Nome, _paginacao);
    }

    function _paginacao(total) {

        var totalPages = Math.ceil(total / _take);

        _pagination = window.document.getElementById("ulPaginacao");
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
            _pagination.setAttribute("id", "ulPaginacao")
            _pagination.setAttribute("class", "pagination");

            if (_indexPage > limitButtons) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrUsuario.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrUsuario.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }

            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrUsuario.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }
            _divleft.appendChild(_pagination);
        }

    }

    var _SetPage = function (index) {
        _skip = ((index - 1) * _take);
        _indexPage = index;
        _search(_txtBusca.value);
    }


    function createEdit() {

        var item = document.createElement("option");
        item.text = "Selecione";
        item.value = 0;

        _txtLogin = window.document.getElementById("txtLogin");
        _txtLogin.onchange = _txtLoginValidade;
        _txtLogin.onkeyup = _txtLoginValidade;

        _txtNomeUsuario = window.document.getElementById("txtNomeUsuario");
        _txtNomeUsuario.onchange = _txtNomeValidade;
        _txtNomeUsuario.onkeyup = _txtNomeValidade;
        _txtNomeUsuario.setAttribute("maxlength", "50");

        _txtSenha = window.document.getElementById("txtSenha");
        _txtSenha.onchange = _txtSenhaValidade;
        _txtSenha.onkeyup = _txtSenhaValidade;

        _txtConfirma = window.document.getElementById("txtConfirma");
        _txtConfirma.onchange = _txtConfirmValidade;
        _txtConfirma.onkeyup = _txtConfirmValidade;

        _ddlGrupoAcesso = window.document.getElementById("ddlGrupoAcesso");
        _ddlGrupoAcesso.onchange = _ddlGrupoAcessoValidade;
        _ddlGrupoAcesso.appendChild(item);
        _resetValidation.call(this);

        _ddlSituacao = window.document.getElementById("ddlSituacao");

        _loadGrupoAcesso();

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _txtNomeValidade = function () {
        if (_txtNomeUsuario.value.length > 0) {
            return _toggleValidade.call(this, _txtNomeUsuario, true, "");
        } else {
            return _toggleValidade.call(this, _txtNomeUsuario, false, "Nome da Usuario obrigatorio!!!");
        }
    }

    var _txtLoginValidade = function () {
        if (_txtLogin.value.length > 0) {
            return _toggleValidade.call(this, _txtLogin, true, "");
        } else {
            return _toggleValidade.call(this, _txtLogin, false, "Login obrigatorio!!!");
        }
    }

    var _txtSenhaValidade = function () {
        if (_txtSenha.value.length > 0) {
            return _toggleValidade.call(this, _txtSenha, true, "");
        } else {
            return _toggleValidade.call(this, _txtSenha, false, "Senha obrigatorio!!!");
        }
    }

    var _txtConfirmValidade = function () {
        if (_txtConfirma.value.length > 0) {
            if (_txtSenha.value === _txtConfirma.value) {
                return _toggleValidade.call(this, _txtConfirma, true, "");
            } else {
                return _toggleValidade.call(this, _txtConfirma, false, "Confirma obrigatorio!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtConfirma, false, "Confirma obrigatorio!!!");
        }
    }
    

    var _ddlGrupoAcessoValidade = function () {
        if (_ddlGrupoAcesso.selectedIndex == 0) {
            return _toggleValidade.call(this, _ddlGrupoAcesso, false, "Selecione um GrupoAcesso!!!");
        } else {
            return _toggleValidade.call(this, _ddlGrupoAcesso, true, "");
        }
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

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtNomeUsuario, true, "");
        _toggleValidade.call(this, _txtLogin, true, "");
        _toggleValidade.call(this, _txtSenha, true, "");
        _toggleValidade.call(this, _ddlGrupoAcesso, true, "")
        _toggleValidade.call(this, _txtConfirma, true, "")

        $("#divAlertSave").hide();
        _formValid = 0;
    }

    function createBottom() {

        _divBottom = window.document.createElement("div");
        _divBottom.setAttribute("class", "panel-footer");

        _divleft = window.document.createElement("div");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary pull-right");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:ctrUsuario.newItem();")

        var _clear = window.document.createElement("div");
        _clear.setAttribute("class", "clearfix");

        _divBottom.appendChild(_divleft);
        _divBottom.appendChild(_btnNew);
        _divBottom.appendChild(_clear);
        _divFilter.appendChild(_divBottom);
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

    var _newItem = function () {
        _txtLogin.disabled = false;
        $("#divEditSenha").show();
        $("#btnAlterPwd").hide();
        _idEdit = 0;
        _txtNomeUsuario.value = "";
        _txtLogin.value = "";
        _txtSenha.value = "";
        _txtConfirma.value = "";
        _ddlGrupoAcesso.selectedIndex = 0;

        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeValidade.call(this);
        _formValid += _txtLoginValidade.call(this);
        _formValid += _txtSenhaValidade.call(this);
        _formValid += _txtConfirmValidade.call(this);
        _formValid += _ddlGrupoAcessoValidade.call(this);
        return (_formValid == 0);
    }

    var _save = function () {
        if (_validate.call(this)) {
            var _item = {
                CodUsuario: _idEdit,
                Nome: _txtNomeUsuario.value,
                Login: txtLogin.value,
                Senha: _txtSenha.value,
                CodGrupoAcesso: _ddlGrupoAcesso.options[_ddlGrupoAcesso.selectedIndex].value,
                Situacao: _ddlSituacao.options[_ddlSituacao.selectedIndex].value,
            };

            _sabeDB(_item);

            _txtNomeUsuario.value = "";
            _txtLogin.value = "";
            _txtSenha.value = "";
            _txtConfirma.value = "";
            _ddlGrupoAcesso.selectedIndex = 0;
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

    function _loadGrupoAcesso() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/grupoAcessoService",
            type: "GET",
            data: {
                Select: "",
                skip: 0,
                take: 1000000
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    for (var i = 0; i < data.length; i++) {
                        var item = document.createElement("option");
                        item.text = data[i].Descricao;
                        item.value = data[i].CodGrupoAcesso;
                        _ddlGrupoAcesso.appendChild(item);
                    }
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }


    function _searchTotalRecords(Nome, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/usuario",
            type: "GET",
            data: {
                Select: Nome,
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


    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/usuario",
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
            url: "http://localhost:3412/usuario",
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

    var _editAt = function (id) {
        $("#divEditSenha").hide();
        $("#btnAlterPwd").show();
        _txtLogin.disabled = true;

        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodUsuario === id) {
                _txtNomeUsuario.value = _datasource[i].Nome;
                _txtLogin.value = _datasource[i].Login;
                _txtSenha.value = _datasource[i].Senha;
                _txtConfirma.value = _datasource[i].Senha;

                for (j = 0; j < _ddlGrupoAcesso.length; j++) {
                    if (_ddlGrupoAcesso.options[j].value == _datasource[i].CodGrupoAcesso) {
                        _ddlGrupoAcesso.selectedIndex = j;
                    }
                }

                for (k = 0; k < _ddlSituacao.options.length; k++) {
                    if (_ddlSituacao.options[k].value === _datasource[i].Situacao) {
                        _ddlSituacao.selectedIndex = k;
                    }
                }

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
            if (_datasource[i].CodUsuario === id) {
                _confirmDeleteUsuario.setMessage(_datasource[i].NomeUsuario);
            }
        }
        _confirmDeleteUsuario.show();
        _resetValidation.call(this);
    }

    var _editClose = function () {
        _idEdit = 0;
        _txtNomeUsuario.value = "";
        _txtLogin.value = "";
        _txtSenha.value = "";
        _txtConfirma.value = "";
        _ddlGrupoAcesso.selectedIndex = 0;
        _ddlSituacao.selectedIndex = 0;
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;

        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmDeleteUsuario.hide();
        _resetValidation.call(this);
    }

    var _PasswordChange = function () {
        $("#divEditSenha").show();
        $("#btnAlterPwd").hide();
        _txtSenha.value = "";
        _txtConfirma.value = "";
    }

    return {
        create: _create,
        toggleFilter: _toggleFilter,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        editClose: _editClose,
        removeAt: _removeAt,
        SetPage: _SetPage,
        PasswordChange: _PasswordChange
    }
})();