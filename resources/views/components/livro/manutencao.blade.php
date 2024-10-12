<div id="manutencaoLivro" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">						
				<h4 class="modal-title">Manutenção Livro</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">					
				<div class="form-group">
					<label>Título</label>
					<input type="hidden" class="form-control" id="idLivro">
					<input type="text" class="form-control" id="tituloLivro" required>
				</div>					
				<div class="form-group">
					<label>Editora</label>
					<input type="text" class="form-control" id="editoraLivro" required>
				</div>						
				<div class="form-group">
					<label>Edição</label>
					<input type="number" class="form-control" id="edicaoLivro" required>
				</div>						
				<div class="form-group">
					<label>Ano de Publicação</label>
					<input type="text" class="form-control" id="anoPublicacaoLivro" required>
				</div>					
				<div class="form-group">
					<label>Valor</label>
					<input type="text" class="form-control" id="valorLivro" required>
				</div>						
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<button class="btn btn-success" onclick=salvarLivro();>Salvar</button>
			</div>
		</div>
	</div>
</div>