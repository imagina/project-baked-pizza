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
					<!--== START TABLE PRODUCTSO BY CATEGORI SELECTED ==-->
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
	    									<q-btn flat round color="red" @click="update(item, '+')" icon="add"/>
												<q-btn flat round color="red" @click="update(item, '-')" icon="remove"/>
	    								</div>
	    							</div>
	    						</td>
	    						<td class="table-price">
	    							<span class="q-display">${{item.subtotal}}</span>
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
						<q-inner-loading :visible="visible" style="background-color: #f4f4f4c7">
      				<q-spinner size="50px" color="primary"></q-spinner>
    				</q-inner-loading>
					</div>
					<!--== EMD TABLE PRODUCTSO BY CATEGORI SELECTED ==-->
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
				visible: false,
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
          	this.visible = true
          	cartService.show(res.id)
          	.then(response=>{
          		this.cart = response.data
          		this.visible = false
          	})
          }
        })
      },
			deleteitem (item) {
				cartService.deleteProduct(item.id)
				.then(response=>{
					this.$root.$emit('deleteItemCart')
					this.getcart()
				})
    	},
    	update (item, sign) {
    		this.visible = true
     		let formData = {
					"cart_products": {
					 	"product_id": item.product_id,
					  "quantity": parseInt(item.quantity) + (sign == '+' ? +1 : -1),
					  "price": item.price
					},
				}
				formData['cart_id']  = this.cart.id
				cartService.create(formData)
				.then(response=>{
					this.getcart()
				})
    	},
		}
	}
</script>