<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\RelatorioController;
use Illuminate\Support\Facades\Route;

Route::get('/', 
    array(
        IndexController::class, 'index'
    )
)->name('livraria.index');

Route::get('/relatorio/livro-autor', 
    array(
        RelatorioController::class, 'livrosPorAutor'
    )
)->name('livraria.livro-autor');