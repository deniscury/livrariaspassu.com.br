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
        async: (tipo==1),
        success: function (retorno) {
            autores = retorno.dados[0];
            nomeTabela = (tipo == 1 ? "tbAutores" : "tbAutoresNaoVinculados");
            dadosDataTable = [];

            $("#" + nomeTabela + " tbody").empty();
            $.each(autores, function (chave, autor) {
                if(tipo == 1){
                    buttons = "<button class='btn btn-sm btn-success' title='Editar' onclick='editarAutor(" + autor.id + ");'><i class='fas fa-edit'></i></button> " +
                            "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirAutor(" + autor.id + ");'><i class='fas fa-trash'></i></button> ";
                }
                
                if(tipo == 2){
                    buttons = "<button class='btn btn-sm btn-success' title='Adicionar' onclick='vincularAutorLivro(" + autor.id + ");'><i class='fas fa-plus'></i></button> ";
                }

                dadosDataTable.push({
                    id: autor.id,
                    nome: autor.nome,
                    acoes: buttons
                });
            });

            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "id", type: "num"}, 
                {data: "nome"}, 
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
        beforeSend: function(){
            $("#btnSalvarAutor").hide();
        },
        success: function (retorno) {
            $("#btnSalvarAutor").show();
            mensagem = retorno.mensagem;

            if (mensagem != undefined) {
                alert(mensagem);
            }

            zerarDataTable("tbAutores", 3);

            quantidadeAutores();
            getAutores(1);

            $("#manutencaoAutor").modal("hide");
        },
        error: function (retorno) {
            $("#btnSalvarAutor").show();
            retorno = JSON.parse(retorno.responseText);

            mensagem = retorno.mensagem;
            erros = retorno.erros;

            $.each(erros, function (index, valor) {
                mensagem += "\n" + valor;
            });

            alert(mensagem);
        }
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
