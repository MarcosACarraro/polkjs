var ctrCliente = (function () {
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

    var _txtNomeCliente = {};
    var _txtEndereco = {};
    var _txtBairro = {};
    var _txtCEP = {};

    var _txtFoneCom = {};
    var _txtFoneRes = {};
    var _txtCelular = {};
    var _txtEmail = {};
    var _txtRG = {};
    var _txtCPF = {};
    var _ddlSexo = {};
    var _ddlSituacao = {};
    var _txtEstadoCivil = {};
    var _txtObservacao = {};
    var _txtDataCadastro = {};
    var _txtDataNasc = {};
    var _ddlProfissao = {};
    var _ddlCidade = {};
    var _ddlBairro = {};


    var _create = function () {

        //loginVerify();
        createMainContainer();
        createFilter();
        createTable();
        createEdit();
        createBottom();

        _confirmDeleteCliente = ConfirmDelete();
        _confirmDeleteCliente.create("mainContainer", "Cliente");
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
        _filterHeaderTitle.innerHTML = "<span class='glyphicon glyphicon-th-list'></span><span>&nbsp;Cliente</span>";
        _divFilterHeader.appendChild(_filterHeaderTitle);

        var _iconFilter = window.document.createElement("span");
        _iconFilter.setAttribute("id", "iconFilter");
        _iconFilter.setAttribute("onclick", "javascript:ctrCliente.toggleFilter();")
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
        cell1.innerHTML = "Cliente";
        cell2.innerHTML = "Editar";
        cell3.innerHTML = "Excluir"
        _mainDiv.appendChild(_table);

        _search("");
    }

    function createEdit() {

        var item = document.createElement("option");
        item.text = "Selecione";
        item.value = 0;

        _txtNomeCliente = window.document.getElementById("txtNomeCliente");
        _txtNomeCliente.onchange = _txtNomeClienteValidade;
        _txtNomeCliente.onkeyup = _txtNomeClienteValidade;
        _txtNomeCliente.setAttribute("maxlength", "50");

        _txtEndereco = window.document.getElementById("txtEndereco");
        _txtCEP = window.document.getElementById("txtCEP");
        _txtFoneCom = window.document.getElementById("txtFoneCom");
        _txtFoneRes = window.document.getElementById("txtFoneRes");
        _txtCelular = window.document.getElementById("txtCelular");
        _txtEmail = window.document.getElementById("txtEmail");
        _txtRG = window.document.getElementById("txtRG");
        _txtCPF = window.document.getElementById("txtCPF");
        _txtCPF.setAttribute("maxlength", "14");
        _ddlSexo = window.document.getElementById("ddlSexo");
        _ddlSituacao = window.document.getElementById("ddlSituacao");
        _txtEstadoCivil = window.document.getElementById("txtEstadoCivil");
        _txtObservacao = window.document.getElementById("txtObservacao");
        _txtDataCadastro = window.document.getElementById("txtDataCadastro");
        _txtDataCadastro.disabled = true;

        _txtDataNasc = window.document.getElementById("txtDataNasc");
        _txtDataNasc.setAttribute("maxlength", "10");
        _txtDataNasc.onchange = _datepickerValidade;
        $(function () {
            $(_txtDataNasc).datepicker($.datepicker.regional["pt-BR"]);
        });

        _ddlProfissao = window.document.getElementById("ddlProfissao");
        _ddlProfissao.appendChild(item);
        _loadProfissao();

        _ddlCidade = window.document.getElementById("ddlCidade");
        _ddlCidade.onchange = _onchangeddlCidade;
        _ddlCidade.appendChild(item);
        _loadCidade();

        _ddlBairro = window.document.getElementById("ddlBairro");
        _ddlBairro.appendChild(item);

        _resetValidation.call(this);

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    function _onchangeddlCidade() {
        _loadBairro(_ddlCidade.options[_ddlCidade.selectedIndex].value, 0, _ddlBairroSelect);
    }

    function _loadProfissao() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/profissao",
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
                        item.text = data[i].DescProfissao;
                        item.value = data[i].CodProfissao;
                        _ddlProfissao.appendChild(item);
                    }
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    function _loadCidade() {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cidade",
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
                        item.text = data[i].NomeCidade;
                        item.value = data[i].CodCidade;
                        _ddlCidade.appendChild(item);
                    }
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    function _loadBairro(idCidade,idBairro,callback) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/bairro",
            type: "GET",
            data: {
                Select: idCidade
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    var item0 = document.createElement("option");
                    item0.text = "Selecione";
                    item0.value = 0;
                    _ddlBairro.options.length = 0;
                    _ddlBairro.appendChild(item0);
                    for (var i = 0; i < data.length; i++) {
                        var item = document.createElement("option");
                        item.text = data[i].NomeBairro;
                        item.value = data[i].CodBairro;
                        _ddlBairro.appendChild(item)
                    }
                    callback(idBairro);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    function _ddlBairroSelect(idBairro) {
        for (p = 0; p < _ddlBairro.options.length; p++) {
            if (_ddlBairro.options[p].value == idBairro) {
                _ddlBairro.selectedIndex = p;
            }
        }
    }


    function createBottom() {

        _divBottom = window.document.createElement("div");
        _divBottom.setAttribute("class", "panel-footer");

        _divleft = window.document.createElement("div");

        var _btnNew = window.document.createElement("button");
        _btnNew.setAttribute("class", "btn btn-primary pull-right");
        _btnNew.innerHTML = "Novo";
        _btnNew.setAttribute("name", "btnNew");
        _btnNew.setAttribute("onclick", "javascript:ctrCliente.newItem();")

        var _clear = window.document.createElement("div");
        _clear.setAttribute("class", "clearfix");

        _divBottom.appendChild(_divleft);
        _divBottom.appendChild(_btnNew);
        _divBottom.appendChild(_clear);
        _divFilter.appendChild(_divBottom);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeClienteValidade.call(this);
        _formValid += _datepickerValidade.call(this);
        _formValid += _txtCPFValidade.call(this);
        return (_formValid == 0);
    }

    var _txtNomeClienteValidade = function () {
        if (_txtNomeCliente.value.length > 0) {
            return _toggleValidade.call(this, _txtNomeCliente, true, "");
        } else {
            return _toggleValidade.call(this, _txtNomeCliente, false, "Erro Nome Cliente!!!");
        }
    }

    var _datepickerValidade = function () {
        if (_txtDataNasc.value.length > 0) {
            var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
            if (regEx.test(_txtDataNasc.value)) {
                return _toggleValidade.call(this, _txtDataNasc, true, "");
            } else {
                return _toggleValidade.call(this, _txtDataNasc, false, "Data Invalida!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtDataNasc, true, "");
        }
    }

    var _txtCPFValidade = function () {
        if (_txtCPF.value.length > 0) {
            var cleanCPF = _txtCPF.value;
            cleanCPF = cleanCPF.split(".").join("").replace("-","");
            if (ValidaCPF(cleanCPF)) {
                return _toggleValidade.call(this, _txtCPF, true, "");
            } else {
                return _toggleValidade.call(this, _txtCPF, false, "CPF Invalido!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtCPF, true, "");
        }
    }



    function ValidaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
   

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtNomeCliente, true, "");
        _toggleValidade.call(this, _txtDataNasc, true, "");
        _toggleValidade.call(this, _txtCPF, true, "");
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

            cell0.innerHTML = _datasource[i].CodCliente;
            cell1.innerHTML = _datasource[i].Nome;
            cell2.innerHTML = "<a href='#' onClick='ctrCliente.editAt(" + _datasource[i].CodCliente + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrCliente.confirm(" + _datasource[i].CodCliente + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
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

    var _onBuscar = function () {
        _skip = 0;
        _indexPage = 1;
        if (_txtBusca.value.length > 3) {
            _search(_txtBusca.value);
        } else if (_txtBusca.value.length === 0) {
            _search("");
        }
    }

    function _search(nomeCliente) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cliente",
            type: "GET",
            data: {
                Select: nomeCliente,
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
        _searchTotalRecords(nomeCliente, _paginacao);
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCliente === id) {
                _txtNomeCliente.value = _datasource[i].Nome;
                _txtEndereco.value = _datasource[i].Endereco;
                _txtCEP.value = _datasource[i].CEP;

                _txtFoneCom.value = _datasource[i].FoneCom;
                _txtFoneRes.value = _datasource[i].FoneRes;
                _txtCelular.value = _datasource[i].Celular;
                _txtEmail.value = _datasource[i].Email;
                _txtRG.value = _datasource[i].RG;
                _txtCPF.value = _datasource[i].CPF;

                _txtEstadoCivil.value = _datasource[i].EstadoCivil;
                _txtObservacao.value = _datasource[i].Obs;
                _txtDataCadastro.value = _formatDate(_datasource[i].DataCadastro);
                _txtDataNasc.value = _formatDate(_datasource[i].DataNasc);

                for (j = 0; j < _ddlSexo.options.length; j++) {
                    if (_ddlSexo.options[j].value === _datasource[i].Sexo) {
                        _ddlSexo.selectedIndex = j;
                    }
                }

                for (k = 0; k < _ddlSituacao.options.length; k++) {
                    if (_ddlSituacao.options[k].value === _datasource[i].Situacao) {
                        _ddlSituacao.selectedIndex = k;
                    }
                }

                for (m = 0; m < _ddlProfissao.options.length; m++) {
                    if (_ddlProfissao.options[m].value == _datasource[i].CodProfissao) {
                        _ddlProfissao.selectedIndex = m;
                    }
                }
                for (n = 0; n < _ddlCidade.options.length; n++) {
                    if (_ddlCidade.options[n].value == _datasource[i].CodCidade) {
                        _ddlCidade.selectedIndex = n;
                    }
                }

                _loadBairro(_ddlCidade.options[_ddlCidade.selectedIndex].value, _datasource[i].CodBairro, _ddlBairroSelect);

                _idEdit = id;
            }
        }
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    $.datepicker.regional['pt-BR'] = {
        closeText: 'Fechar',
        prevText: '&lt;Anterior',
        nextText: 'Pr�ximo&gt;',
        currentText: 'Hoje',
        monthNames: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda-feira', 'Ter�a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    var _editClose = function () {
        _clearEditFields();
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    function _SetDateTime(strDateTime) {
        var dateTime = null;
        if (strDateTime.length > 0) {
            dateTime = new Date(parseInt(strDateTime.substring(6, 10)), parseInt(strDateTime.substring(3, 5)) - 1, parseInt(strDateTime.substring(0, 2)));
        }
        return dateTime;
    }
    function _formatDate(dateTime) {
        var dateString = "";
        if (dateTime) {
            var d = new Date(dateTime);
            var mes = (d.getMonth() + 1);
            var dia = d.getDate();
            var strDia = (dia.toString().length === 1) ? "0" + dia.toString() : dia.toString();
            var strMes = (mes.toString().length === 1) ? "0" + mes.toString() : mes.toString();
            dateString = strDia + "/" + strMes + "/" + d.getFullYear();
        } 
        return dateString;
    }


    var _save = function () {
        if (_validate.call(this)) {
            var dtDataNasc = _SetDateTime(_txtDataNasc.value);

            var _item = {
                CodCliente: _idEdit,
                Nome: _txtNomeCliente.value,
                Endereco: _txtEndereco.value,
                CEP: _txtCEP.value,
                FoneCom: _txtFoneCom.value,
                FoneRes: _txtFoneRes.value,
                Celular: _txtCelular.value,
                Email:_txtEmail.value,
                RG:_txtRG.value,
                CPF:_txtCPF.value,
                EstadoCivil:_txtEstadoCivil.value,
                Obs:_txtObservacao.value,
                DataNasc: dtDataNasc,
                Sexo: _ddlSexo.options[_ddlSexo.selectedIndex].value,
                Situacao: _ddlSituacao.options[_ddlSituacao.selectedIndex].value,
                CodProfissao: _ddlProfissao.options[_ddlProfissao.selectedIndex].value,
                CodCidade: _ddlCidade.options[_ddlCidade.selectedIndex].value,
                CodBairro: _ddlBairro.options[_ddlBairro.selectedIndex].value
            };

            _sabeDB(_item);
            _clearEditFields();

            _skip = 0;
            _indexPage = 1;

            _search(_txtBusca.value);
            $("#gridPainel").collapse('show');
            $("#editPainel").collapse('hide');

        } else {
            $("#divAlertSave").show();
        }
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCliente === id) {
                _confirmDeleteCliente.setMessage(_datasource[i].Nome);
            }
        }
        _confirmDeleteCliente.show();
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;

        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmDeleteCliente.hide();
        _resetValidation.call(this);
    }

    function _clearEditFields() {
        _idEdit = 0;
        _txtNomeCliente.value = "";
        _txtEndereco.value = "";
        _txtCEP.value = "";
        _txtFoneCom.value = "";
        _txtFoneRes.value = "";
        _txtCelular.value = "";
        _txtEmail.value = "";
        _txtRG.value = "";
        _txtCPF.value = "";
        _txtEstadoCivil.value = "";
        _txtObservacao.value = "";
        _txtDataCadastro.value = "";
        _txtDataNasc.value = "";
        _ddlSexo.selectedIndex = 0;
        _ddlSituacao.selectedIndex = 0;
        _ddlProfissao.selectedIndex = 0;
        _ddlCidade.selectedIndex = 0;
        _ddlBairro.selectedIndex = 0;

    }

    var _newItem = function () {
        _clearEditFields();
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cliente",
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
            url: "http://localhost:3412/cliente",
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

    function _searchTotalRecords(NomeCliente, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "http://localhost:3412/cliente",
            type: "GET",
            data: {
                Select: NomeCliente,
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
                li.innerHTML = "<a href='#' onClick='ctrCliente.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrCliente.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }

            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrCliente.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }
            _divleft.appendChild(_pagination);
        }

    }

    return {
        create: _create,
        toggleFilter: _toggleFilter,
        editAt: _editAt,
        editClose: _editClose,
        save: _save,
        confirm: _confirm,
        removeAt: _removeAt,
        newItem: _newItem,
        SetPage: _SetPage
    }
})();