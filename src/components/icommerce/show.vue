<template>

	<div class="container-section--p2">		
		<div class="row">
			<div class="col-md-12 div-select text-right border-top">
				<span class="div-select__label">Seleccione un producto</span>
				<div class="div-select__product">
						<q-select v-model="product.product" float-label="Seleccione un producto" class="q-select--app" radio :options="selectProduts"/>
				</div>
			</div>
		</div>

		<div class="row q-mt-lg">
			<div class="col-5">
				<div class="card-product-img">
					<img src="statics/logo.png" alt="" class="responsive m-w-100">
				</div>
			</div>
			<div class="col">
				<span class="q-display-1 color-baked-title">{{product.product.name}}</span>
				<p>{{product.product.description}}</p>
				<p>${{product.product.price}}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-8">
				<div class="row">
					<div class="col-6 col-md-4">
						<div class="col-count-product">
	  					<span>Cantidad:</span> 
	  					<input type="number" class="input-count-product" float-label="Seleccione un producto"  v-model="quantity" style="width: 80px">
						</div>
					</div>
					<div class="col-6 col-md-8">
						<div class="col-count-product">
							<div class="div-select__product" style="width: 200px">
									<options-component :product="product.product.id" :parent="0"/>
	    					</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="row">
					<div class="col-12 col-count-product">
							<span>Valor Total:</span>
	  					<input type="text" class="input-count-product" :value="product.product.price" readonly>
	  				</div>
					<div class="col-12">
						<div class="col-count-product text-right">
							<q-btn type="submit" label="AÑADIR" size="lg" color="red" sence class="q-my-md round-borders-0" @click="addCart()"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import optionsComponent from 'src/components/pages/menu/optionsComponent';
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import cartService from 'src/services/cart';


	export default {
		props :['products', 'product'],
		components:{
			'options-component': optionsComponent,
		},
		data(){
			return{
				quantity : 1,
				options: [],
				cart: '',
				user: '',
			}
		},
		computed:{
			selectProduts(){
				return this.select(this.products)
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
			select(dataArray) {
				let response = []
				dataArray.forEach((item) => {
					let labelTitle = item.name ? item.name :'default'
					response.push({
						label: labelTitle,
						value: item
					});
				})
				return response
			},
			addCart(){

				let formData = {
					"cart_products": {
					 	"product_id": this.product.product.id,
					  "quantity": this.quantity,
					  "price": this.product.product.price
					},
					"cart_product_option":{
						"product_option_id":"1",
					  "product_option_value_id":"1"
					}
				}

				if (this.cart != '')
					formData['cart_id']  = this.cart.id

				if (this.user != '')
					formData['user_id']  = this.user.id

				
    		cartService.create(formData)
    		.then(response=>{
    			
    			helper.storage.set('cart_server', response.data.data.cart)
    			this.cart = response.data.data.cart
    			this.$root.$emit('updateCart',  response.data.data.cart)
    			
    		})
			}

		}
	}
</script>