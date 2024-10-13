$(document).ready(function () {
    quantidadeAssuntos();
    getAssuntos(1);

    $("#manutencaoAssunto").on("hidden.bs.modal", function () {
        $("#idAssunto").val("");
        $("#descricaoAssunto").val("");
    });
});

function quantidadeAssuntos() {
    $.ajax({
        url: urlApi + "/assunto/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdAssuntos").html(qtd);
        },
    });
}

function getAssuntos(tipo) {
    $.ajax({
        url: urlApi + "/assunto",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            assuntos = retorno.dados[0];
            nomeTabela = (tipo == 1 ? "tbAssuntos" : "tbAssuntosNaoVinculados");
            dadosDataTable = [];

            $("#" + nomeTabela + " tbody").empty();
            $.each(assuntos, function (chave, assunto) {                
                if(tipo == 1){
                    buttons = "<button class='btn btn-sm btn-success' title='Editar' onclick='editarAssunto(" + assunto.id + ");'><i class='fas fa-edit'></i></button> " +
                            "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirAssunto(" + assunto.id + ");'><i class='fas fa-trash'></i></button> ";
                }
                
                if(tipo == 2){
                    buttons = "<button class='btn btn-sm btn-success' title='Adicionar' onclick='vincularAssuntoLivro(" + assunto.id + ");'><i class='fas fa-plus'></i></button>";
                }

                dadosDataTable.push({
                    id: assunto.id,
                    descricao: assunto.descricao,
                    acoes: buttons
                });
            });

            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "id", type: "num"}, 
                {data: "descricao"}, 
                {data: "acoes"}
            ];
            dataTableOptions.columnDefs = [
                {targets: 0, className: 'text-center'},
                {targets: 2, className: 'text-center'}
            ];

            $("#" + nomeTabela).dataTable(dataTableOptions);
        },
    });
}

function novoAssunto() {
    $("#manutencaoAssunto").modal();
}

function editarAssunto(id) {
    $("#manutencaoAssunto").modal();

    getAssunto(id);
}

function getAssunto(id) {
    $.ajax({
        url: urlApi + "/assunto/" + id,
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#idAssunto").val(dados.id);
            $("#descricaoAssunto").val(dados.descricao);
        },
    });
}

function salvarAssunto() {
    id = $("#idAssunto").val();
    descricao = $("#descricaoAssunto").val().trim();

    if (descricao == "") {
        alert("Por favor preencha a descrição do assunto");
        return;
    }

    $.ajax({
        url: urlApi + "/assunto" + (id == "" ? "" : "/" + id),
        dataType: "json",
        type: id == "" ? "POST" : "PATCH",
        crossDomain: true,
        async: true,
        data: {
            descricao: descricao,
        },
        success: function (retorno) {
            mensagem = retorno.mensagem;

            if (mensagem != undefined) {
                alert(mensagem);
            }
        },
        error: function (retorno) {
            retorno = JSON.parse(retorno.responseText);

            mensagem = retorno.mensagem;
            erros = retorno.erros;

            $.each(erros, function (index, valor) {
                mensagem += "\n" + valor;
            });

            alert(mensagem);
        },
        complete: function () {
            zerarDataTable("tbAssuntos", 3);

            quantidadeAssuntos();
            getAssuntos(1);
            $("#manutencaoAssunto").modal("hide");
        },
    });
}

function excluirAssunto(id) {
    confirmar = confirm(
        "Tem certeza de que deseja excluir esse assunto, todos os vínculos dele também serão excluídos?"
    );

    if (confirmar) {
        $.ajax({
            url: urlApi + "/assunto/" + id,
            dataType: "json",
            type: "DELETE",
            crossDomain: true,
            async: true,
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                zerarDataTable("tbAssuntos", 3);

                quantidadeAssuntos();
                getAssuntos(1);
            },
        });
    }
}
