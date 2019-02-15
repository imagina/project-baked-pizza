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
		    					<th colspan="2">Descripción del producto</th>
									<th>Cantidad</th>
									<th>Sub-Total</th>
								</tr>
							</thead>
		  				<tbody>
	  						<tr v-for="(item, index) in cart.products" :key="index">
	    						<td class="table-description">
	    							<div class="table-description__img">
	    								<img src="statics/logo.png" alt="pizza">
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
	    									<input type="number" class="input-count-product" :value="item.quantity" readonly>
	    								</div>
	    								<div class="col-4">
	    									<q-btn flat round color="red" @click="upcantitem(item)" icon="add"/>
												<q-btn flat round color="red" @click="downcantitem(item)" icon="remove"/>
	    								</div>
	    							</div>
	    						</td>
	    						<td class="table-price">
	    							<span class="q-display">${{item.price}}</span>
	    						</td>
	    						<td>
	    							<q-btn size="sm" round color="red" @click="deleteitem(item)" icon="close"/>
	    						</td>
	    					</tr>
							</tbody>
							<tfoot>
								<tr>
							  	<td colspan="3"></td>
							    <td>TOTAL: <span class="table-price__total">$ 10.000</span></td>
							  </tr>
							</tfoot>
						</table>
					</div>
				</div>
				<div class="col-12 text-right">
					<q-btn type="button" label="IR AL CHECKOUT" size="lg" color="red" sence class="q-my-md q-mr-sm" to="/checkout" />
					<q-btn type="button" label="CONTINUAR COMPRANDO" size="lg" color="red" sence class="q-my-md" to="/pide-en-linea" />
				</div>
			</div>
		</div>
    <section-carting-app></section-carting-app>
	</div>
</template>

<script>
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import cartService from 'src/services/cart';

	export default{
		data(){
			return{
				cart: [],
				products: [],
			}
		},
		mounted(){
			this.getcart()
		},
		methods:{
 			getcart(){
        helper.storage.get.item('cart_server').then(res => {
          if (res !== null) {
            this.cart = res
          }
        })
      },
			deleteitem (item) {
				cartService.deleteProduct(item.id)
				.then(response=>{
					console.log('Ok') 
				})
				
				
    	},
    	upcantitem (item) {
				console.log('action')
    	},
			downcantitem (item) {
				console.log('action')
			},
		}
	}
</script>