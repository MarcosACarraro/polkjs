var crtCidade = (function () {
    var _txtNome;
    var _ddlEstado;
    var _datasource;


    var _create = function () {

        _mainDiv = window.document.getElementById("tableGrid");

         _createEdit.call(this);
         //ConfirmDelete.create("crtCidade.removeAt()");
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

        var _divFooter = window.document.getElementById("divButton");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:mGrid.newItem();")
        _mainDiv.appendChild(_btnNew);

        _load();

        _tableDataBind.call(this);

        
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
            var cell4 = row.insertCell(4);

            cell0.innerHTML = _datasource[i].codCidade;
            cell1.innerHTML = _datasource[i].NomeCidade;
            cell2.innerHTML = _datasource[i].Estado;
            cell3.innerHTML = "<div><a href='#' onClick='crtCidade.editAt(" + _datasource[i].codCidade + ");return false;'>Editar</a></div>";
            cell4.innerHTML = "<div><a href='#' onClick='crtCidade.confirm(" + _datasource[i].codCidade + ");return false;'>Exluir</a></div>";

        }
    }


    var _createEdit = function () {
        _txtNome = window.document.getElementById("txtNomeCidade");
        //_txtNome.onchange = _txtNomeValidade;
        //_txtNome.onkeyup = _txtNomeValidade;
        _txtNome.setAttribute("maxlength", "50");

        _ddlEstado = window.document.getElementById("ddlEstado");
        //_ddlTipo.onchange = _ddlTipoValidade;
        //_resetValidation.call(this);
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }


    function _load() {
        _datasource = [{ codCidade: 1, NomeCidade: "Americana", Estado: "SP" }, { codCidade: 2, NomeCidade: "Piracicaba", Estado: "SP" }];
    }

    var _list = function () {
        return _load();
    }

    return {
        list: _list,
        create: _create
    }
})();