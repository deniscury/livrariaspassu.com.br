@component('components/cabecalho',
    array(
        'titulo' => 'Dashboard'
    )
)
@endcomponent
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>
    
    <div class="row">
        <div class="col-xl-4 col-md-4 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Assuntos
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="dvQtdAssuntos">
                                @component('components/ajaxLoader')
                                @endcomponent
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-file fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-xl-4 col-md-4 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Autores
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="dvQtdAutores">
                                @component('components/ajaxLoader')
                                @endcomponent
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-xl-4 col-md-4 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Livros
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="dvQtdLivros">
                                @component('components/ajaxLoader')
                                @endcomponent
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-6 col-xl-6 mb-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <h6 class="m-0 font-weight-bold text-primary">Assuntos</h6>
                        </div>
                        <div class="col-md-6 text-right">
                            <a href="#manutencaoAssunto" class="btn btn-sm btn-success" data-toggle="modal">
                                <i class="fa fa-plus"></i>&nbsp;Novo assunto
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped dataTable" id="tbAssuntos" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td colspan="3" class="text-center">
                                        @component('components/ajaxLoader')
                                        @endcomponent
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-xl-6 mb-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <h6 class="m-0 font-weight-bold text-primary">Autores</h6>
                        </div>
                        <div class="col-md-6 text-right">
                            <button class="btn btn-sm btn-success" data-toggle="modal" onclick="novoAutor();">
                                <i class="fa fa-plus"></i>&nbsp;Novo(a) autor(a)
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped dataTable" id="tbAutores" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td colspan="3" class="text-center">
                                        @component('components/ajaxLoader')
                                        @endcomponent
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 col-xl-12 mb-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <h6 class="m-0 font-weight-bold text-primary">Livros</h6>
                        </div>
                        <div class="col-md-6 text-right">
                            <a class="btn btn-sm btn-success" data-toggle="modal" onclick="novoLivro();">
                                <i class="fa fa-plus"></i>&nbsp;Novo livro
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped dataTable" id="tbLivros" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Editora</th>
                                    <th>Edição</th>
                                    <th>Ano Publicação</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Editora</th>
                                    <th>Edição</th>
                                    <th>Ano Publicação</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td colspan="7" class="text-center">
                                        @component('components/ajaxLoader')
                                        @endcomponent
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>                   

    
@component('components/assunto/manutencao')          
@endcomponent   

@component('components/autor/manutencao')          
@endcomponent  

@component('components/livro/manutencao')          
@endcomponent   

@component('components/livro-assunto/vinculo')          
@endcomponent   

@component('components/livro-autor/vinculo')          
@endcomponent   
@component('components/rodape',
    array(
        'scripts' => array('index', 'assunto', 'autor', 'livro')
    )
)
@endcomponent