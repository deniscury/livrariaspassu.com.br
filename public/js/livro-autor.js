$(document).ready(function () {
    getAssuntos();
    getRelatorio();

    $("#valorInicio").maskMoney({thousands:'.', decimal:',', allowZero:true, prefix: 'R$ '});
    $("#valorFim").maskMoney({thousands:'.', decimal:',', allowZero:true, prefix: 'R$ '});

    $("#valorInicio, #valorFim").blur(function(){
        valor_inicio = $(this).val().replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");

        if (valor_inicio == "0.00"){
            $(this).val("");
        }
    });
});

function atualizarRelatorio(){
    zerarDataTable("tbRelatorio", 8);
    getRelatorio();
}

function getRelatorio() {
    autor = $("#autor").val();
    assunto_id = $("#assunto").val();
    titulo = $("#titulo").val().trim();
    editora = $("#editora").val().trim();
    ano_publicacao = $("#anoPublicacao").val();
    valor_inicio = $("#valorInicio").val().replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    valor_fim = $("#valorFim").val().replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");

    if(valor_fim < valor_inicio){
        valor_fim = "";
    }

    $.ajax({
        url: urlApi + "/autor/livros",
        dataType: "json",
        type: "POST",
        crossDomain: true,
        async: true,
        data: {
            autor: autor,
            assunto_id: assunto_id,
            titulo: titulo,
            editora: editora,
            ano_publicacao: ano_publicacao,
            valor_inicio: valor_inicio,
            valor_fim: valor_fim
        },
        success: function (retorno) {
            autores = retorno.dados[0];
            dadosDataTable = [];
            
            $("#tbRelatorio tbody").empty();
            $.each(autores, function(index, autor){
                livros = autor.livros[0];
                $.each(livros, function(index, livro){
                    assuntos = livro.assuntos[0];

                    ul = "<ul>";
                    $.each(assuntos, function(index, assunto){
                        ul += "<li>" + assunto.descricao + "</li>"
                    });
                    ul += "</ul>";

                    dadosDataTable.push({
                        id: livro.id,
                        autor: autor.nome,
                        titulo: livro.titulo,
                        editora: livro.editora,
                        edicao: livro.edicao,
                        ano_publicacao: livro.ano_publicacao,
                        valor: "R$ "+livro.valor,
                        assuntos: ul
                    });
                });
            });
            
            dataTableOptions.data = dadosDataTable;
            dataTableOptions.columns = [
                {data: "id", type: "num"}, 
                {data: "autor"}, 
                {data: "titulo"}, 
                {data: "editora"}, 
                {data: "edicao"}, 
                {data: "ano_publicacao"}, 
                {data: "valor"}, 
                {data: "assuntos"}
            ];
            dataTableOptions.columnDefs = [
                {targets: 0, className: 'text-center'},
                {targets: 1, visible: false},
                {targets: 4, className: 'text-center'},
                {targets: 5, className: 'text-center'},
                {targets: 6, className: 'text-right'}
            ];
            dataTableOptions.rowGroup = {
                dataSrc: "autor"
            }
            dataTableOptions.order = [
                [1, "asc"]
            ]
            dataTableOptions.bFilter = false;

            $("#tbRelatorio").DataTable(dataTableOptions);
        }
    });
}

function getAssuntos() {
    $.ajax({
        url: urlApi + "/assunto",
        dataType: "json",
        type: "GET",
        crossDomain: true,
        async: true,
        success: function (retorno) {
            assuntos = retorno.dados[0];
        
            $("#assuntos").empty();

            option = "<option value='' selected>Todos</option>";
            $("#assunto").append(option);

            $.each(assuntos, function (chave, assunto) {                
                option = "<option value="+assunto.id+">"+assunto.descricao+"</option>";
                $("#assunto").append(option);
            });
        },
    });
}
