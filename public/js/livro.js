$(document).ready(function () {
    quantidadeLivros();
    getLivros();

    $("#valorLivro").maskMoney({thousands:'.', decimal:',', allowZero:true, prefix: 'R$ '});

    $("#manutencaoLivro").on("hidden.bs.modal", function () {
        $("#idLivro").val("");
        $("#tituloLivro").val("");
        $("#editoraLivro").val("");
        $("#edicaoLivro").val("");
        $("#anoPublicacaoLivro").val("");
        $("#valorLivro").val("");
    });

    $("#manutencaoLivroAssunto").on("hidden.bs.modal", function () {
        $("#livroAssuntoVinculo").html(
            "<img class='img-responsive img-rounded' style='max-height: 30px; max-width: 30px;' src='img/ajax_loader.gif'>"
        );

        zerarDataTable("tbAssuntosVinculados", 3);
        zerarDataTable("tbAssuntosNaoVinculados", 3);
    });

    $("#manutencaoLivroAutor").on("hidden.bs.modal", function () {
        $("#livroAutorVinculo").html(
            "<img class='img-responsive img-rounded' style='max-height: 30px; max-width: 30px;' src='img/ajax_loader.gif'>"
        );

        zerarDataTable("tbAutoresVinculados", 3);
        zerarDataTable("tbAutoresNaoVinculados", 3);
    });
});

function quantidadeLivros() {
    $.ajax({
        url: urlApi + "/livro/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdLivros").html(qtd);
        },
    });
}

function getLivros() {
    $.ajax({
        url: urlApi + "/livro",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            livros = retorno.dados[0];
            dadosDataTable = [];

            $("#tbLivros tbody").empty();
            $.each(livros, function (chave, livro) {
                buttons = "<button class='btn btn-sm btn-success' title='Editar' onclick='editarLivro(" + livro.id +");'><i class='fas fa-edit'></i></button> " +
                            "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirLivro(" + livro.id + ");'><i class='fas fa-trash'></i></button> " +
                            "<button class='btn btn-sm btn-warning' title='Vincular Assunto' onclick='vincularAssunto(" + livro.id + ");'><i class='fas fa-file'></i></button> " +
                            "<button class='btn btn-sm btn-primary' title='Vincular Autor' onclick='vincularAutor(" + livro.id + ");'><i class='fas fa-user'></i></button> ";
                

                dadosDataTable.push({
                    id: livro.id,
                    titulo: livro.titulo,
                    editora: livro.editora,
                    edicao: livro.edicao,
                    ano_publicacao: livro.ano_publicacao,
                    valor: "R$ "+livro.valor,
                    acoes: buttons
                });
            });

            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "id", type: "num"}, 
                {data: "titulo"}, 
                {data: "editora"}, 
                {data: "edicao"},
                {data: "ano_publicacao"}, 
                {data: "valor"}, 
                {data: "acoes"}
            ];
            dataTableOptions.columnDefs = [
                {targets: 0, className: 'text-center'},
                {targets: 3, className: 'text-center'},
                {targets: 4, className: 'text-center'},
                {targets: 5, className: 'text-right'},
                {targets: 6, className: 'text-center'}
            ];

            $("#tbLivros").dataTable(dataTableOptions);
        },
    });
}

function novoLivro() {
    $("#manutencaoLivro").modal();
}

function editarLivro(id) {
    $("#manutencaoLivro").modal();

    getLivro(id, 1);
}

function getLivro(id, tipo) {
    $.ajax({
        url: urlApi + "/livro/" + id,
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados;

            if (tipo == 1) {
                carregarDadosManutencaoLivro(dados);
            }

            if (tipo == 2) {
                carregarDadosManutencaoLivroAssunto(dados);
            }

            if (tipo == 3) {
                carregarDadosManutencaoLivroAutor(dados);
            }
        },
    });
}

function carregarDadosManutencaoLivro(dados) {
    $("#idLivro").val(dados.id);
    $("#tituloLivro").val(dados.titulo);
    $("#editoraLivro").val(dados.editora);
    $("#edicaoLivro").val(dados.edicao);
    $("#anoPublicacaoLivro").val(dados.ano_publicacao);
    $("#valorLivro").val(dados.valor);
}

function carregarDadosManutencaoLivroAssunto(dados) {
    carregarlivroAssuntoVinculo(dados);
    getAssuntos(2);
    getAssuntosVinculados(dados.id);
}

function carregarlivroAssuntoVinculo(dados){
    $("#idLivroAssuntoVinculo").val(dados.id);

    livroAssuntoVinculo = "<strong>" + dados.id + " - " + dados.titulo + " - R$ " + dados.valor + "</strong>" + "<br>" +
        "<small>" + "Editora: " + dados.editora + " - Edição: " + dados.edicao + " - Ano de publicação: " + dados.ano_publicacao + "</small>";

    $("#livroAssuntoVinculo").html(livroAssuntoVinculo);
}

function getAssuntosVinculados(id) {
    $.ajax({
        url: urlApi + "/livro-assunto/livro/" + id + "/assunto/0",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados[0];
            dadosDataTable = [];

            $("#tbAssuntosVinculados tbody").empty();
            $.each(dados, function (chave, valor) {
                button = "<button class='btn btn-sm btn-danger' title='Remover' onclick='desvincularAssuntoLivro(" + valor.assunto.id + ");'><i class='fas fa-minus'></i></button> ";

                $("#tbAssuntosNaoVinculados").DataTable().row( function ( idx, data, node ) {
                    return data.id == valor.assunto.id;
                }).remove().draw();

                dadosDataTable.push({
                    acoes: button,
                    id: valor.assunto.id,
                    descricao: valor.assunto.descricao
                });
            });

            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "acoes"}, 
                {data: "id", type: "num"}, 
                {data: "descricao"}
            ];
            dataTableOptions.columnDefs = [
                {targets: 0, className: 'text-center'},
                {targets: 1, className: 'text-center'}
            ];
            $("#tbAssuntosVinculados").dataTable(dataTableOptions);
        },
    });
}

function carregarDadosManutencaoLivroAutor(dados) {
    carregarlivroAutorVinculo(dados);
    getAutores(2);
    getAutoresVinculados(dados.id);
}

function carregarlivroAutorVinculo(dados){
    $("#idLivroAutorVinculo").val(dados.id);

    livroAutorVinculo = "<strong>" + dados.id + " - " + dados.titulo + " - R$ " + dados.valor + "</strong>" + "<br>" +
        "<small>" + "Editora: " + dados.editora + " - Edição: " + dados.edicao + " - Ano de publicação: " + dados.ano_publicacao + "</small>";

    $("#livroAutorVinculo").html(livroAutorVinculo);
}

function getAutoresVinculados(id) {
    $.ajax({
        url: urlApi + "/livro-autor/livro/" + id + "/autor/0",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            dados = retorno.dados[0];
            dadosDataTable = [];

            $("#tbAutoresVinculados tbody").empty();
            $.each(dados, function (chave, valor) {
                button = "<button class='btn btn-sm btn-danger' title='Remover' onclick='desvincularAutorLivro(" + valor.autor.id + ");'><i class='fas fa-minus'></i></button> ";

                $("#tbAutoresNaoVinculados").DataTable().row( function ( idx, data, node ) {
                    return data.id == valor.autor.id;
                }).remove().draw();

                dadosDataTable.push({
                    acoes: button,
                    id: valor.autor.id,
                    nome: valor.autor.nome
                });
            });
            
            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "acoes"}, 
                {data: "id", type: "num"}, 
                {data: "nome"}
            ];
            dataTableOptions.columnDefs = [
                {targets: 0, className: 'text-center'},
                {targets: 1, className: 'text-center'}
            ];
            $("#tbAutoresVinculados").dataTable(dataTableOptions);
        },
    });
}

function salvarLivro() {
    id = $("#idLivro").val();
    titulo = $("#tituloLivro").val().trim();
    editora = $("#editoraLivro").val().trim();
    edicao = $("#edicaoLivro").val();
    ano_publicacao = $("#anoPublicacaoLivro").val();
    valor = $("#valorLivro").val().replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");

    if (titulo == "") {
        alert("Por favor preencha o título do livro");
        return;
    }

    if (editora == "") {
        alert("Por favor preencha a editora do livro");
        return;
    }

    if (edicao == "") {
        alert("Por favor preencha a edição do livro");
        return;
    }

    if (ano_publicacao == "") {
        alert("Por favor preencha o ano de publicação do livro");
        return;
    }

    if (valor == "" || valor == "0.00") {
        alert("Por favor preencha um valor maior do que zero para o livro");
        return;
    }

    $.ajax({
        url: urlApi + "/livro" + (id == "" ? "" : "/" + id),
        dataType: "json",
        type: id == "" ? "POST" : "PATCH",
        crossDomain: true,
        async: true,
        data: {
            titulo: titulo,
            editora: editora,
            edicao: edicao,
            ano_publicacao: ano_publicacao,
            valor: valor,
        },
        beforeSend: function(){
            $("#btnSalvarLivro").hide();
        },
        success: function (retorno) {
            $("#btnSalvarLivro").show();
            mensagem = retorno.mensagem;

            if (mensagem != undefined) {
                alert(mensagem);
            }

            zerarDataTable("tbLivros", 7);

            quantidadeLivros();
            getLivros();
            
            $("#manutencaoLivro").modal("hide");
        },
        error: function (retorno) {
            $("#btnSalvarLivro").show();
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

function excluirLivro(id) {
    confirmar = confirm(
        "Tem certeza de que deseja excluir esse livro, todos os vínculos dele também serão excluídos?"
    );

    if (confirmar) {
        $.ajax({
            url: urlApi + "/livro/" + id,
            dataType: "json",
            type: "DELETE",
            crossDomain: true,
            async: true,
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                zerarDataTable("tbLivros", 7);

                quantidadeLivros();
                getLivros();
            },
        });
    }
}

function vincularAssunto(id) {
    $("#manutencaoLivroAssunto").modal();

    getLivro(id, 2);
}

function vincularAssuntoLivro(assunto_id){
    zerarDataTable("tbAssuntosVinculados", 3);
    zerarDataTable("tbAssuntosNaoVinculados", 3);
    livro_id = $("#idLivroAssuntoVinculo").val();

    $.ajax({
        url: urlApi + "/livro-assunto",
        dataType: "json",
        type: "POST",
        crossDomain: true,
        async: true,
        data: {
            livro_id: livro_id,
            assunto_id: assunto_id
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
            getAssuntos(2);
            getAssuntosVinculados(livro_id);
        },
    });
}

function desvincularAssuntoLivro(assunto_id){
    zerarDataTable("tbAssuntosVinculados", 3);
    zerarDataTable("tbAssuntosNaoVinculados", 3);
    livro_id = $("#idLivroAssuntoVinculo").val();

    $.ajax({
        url: urlApi + "/livro-assunto/livro/" + livro_id + "/assunto/" + assunto_id,
        dataType: "json",
        type: "DELETE",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            mensagem = retorno.mensagem;

            if (mensagem != undefined) {
                alert(mensagem);
            }
        },
        complete: function () {
            getAssuntos(2);
            getAssuntosVinculados(livro_id);
        },
    });
}

function vincularAutor(id) {
    $("#manutencaoLivroAutor").modal();

    getLivro(id, 3);
}

function vincularAutorLivro(autor_id){
    zerarDataTable("tbAutoresVinculados", 3);
    zerarDataTable("tbAutoresNaoVinculados", 3);
    livro_id = $("#idLivroAutorVinculo").val();

    $.ajax({
        url: urlApi + "/livro-autor",
        dataType: "json",
        type: "POST",
        crossDomain: true,
        async: true,
        data: {
            livro_id: livro_id,
            autor_id: autor_id
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
            getAutores(2);
            getAutoresVinculados(livro_id);
        },
    });
}

function desvincularAutorLivro(autor_id){
    zerarDataTable("tbAutoresVinculados", 3);
    zerarDataTable("tbAutoresNaoVinculados", 3);
    livro_id = $("#idLivroAutorVinculo").val();

    $.ajax({
        url: urlApi + "/livro-autor/livro/" + livro_id + "/autor/" + autor_id,
        dataType: "json",
        type: "DELETE",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            mensagem = retorno.mensagem;

            if (mensagem != undefined) {
                alert(mensagem);
            }
        },
        complete: function () {
            getAutores(2);
            getAutoresVinculados(livro_id);
        },
    });
}
