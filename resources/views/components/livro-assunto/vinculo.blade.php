<div id="manutencaoLivroAssunto" class="modal fade">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">						
				<h4 class="modal-title">Vincular Assunto</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<div class="row">	
					<div class="col-xl-12 col-md-12 mb-12">
						<div class="card border-left-primary shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
											Livro
										</div>
										
										<input type="hidden" id="idLivroAssuntoVinculo">
										<div class="text-md text-primary" id="livroAssuntoVinculo">
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
					<div class="col-xl-12 col-md-12 mb-12">	
						<hr/>
					</div>
				</div>		
				<div class="row">
					<div class="col-md-6 col-xl-6 mb-4">
						<div class="card shadow mb-4">
							<div class="card-header py-3">
								<h6 class="m-0 font-weight-bold text-primary">Assuntos</h6>
							</div>
							<div class="card-body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped dataTable" id="tbAssuntosNaoVinculados" width="100%" cellspacing="0">
										<thead>
											<tr>
												<th>Código</th>
												<th>Descrição</th>
												<th>Adicionar</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>Código</th>
												<th>Descrição</th>
												<th>Adicionar</th>
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
								<h6 class="m-0 font-weight-bold text-primary">Assuntos vinculados</h6>
							</div>
							<div class="card-body">
								<div class="table-responsive">
									<table class="table table-bordered table-striped dataTable" id="tbAssuntosVinculados" width="100%" cellspacing="0">
										<thead>
											<tr>
												<th>Remover</th>
												<th>Código</th>
												<th>Descrição</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>Remover</th>
												<th>Código</th>
												<th>Descrição</th>
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
				</div>		
			</div>
		</div>
	</div>
</div>