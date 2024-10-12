<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{ route('livraria.index') }}">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-book"></i>
        </div>
        <div class="sidebar-brand-text mx-3">
            Livraria Spassu
        </div>
    </a>
    
    <hr class="sidebar-divider my-0">

    <li class="nav-item active">
        <a class="nav-link" href="{{ route('livraria.index') }}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>
    
    <hr class="sidebar-divider">

    <div class="sidebar-heading">
        Manutenção
    </div>

    <li class="nav-item">
        <a class="nav-link" href="javascript:novoAssunto();">
            <i class="fas fa-fw fa-cog"></i>
            <span>Assuntos</span>
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="javascript:novoAutor();">
            <i class="fas fa-fw fa-cog"></i>
            <span>Autores</span>
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="javascript:novoLivro();">
            <i class="fas fa-fw fa-cog"></i>
            <span>Livros</span>
        </a>
    </li>

    <hr class="sidebar-divider">

    <div class="sidebar-heading">
        Relatórios
    </div>

    <li class="nav-item">
        <a class="nav-link" href="/relatorio/livros-autor">
            <i class="fas fa-fw fa-folder"></i>
            <span>Livros por autor</span>
        </a>
    </li>
</ul>
