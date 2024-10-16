<div id="manutencaoAutor" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">						
				<h4 class="modal-title">Manutenção Autor</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">					
				<div class="form-group">
				<label>Nome</label>
				<input type="hidden" class="form-control" id="idAutor">
				<input type="text" class="form-control" id="nomeAutor" required>
				</div>				
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<button class="btn btn-success" id="btnSalvarAutor" onclick=salvarAutor();>Salvar</button>
			</div>
		</div>
	</div>
</div>