var ConfirmDelete = (function () {
    // <div id="ConfirmDelete"></div> criar uma div na pagina;
    var _lblMensagem;
    var _create = function (clickconfirm) {

        _mainDiv = window.document.getElementById("ConfirmDelete");
        
        _divConfirm = window.document.createElement("div");
        _divConfirm.setAttribute("id", "mConfirm");
        _divConfirm.setAttribute("class", "modal fade");
        _divConfirm.setAttribute("role", "dialog");

        var _divModalDialog = window.document.createElement("div");
        _divModalDialog.setAttribute("class", "modal-dialog modal-sm");

        var _divContent = window.document.createElement("div");
        _divContent.setAttribute("class", "modal-content");

        var _divHeader = window.document.createElement("div");
        _divHeader.setAttribute("class", "modal-header");

        var _btnX = window.document.createElement("button");
        _btnX.setAttribute("type", "button");
        _btnX.setAttribute("class", "close");
        _btnX.setAttribute("data-dismiss", "modal");
        _btnX.innerHTML = "&times;";

        var _h4 = window.document.createElement("h4");
        _h4.setAttribute("class", "modal-title");
        _h4.innerHTML = "Confirmar";

        var _divFooter = window.document.createElement("div");
        _divFooter.setAttribute("class", "modal-footer");

        var _btnClose = window.document.createElement("button");
        _btnClose.setAttribute("type", "button");
        _btnClose.setAttribute("class", "btn btn-default");
        _btnClose.setAttribute("data-dismiss", "modal");
        _btnClose.innerHTML = "Close";

        var _btnConfirm = window.document.createElement("button");
        _btnConfirm.setAttribute("type", "button");
        _btnConfirm.setAttribute("class", "btn btn-primary");
        _btnConfirm.setAttribute("onclick", "javascript:" + clickconfirm + ";")
        _btnConfirm.innerHTML = "OK";

        _divFooter.appendChild(_btnClose);
        _divFooter.appendChild(_btnConfirm);
        _divHeader.appendChild(_btnX);
        _divHeader.appendChild(_h4);
        _divContent.appendChild(_divHeader);

        var _divEdit = window.document.createElement("div");
        _divEdit.id = 'divEdit';
        _divEdit.setAttribute("class", "modal-body");
        _divContent.appendChild(_divEdit);

        _lblMensagem = window.document.createElement("label");
        _lblMensagem.innerHTML = "";
        _divEdit.appendChild(_lblMensagem);

        _divContent.appendChild(_divFooter);
        _divModalDialog.appendChild(_divContent);
        _divConfirm.appendChild(_divModalDialog);

        _mainDiv.appendChild(_divConfirm);
    }
  
    var _setMessage = function (msg) {
        _lblMensagem.innerHTML = msg;
    }

    return {
        create: _create,
        setMessage: _setMessage
    }

})();
