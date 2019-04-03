<template>
	<div>
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Listado de Pedidos" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->

		<div class="container-section cart-content" v-if="products.length">
			<div class="row">
				<div class="col-12">
	    		<p class="q-display-2 color-baked-title" align="center">Listado de Pedidos</p>
				</div>
			</div>
			<div class="row" >
				<div class="col-xs-12 col-sm-12 col-md-8" >

					<q-card class="no-shadow" v-for="(item, index) in cart.products" :key="index">
						<q-card-main>
							<div class="row">
								<div class="col-xs-4">
									<img src="statics/logo.png" alt="pizza" width="80%">
								</div>
								<div class="col-xs-6">
									<span>{{item.name}}</span><br>
									<span class="table-price__total"><b>$ {{ item.subtotal}}</b></span>
								</div>
								<div class="col-xs-2 text-center ">
									<q-btn size="sm" round outline color="red" @click="deleteitem(item)" icon="close"/>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<q-btn flat round outline color="red" @click="update(item, '-')" icon="remove"/>
									<span>{{item.quantity}}</span>
									<q-btn flat round outline color="red" @click="update(item, '+')" icon="add"/>		
								</div>
							</div>
						</q-card-main>
					</q-card>

				</div>

				<div :class="`col-xs-12 col-md-4 ${($q.platform.is.desktop ? 'q-pl-md' : '' )}`">
					<sumaryComponent/>
					<q-btn label="IR AL CHECKOUT" class="full-width shadow-1" color="red" to="/checkout" />
					<q-btn label="CONTINUAR COMPRANDO" class="full-width shadow-1 q-mt-sm" color="red" to="/pide-en-linea" />
				</div>
			</div>
		</div>

		<div class="container-section" v-else>
				<div class="row" >
					<div class="col-12" align="center">
						<p class="q-display-2 color-baked-title" align="center">No ha agregado productos al carro</p>
					</div>
				</div>
		</div>

    <section-carting-app></section-carting-app>
	</div>
</template>

<script>
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
	import sumaryComponent from 'src/components/icommerce/cart/sumary'

	import {alert} from '@imagina/qhelper/_plugins/alert'
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import cartService from 'src/services/cart';

	export default{
		components:{
			breadcrumbComponent,
			sumaryComponent
		},
		data(){
			return{
				visible: false,
				cart: [],
				products: false,
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
							this.products = response.data.products
							console.log(this.products)
          		this.visible = false
          		this.$root.$emit('updateCart')
          	})
          }
        })
      },
			deleteitem (item) {
				cartService.deleteProduct(item.id)
				.then(response=>{
					this.$root.$emit('deleteItemCart')
					alert.success('Carrito Actualizado')
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
					alert.success('Producto Actualizado')
					this.getcart()
				})
    	},
		}
	}
</script>

<style lang="stylus">
	@media only screen and (max-width: 600px) {
		.cart-content .button-pedido{
			width: 100%;
		}
	}
</style>
