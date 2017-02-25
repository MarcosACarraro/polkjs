var crtCidade = (function () {
    var _txtNome;
    var _ddlEstado;
    var _datasource;
    var _formValid = 0;


    var _create = function () {

        _mainDiv = window.document.getElementById("tableGrid");

         _createEdit.call(this);
        _table = window.document.createElement("table");
        _table.setAttribute("class", "table table-striped table-hover table-responsive");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Nome Cidade";
        cell2.innerHTML = "Estado";
        cell3.innerHTML = "Editar";
        cell4.innerHTML = "Excluir"
        _mainDiv.appendChild(_table);

        var _divPanel = window.document.createElement("div");
        var _hr = window.document.createElement("hr");
        _divPanel.appendChild(_hr);
        _mainDiv.appendChild(_divPanel);

        var _divBody = window.document.createElement("div");
        _divBody.setAttribute("class", "pull-right");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:crtCidade.newItem();")
        _divBody.appendChild(_btnNew);
        _mainDiv.appendChild(_divBody);

        _load();

        _tableDataBind.call(this);

        ConfirmDelete.create("crtCidade.removeAt()");
        
    }

    var _tableDataBind = function () {
        _limpar.call(this);
        var linha = 0;
        for (var i = 0; i < _datasource.length; i++) {
            linha++;
            var row = _table.insertRow(linha);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            cell3.setAttribute("width", "30px");
            cell3.setAttribute("align", "center");
            var cell4 = row.insertCell(4);
            cell4.setAttribute("width", "30px");
            cell4.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].codCidade;
            cell1.innerHTML = _datasource[i].NomeCidade;
            cell2.innerHTML = _datasource[i].Estado;
            cell3.innerHTML = "<a href='#' onClick='crtCidade.editAt(" + _datasource[i].codCidade + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell4.innerHTML = "<a href='#' onClick='crtCidade.confirm(" + _datasource[i].codCidade + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }


    var _newItem = function () {
        _idEdit = 0;
        _txtNome.value = "";
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    var _txtNomeValidade = function () {
        var regEx = /^99$/;
        if (regEx.test(_txtNome.value)) {
            return _toggleValidade.call(this, _txtNome, true, "");
        } else {
            return _toggleValidade.call(this, _txtNome, false, "Erro na Cidade!!!");
        }
    }

    var _ddlEstadoValidade = function () {
        if (_ddlEstado.selectedIndex == 0) {
            return _toggleValidade.call(this, _ddlEstado, false, "Selecione um Estado!!!");
        } else {
            return _toggleValidade.call(this, _ddlEstado, true, "");
        }
    }

    var _resetValidation = function () {

        _toggleValidade.call(this, _txtNome, true, "");
        _toggleValidade.call(this, _ddlEstado, true, "");

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

    var _createEdit = function () {
        _txtNome = window.document.getElementById("txtNomeCidade");
        _txtNome.onchange = _txtNomeValidade;
        _txtNome.onkeyup = _txtNomeValidade;
        _txtNome.setAttribute("maxlength", "50");

        _ddlEstado = window.document.getElementById("ddlEstado");
        _ddlEstado.onchange = _ddlEstadoValidade;
        _resetValidation.call(this);
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
            if (_idEdit !== 0) {
                for (var i = 0; i < _datasource.length; i++) {
                    if (_datasource[i].codCidade === _idEdit) {
                        _datasource[i].NomeCidade = _txtNome.value;
                        _datasource[i].Estado = "SP";
                       // _datasource[i].situacao = 'alterado';
                    }
                }
            } else {
                _id = _datasource.length + 1;
                var _item = {
                    codCidade: _id,
                    NomeCidade: _txtNome.value,
                    Estado: "SP"
                    //situacao: "Novo"
                };
                _datasource.push(_item);
            }

            _txtNome.value = "";
            _idEdit = 0;

            _tableDataBind.call(this);
            $("#EditModal").modal('hide');
        } else {
            $("#divAlertSave").show();
        }
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeValidade.call(this);
        _formValid += _ddlEstadoValidade.call(this);
        return (_formValid == 0);
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].codCidade === id) {
                _txtNome.value = _datasource[i].NomeCidade;
                _idEdit = id;
            }
        }
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    function _load() {
        _datasource = [{ codCidade: 1, NomeCidade: "Americana", Estado: "SP" },
                       { codCidade: 2, NomeCidade: "Piracicaba", Estado: "SP" },
                       { codCidade: 3, NomeCidade: "Sao Paulo", Estado: "SP" }
        ];
    }

    var _list = function () {
        return _load();
    }

    return {
        list: _list,
        create: _create,
        newItem: _newItem,
        save: _save,
        editAt: _editAt
    }
})();