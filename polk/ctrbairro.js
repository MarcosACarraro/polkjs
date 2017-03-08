var ctrBairro = (function () {
    var _mainDiv;
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;

    var _txtNomeBairro;

    var _confirmDeleteBairro = {};

    var _create = function () {

        _confirmDeleteBairro = ConfirmDelete();
        _confirmDeleteBairro.create("mainContainer", "Bairro");
        _mainDiv = window.document.getElementById("mainContainer");

        var _header = window.document.createElement("div");
        _header.setAttribute("class", "page-header no-margim");
        _header.innerHTML = "<h3><span class='glyphicon glyphicon-th-list'></span>&nbsp;Bairro</h3>";
        _mainDiv.appendChild(_header);

        _txtBuscaBairro = window.document.createElement("input");
        _txtBuscaBairro.setAttribute("type", "text");
        _txtBuscaBairro.setAttribute("class", "search");
        _txtBuscaBairro.onkeyup = _onBuscar;
        _mainDiv.appendChild(_txtBuscaBairro);

        _table = window.document.createElement("table");
        _table.setAttribute("class", "table table-striped table-hover table-responsive");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Bairro";
        cell2.innerHTML = "Editar";
        cell3.innerHTML = "Excluir"
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
        _btnNew.setAttribute("onclick", "javascript:ctrBairro.newItem();")
        _divBody.appendChild(_btnNew);
        _mainDiv.appendChild(_divBody);

        _load();

        _createEdit.call(this);

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

            cell0.innerHTML = _datasource[i].CodBairro;
            cell1.innerHTML = _datasource[i].NomeBairro;
            cell2.innerHTML = "<a href='#' onClick='ctrBairro.editAt(" + _datasource[i].CodBairro + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrBairro.confirm(" + _datasource[i].CodBairro + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    var _createEdit = function () {
        _txtNomeBairro = window.document.getElementById("txtNomeBairro");
        _txtNomeBairro.onchange = _txtNomeBairroValidade;
        _txtNomeBairro.onkeyup = _txtNomeBairroValidade;
        _txtNomeBairro.setAttribute("maxlength", "50");
        _resetValidation.call(this);
    }

    var _onBuscar = function () {
        if (_txtBuscaBairro.value.length > 3) {
            _search(_txtBuscaBairro.value);
        } else if (_txtBuscaBairro.value.length === 0) {
            _load();
        }
    }


    var _newItem = function () {
        _idEdit = 0;
        _txtNomeBairro.value = "";
        $("#EditModalBairro").modal('show');
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeBairroValidade.call(this);
        return (_formValid == 0);
    }

    var _txtNomeBairroValidade = function () {
        if (_txtNomeBairro.value.length > 3) {
            return _toggleValidade.call(this, _txtNomeBairro, true, "");
        } else {
            return _toggleValidade.call(this, _txtNomeBairro, false, "Erro na Descricao!!!");
        }
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtNomeBairro, true, "");

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
                CodBairro: _idEdit,
                NomeBairro: _txtNomeBairro.value,
                CodCidade:7
            };

            _sabeDB(_item);

            _txtNomeBairro.value = "";
            _idEdit = 0;
            _load();
            $("#EditModalBairro").modal('hide');
        } else {
            $("#divAlertSave").show();
        }
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodBairro === id) {
                _txtNomeBairro.value = _datasource[i].NomeBairro;
                _idEdit = id;
            }
        }
        $("#EditModalBairro").modal('show');
        _resetValidation.call(this);
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodBairro === id) {
                _confirmDeleteBairro.setMessage(_datasource[i].NomeBairro);
            }
        }
        _confirmDeleteBairro.show();
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;
        _load();
        _confirmDeleteBairro.hide();
        _resetValidation.call(this);
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/bairro",
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
            url: "http://localhost:3412/bairro",
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

    function _search(filter) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/bairro",
            type: "GET",
            data: {
                Select: filter
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
    }

    function _load() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/bairro",
            type: "GET",
            data: {
                Select: "All"
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
    }

    return {
        create: _create,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        removeAt: _removeAt
    }
})();