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
									<th></th>
								</tr>
							</thead>
		  					<tbody>

		    					<tr v-for="item in cart.items" :key="item.id">
		    						<td class="table-description">
		    							<div class="table-description__img">
		    								<img src="statics/pizza.png" alt="pizza">
		    							</div>
		    						</td>
		    						<td class="table-description table-description--info">
		    							<span class="q-display-1 color-baked-title d-block">{{item.name}}</span>
										<p>Tamaño: Personal</p>
										<p>Adicionales: 0</p>
		    						</td>
		    						<td class="table-description table-description--boder">
		    							<div class="row">

		    								<div class="col-8">
		    									<span>Cantidad:</span>
		    									<input type="number" class="input-count-product" :value="item.quantity_cart" readonly>
		    								</div>
		    								<div class="col-4">
		    									<q-btn flat round color="red" @click="upcantitem(item)" icon="add"/>
													<q-btn flat round color="red" @click="downcantitem(item)" icon="remove"/>
		    								</div>
		    							</div>
		    							<!-- <q-numeric v-model="number" :min="1" :max="17" ></q-numeric> -->
		    						</td>
		    						<td class="table-price"><span class="q-display">${{item.price}}</span></td>
		    						<td>
		    							<q-btn  round color="red" @click="deleteitem(item)" icon="remove"/>
		    						</td>
		    					</tr>


							</tbody>
							<tfoot>
							    <tr>
							    	<td colspan="3"></td>
							    	<td>TOTAL: <span class="table-price__total">${{total}}</span></td>
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
	import {alert} from '@imagina/qhelper/_plugins/alert'
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
		computed: {
      		cart() {
      			return this.$store.getters.getcart
      		},
      		total (){
      			let cart = this.$store.getters.getcart
  				var result = 0
  				for (var i = 0; i < cart.items.length ; i++) {
  					result = result + (parseInt(cart.items[i].price) * parseInt(cart.items[i].quantity_cart))
  				}
				return result
      		}
    },
		methods:{
			getUsers(){
				console.log('mounted', this.message)
			},
			deleteitem (item) {
    			this.$store.dispatch("delete_item", item)
    			alert.warning('Producto Eliminado')
    		},
    		upcantitem (item) {
    			this.$store.dispatch("update_item_up", item)
    			alert.info('Producto Actualizado')	
    		},
			downcantitem (item) {
				this.$store.dispatch("update_item_down", item)
				alert.warning('Producto Actualizado')

			},
		}
	}
</script>