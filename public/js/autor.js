$(document).ready(function () {
    quantidadeAutores();
    getAutores(1);

    $("#manutencaoAutor").on("hidden.bs.modal", function () {
        $("#idAutor").val("");
        $("#nomeAutor").val("");
    });
});

function quantidadeAutores() {
    $.ajax({
        url: urlApi + "/autor/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdAutores").html(qtd);
        },
    });
}

function getAutores(tipo) {
    $.ajax({
        url: urlApi + "/autor",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;
            nomeTabela = (tipo == 1 ? "tbAutores" : "tbAutoresNaoVinculados");

            $("#" + nomeTabela + " tbody").empty();
            $.each(dados[0], function (chave, valor) {
                tr =
                    "<tr>" +
                        "<td class='text-center'>" +
                            valor.id +
                        "</td>" +
                        "<td>" +
                            valor.nome +
                        "</td>";
                
                if(tipo == 1){
                    tr +=
                        "<td class='text-center'>" +
                            "<button class='btn btn-sm btn-success' title='Editar' onclick='editarAutor(" + valor.id + ");'><i class='fas fa-edit'></i></button> " +
                            "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirAutor(" + valor.id + ");'><i class='fas fa-trash'></i></button> " +
                        "</td>" +
                    "</tr>";
                }
                
                if(tipo == 2){
                    tr +=
                        "<td class='text-center' width='5%'>" +
                            "<button class='btn btn-sm btn-success' title='Adicionar' onclick='vincularAutorLivro(" + valor.id + ");'><i class='fas fa-plus'></i></button> " +
                        "</td>" +
                    "</tr>";
                }

                $("#" + nomeTabela).append(tr);
            });

            dataTableOptions.columns = [{ type: "num" }, null, null];
            $("#" + nomeTabela).dataTable(dataTableOptions);
        },
    });
}

function novoAutor() {
    $("#manutencaoAutor").modal();
}

function editarAutor(id) {
    $("#manutencaoAutor").modal();

    getAutor(id);
}

function getAutor(id) {
    $.ajax({
        url: urlApi + "/autor/" + id,
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#idAutor").val(dados.id);
            $("#nomeAutor").val(dados.nome);
        },
    });
}

function salvarAutor() {
    id = $("#idAutor").val();
    nome = $("#nomeAutor").val().trim();

    if (nome == "") {
        alert("Por favor preencha a nome do(a) autor(a)");
        return;
    }

    $.ajax({
        url: urlApi + "/autor" + (id == "" ? "" : "/" + id),
        dataType: "json",
        type: id == "" ? "POST" : "PATCH",
        crossDomain: true,
        async: true,
        data: {
            nome: nome,
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
            zerarDataTable("tbAutores", 3);

            quantidadeAutores();
            getAutores(1);
            $("#manutencaoAutor").modal("hide");
        },
    });
}

function excluirAutor(id) {
    confirmar = confirm(
        "Tem certeza de que deseja excluir esse(a) autor(a), todos os vínculos dele(a) também serão excluídos?"
    );

    if (confirmar) {
        $.ajax({
            url: urlApi + "/autor/" + id,
            dataType: "json",
            type: "DELETE",
            crossDomain: true,
            async: true,
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                zerarDataTable("tbAutores", 3);

                quantidadeAutores();
                getAutores(1);
            },
        });
    }
}
