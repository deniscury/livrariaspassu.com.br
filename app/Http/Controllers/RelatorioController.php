<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    public function livrosPorAutor(){
        return view('relatorio/livro-autor/index');
    }
}
