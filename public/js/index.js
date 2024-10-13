var dataTableOptions = {
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.1/i18n/pt-BR.json",
    },
    lengthMenu: [5, 10, 25, 50, 75, 100],
    pageLength: 5
};

$(document).ready(function () {});

function zerarDataTable(tabela, colspan){
    table = $("#"+tabela).DataTable();
    table.destroy();
    $("#" + tabela + " tbody").empty().append(
        "<tr><td colspan='" + colspan + "' class='text-center'><img class='img-responsive img-rounded' style='max-height: 30px; max-width: 30px;' src='/img/ajax_loader.gif'></td></tr>"
    );
};
