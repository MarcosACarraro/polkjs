var crtCidade = (function () {
    var _mainDiv;
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;

    var _txtNome;
    var _ddlEstado;

    var _create = function () {

        _mainDiv = window.document.getElementById("mainContainer");

        var _header = window.document.createElement("div");
        _header.setAttribute("class", "page-heade");
        _header.innerHTML = "<h3><span class='glyphicon glyphicon-th-list'></span>&nbsp;Cidades</h3>";
        _mainDiv.appendChild(_header);
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

        _createEdit.call(this);
        ConfirmDelete.create("crtCidade.removeAt()");

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

            cell0.innerHTML = _datasource[i].CodCidade;
            cell1.innerHTML = _datasource[i].NomeCidade;
            cell2.innerHTML = _datasource[i].Estado;
            cell3.innerHTML = "<a href='#' onClick='crtCidade.editAt(" + _datasource[i].CodCidade + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell4.innerHTML = "<a href='#' onClick='crtCidade.confirm(" + _datasource[i].CodCidade + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }


    var _newItem = function () {
        _idEdit = 0;
        _txtNome.value = "";
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    var _txtNomeValidade = function () {
        //var regEx = /^99$/;
        //if (regEx.test(_txtNome.value)) {
        if(_txtNome.value.length > 3){
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
                var _item = {
                    Update :"Update",
                    CodCidade:_idEdit,
                    NomeCidade: _txtNome.value,
                    Estado: "SP"
                };
                _updateDB(_item);
                //for (var i = 0; i < _datasource.length; i++) {
                //    if (_datasource[i].CodCidade === _idEdit) {
                //        _datasource[i].NomeCidade = _txtNome.value;
                //        _datasource[i].Estado = "SP";
                //    }
                //}
            } else {
                var _item = {
                    NomeCidade: _txtNome.value,
                    Estado: "SP"
                };
                 _sabeDB(_item);
            }

            _txtNome.value = "";
            _idEdit = 0;

            _load();
            _tableDataBind.call(this);
            $("#EditModal").modal('hide');
        } else {
            $("#divAlertSave").show();
        }
    }


    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cidades",
            type: "POST",
            data: JSON.stringify(item),
            datatype: "JSON"
            //success: function (response) {
            //    alert(response);
            //},
            //error: function () {
            //        alert('Erro ao salvar!');
            //}
        });
    }

    function _updateDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cidades",
            type: "GET",
            data: JSON.stringify(item),
            datatype: "JSON"
        });
    }
    

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeValidade.call(this);
        _formValid += _ddlEstadoValidade.call(this);
        return (_formValid == 0);
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCidade === id) {
                _txtNome.value = _datasource[i].NomeCidade;
                _idEdit = id;
            }
        }
        $("#EditModal").modal('show');
        _resetValidation.call(this);
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCidade === id) {
                ConfirmDelete.setMessage(_datasource[i].NomeCidade);
            }
        }
        $("#mConfirm").modal('show');
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        //for (var i = 0; i < _datasource.length; i++) {
        //    if (_datasource[i].CodCidade === _idExcluir) {
                
        //        //_datasource.splice(i, 1);
        //    }
        //}
        _idExcluir = 0;
        _load();
        _tableDataBind.call(this);
        $("#mConfirm").modal('hide');
        _resetValidation.call(this);
    }

    function _load_bk() {
        _datasource = [{ CodCidade: 1, NomeCidade: "Americana", Estado: "SP" },
                       { CodCidade: 2, NomeCidade: "Piracicaba", Estado: "SP" },
                       { CodCidade: 3, NomeCidade: "Sao Paulo", Estado: "SP" }
        ];
    }

    function _deleteDB(id) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cidades",
            type: "GET",
            data: {
                Delete: id
            },
            datatype: "JSON"
            //success: function (data, success) {
            //    if (success = "success") {
            //        alert('apagou');
            //    }
            //},
            //error: function () {
            //    alert('Erro ao Deletar!');
            //}
        });
    }


    function _load() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cidades",
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
                alert('Erro ao salvar filtro!');
            }
        });
    }

    var _list = function () {
        return _load();
    }

    return {
        list: _list,
        create: _create,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        removeAt: _removeAt
    }
})();