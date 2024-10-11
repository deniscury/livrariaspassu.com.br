$(document).ready(function () {
    getQuantidadeRegistros();
    getDashboard();

    $("#manutencaoAssunto").on("hidden.bs.modal", function () {
        $("#idAssunto").val("");
        $("#descricaoAssunto").val("");
    });

    $("#manutencaoAutor").on("hidden.bs.modal", function () {
        $("#idAutor").val("");
        $("#nomeAutor").val("");
    });

    $("#manutencaoAssunto").on("hidden.bs.modal", function () {
        $("#idLivro").val("");
        $("#tituloLivro").val("");
        $("#editoraLivro").val("");
        $("#edicaoLivro").val("");
        $("#anoPublicacaoLivro").val("");
    });
});

var dataTableOptions = {
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.1/i18n/pt-BR.json",
    },
    lengthMenu: [5, 10, 25, 50, 75, 100],
    pageLength: 5,
    columns: [],
};

function getQuantidadeRegistros() {
    quantidadeAssuntos();
    quantidadeAutores();
    quantidadeLivros();
}

function quantidadeAssuntos() {
    $.ajax({
        url: urlApi + "/assunto/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdAssuntos").html(qtd);
        },
    });
}

function quantidadeAutores() {
    $.ajax({
        url: urlApi + "/autor/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdAutores").html(qtd);
        },
    });
}

function quantidadeLivros() {
    $.ajax({
        url: urlApi + "/livro/quantidade-registros",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;
            qtd = dados.registros;

            $("#dvQtdLivros").html(qtd);
        },
    });
}

function getDashboard() {
    getAssuntos();
    getAutores();
    getLivros();
}

function getAssuntos() {
    $.ajax({
        url: urlApi + "/assunto",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#tbAssuntos tbody").html("");

            $.each(dados[0], function (chave, valor) {
                tr =
                    "<tr>" +
                    "<td class='text-center'>" +
                    valor.id +
                    "</td>" +
                    "<td>" +
                    valor.descricao +
                    "</td>" +
                    "<td class='text-center'>" +
                    "<button class='btn btn-sm btn-success' title='Editar' onclick='editarAssunto(" +
                    valor.id +
                    ");'><i class='fas fa-edit'></i></button> " +
                    "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirAssunto(" +
                    valor.id +
                    ");'><i class='fas fa-trash'></i></button> " +
                    "<button class='btn btn-sm btn-primary' title='Vincular Livro'><i class='fas fa-book'></i></button> " +
                    "</td>" +
                    "</tr>";

                $("#tbAssuntos tbody").append(tr);
            });

            dataTableOptions.columns = [{ type: "num" }, null, null];
            $("#tbAssuntos").dataTable(dataTableOptions);
        },
    });
}

function getAutores() {
    $.ajax({
        url: urlApi + "/autor",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#tbAutores tbody").html("");

            $.each(dados[0], function (chave, valor) {
                tr =
                    "<tr>" +
                    "<td class='text-center'>" +
                    valor.id +
                    "</td>" +
                    "<td>" +
                    valor.nome +
                    "</td>" +
                    "<td class='text-center'>" +
                    "<button class='btn btn-sm btn-success' title='Editar'onclick='editarAutor(" +
                    valor.id +
                    ");'><i class='fas fa-edit'></i></button> " +
                    "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirAutor(" +
                    valor.id +
                    ");'><i class='fas fa-trash'></i></button> " +
                    "<button class='btn btn-sm btn-primary' title='Vincular Livro'><i class='fas fa-book'></i></button> " +
                    "</td>" +
                    "</tr>";

                $("#tbAutores tbody").append(tr);
            });

            dataTableOptions.columns = [{ type: "num" }, null, null];
            $("#tbAutores").dataTable(dataTableOptions);
        },
    });
}

function getLivros() {
    $.ajax({
        url: urlApi + "/livro",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#tbLivros tbody").html("");

            $.each(dados[0], function (chave, valor) {
                tr =
                    "<tr>" +
                    "<td class='text-center'>" +
                    valor.id +
                    "</td>" +
                    "<td>" +
                    valor.titulo +
                    "</td>" +
                    "<td>" +
                    valor.editora +
                    "</td>" +
                    "<td class='text-center'>" +
                    valor.edicao +
                    "</td>" +
                    "<td class='text-center'>" +
                    valor.ano_publicacao +
                    "</td>" +
                    "<td class='text-center'>" +
                    "<button class='btn btn-sm btn-success' title='Editar' onclick='editarLivro(" +
                    valor.id +
                    ");'><i class='fas fa-edit'></i></button> " +
                    "<button class='btn btn-sm btn-danger' title='Excluir' onclick='excluirLivro(" +
                    valor.id +
                    ");'><i class='fas fa-trash'></i></button> " +
                    "<button class='btn btn-sm btn-warning' title='Vincular Assunto'><i class='fas fa-file'></i></button> " +
                    "<button class='btn btn-sm btn-primary' title='Vincular Autor'><i class='fas fa-user'></i></button> " +
                    "</td>" +
                    "</tr>";

                $("#tbLivros tbody").append(tr);
            });
            dataTableOptions.columns = [
                { type: "num" },
                null,
                null,
                null,
                null,
                null,
            ];
            $("#tbLivros").dataTable(dataTableOptions);
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
            table = $("#tbAssuntos").DataTable();
            table.destroy();

            quantidadeAssuntos();
            getAssuntos();
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
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                table = $("#tbAssuntos").DataTable();
                table.destroy();

                quantidadeAssuntos();
                getAssuntos();
            },
        });
    }
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
            table = $("#tbAutores").DataTable();
            table.destroy();

            quantidadeAutores();
            getAutores();
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
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                table = $("#tbAutores").DataTable();
                table.destroy();

                quantidadeAutores();
                getAutores();
            },
        });
    }
}

function novoLivro() {
    $("#manutencaoLivro").modal();
}

function editarLivro(id) {
    $("#manutencaoLivro").modal();

    getLivro(id);
}

function getLivro(id) {
    $.ajax({
        url: urlApi + "/livro/" + id,
        dataType: "json",
        type: "GET",
        crossDomain: true,
        success: function (retorno) {
            dados = retorno.dados;

            $("#idLivro").val(dados.id);
            $("#tituloLivro").val(dados.titulo);
            $("#editoraLivro").val(dados.editora);
            $("#edicaoLivro").val(dados.edicao);
            $("#anoPublicacaoLivro").val(dados.ano_publicacao);
        },
    });
}

function salvarLivro() {
    id = $("#idLivro").val();
    titulo = $("#tituloLivro").val().trim();
    editora = $("#editoraLivro").val().trim();
    edicao = $("#edicaoLivro").val();
    ano_publicacao = $("#anoPublicacaoLivro").val();

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

    $.ajax({
        url: urlApi + "/livro" + (id == "" ? "" : "/" + id),
        dataType: "json",
        type: id == "" ? "POST" : "PATCH",
        crossDomain: true,
        data: {
            titulo: titulo,
            editora: editora,
            edicao: edicao,
            ano_publicacao: ano_publicacao,
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
            table = $("#tbLivros").DataTable();
            table.destroy();

            quantidadeLivros();
            getLivros();
            $("#manutencaoLivro").modal("hide");
        },
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
            success: function (retorno) {
                mensagem = retorno.mensagem;
                if (mensagem != undefined) {
                    alert(mensagem);
                }

                table = $("#tbAutores").DataTable();
                table.destroy();

                quantidadeLivros();
                getLivros();
            },
        });
    }
}
