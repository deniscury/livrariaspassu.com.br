<div id="manutencaoAssunto" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">						
				<h4 class="modal-title">Manutenção Assunto</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">					
				<div class="form-group">
					<label>Descrição</label>
					<input type="hidden" class="form-control" id="idAssunto">
					<input type="text" class="form-control" id="descricaoAssunto" required>
				</div>				
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<button class="btn btn-success" onclick=salvarAssunto();>Salvar</button>
			</div>
		</div>
	</div>
</div>