var ctrProfissao = (function () {
    var _mainDiv;
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;

    var _txtDescProfissao;

    var _create = function () {

        //_totalRecords();

        _confirmDeleteProfissao = ConfirmDelete()
        _confirmDeleteProfissao.create("mainContainer", "Profissao");

        _mainDiv = window.document.getElementById("mainContainer");

        var _header = window.document.createElement("div");
        _header.setAttribute("class", "page-header no-margim");
        _header.innerHTML = "<h3><span class='glyphicon glyphicon-th-list'></span>&nbsp;Profissao</h3>";
        _mainDiv.appendChild(_header);

        _txtBusca = window.document.createElement("input");
        _txtBusca.setAttribute("type", "text");
        _txtBusca.setAttribute("class", "search");
        _txtBusca.onkeyup = _onBuscar;
        _mainDiv.appendChild(_txtBusca);

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


        var _pagination = window.document.createElement("ul");
        _pagination.setAttribute("class", "pagination");
        
        var _li1 = window.document.createElement("li");
        _li1.innerHTML = "<a href='#' onClick='javascript:alert(\"ok\");'>&laquo;</a>";
        var _li2 = window.document.createElement("li");
        _li2.innerHTML = "<a href='#'>2</a>";
        _li2.setAttribute("class", "active");
        var _li3 = window.document.createElement("li");
        _li3.innerHTML = "<a href='#'>3</a>";
        var _li4 = window.document.createElement("li");
        _li4.innerHTML = "<a href='#'>4</a>";
        var _li5 = window.document.createElement("li");
        _li4.innerHTML = "<a href='#'>&raquo;</a>";

                
        _pagination.appendChild(_li1);
        _pagination.appendChild(_li2);
        _pagination.appendChild(_li3);
        _pagination.appendChild(_li4);
        _pagination.appendChild(_li5);

        _mainDiv.appendChild(_pagination);


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
        _btnNew.setAttribute("onclick", "javascript:ctrProfissao.newItem();")
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

            cell0.innerHTML = _datasource[i].CodProfissao;
            cell1.innerHTML = _datasource[i].DescProfissao;
            cell2.innerHTML = "<a href='#' onClick='ctrProfissao.editAt(" + _datasource[i].CodProfissao + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrProfissao.confirm(" + _datasource[i].CodProfissao + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    var _createEdit = function () {
        _txtDescProfissao = window.document.getElementById("txtDescProfissao");
        _txtDescProfissao.onchange = _txtDescProfissaoValidade;
        _txtDescProfissao.onkeyup = _txtDescProfissaoValidade;
        _txtDescProfissao.setAttribute("maxlength", "50");
        _resetValidation.call(this);
    }

    var _onBuscar = function () {
        if (_txtBusca.value.length > 3) {
            _search(_txtBusca.value);
        } else if (_txtBusca.value.length === 0) {
            _load();
        }
    }


    var _newItem = function () {
        _idEdit = 0;
        _txtDescProfissao.value = "";
        $("#EditModal").modal('show');
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
            _load();
            $("#EditModal").modal('hide');
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
        $("#EditModal").modal('show');
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
        _load();
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

    function _search(filter) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
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
        var _skip = 0;
        var _take = 10;
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "GET",
            data: {
                Select: "All",
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
    }

    function _totalRecords() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
            type: "GET",
            data: {
                Count: "Count"
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    alert(data[0].Total);
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