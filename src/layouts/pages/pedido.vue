<template>
	<div>
		<breadcrumb name="Listado de Pedidos"></breadcrumb>
		<div class="container-section">
			<div class="row">
				<div class="col-12">
	    			<p class="q-display-2 color-baked-title" align="center">Listado de Pedidos</p>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="table-responsive">					
						<table class="table">
							<thead>
		    					<tr>
		    					  	<th colspan="2">Name</th>
									<th>Cantidad</th>
									<th>Sub-Total</th>
								</tr>
							</thead>
		  					<tbody>
		    					<tr>
		    						<td class="table-description">
		    							<div class="table-description__img">
		    								<img src="statics/pizza.png" alt="pizza">
		    							</div>
		    						</td>
		    						<td class="table-description table-description--info">
		    							<span class="q-display-1 color-baked-title d-block">Pizza Napolitana</span>
										<p>Tamaño: Personal</p>
										<p>Adicionales: 0</p>
		    						</td>
		    						<td class="table-description table-description--boder">
		    							<span>Cantidad:</span>
		    							<input type="number" class="input-count-product" value="1" readonly>
		    							<!-- <q-numeric v-model="number" :min="1" :max="17" ></q-numeric> -->
		    						</td>
		    						<td class="table-price"><span class="q-display">$10.900</span></td>
		    					</tr>
		    					<tr>
		    						<td class="table-description">
		    							<div class="table-description__img">
		    								<img src="statics/pizza.png" alt="pizza">
		    							</div>
		    						</td>
		    						<td class="table-description table-description--info">
		    							<span class="q-display-1 color-baked-title d-block">Pizza Napolitana</span>
										<p>Tamaño: Personal</p>
										<p>Adicionales: 0</p>
		    						</td>
		    						<td class="table-description table-description--boder">
		    							<span>Cantidad:</span>
		    							<input type="number" class="input-count-product" value="1" readonly>
		    							<!-- <q-numeric v-model="number" :min="1" :max="17" ></q-numeric> -->
		    						</td>
		    						<td class="table-price"><span class="q-display">$10.900</span></td>
		    					</tr>
							</tbody>
							<tfoot>
							    <tr>
							    	<td colspan="3"></td>
							    	<td>TOTAL: <span class="table-price__total">$180</span></td>
							    </tr>
							</tfoot>
						</table>
					</div>
				</div>
				<div class="col-12 text-right">
					<q-btn type="button" label="IR AL CHECKOUT" size="lg" color="red" sence class="q-my-md q-mr-sm"/>
					<q-btn type="button" label="CONTINUAR COMPRANDO" size="lg" color="red" sence class="q-my-md"/>
				</div>
			</div>
		</div>
    	<section-carting-app></section-carting-app>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				message: 'Pedido',
				number: 1
			}
		},
		mounted(){
			this.getUsers()
		},
		methods:{
			getUsers(){
				console.log('mounted', this.message)
			}
		}
	}
</script>