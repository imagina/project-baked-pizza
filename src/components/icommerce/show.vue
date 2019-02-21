<template>

	<div class="container-section--p2">	
		<div class="border-top">	
			<div class="row q-mt-md">
				<label for="" class="col-xs-12 col-sm-12 col-md-3 offset-5">Seleccione un producto:</label>
				<q-select v-model="product.product" placeholder="Seleccione un producto" class="q-select--app col-xs-12 col-sm-12 col-md-4" radio :options="selectProduts"/>
			</div>
		</div>

		<div class="row q-mt-lg">
			<div class="col-xs-12 col-sm-12 col-md-5">
				<div class="card-product-img im-mt-1">
					<img src="statics/logo.png" alt="" class="responsive m-w-100">
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-7 im-mt-1">
				<span class="q-display-1 color-baked-title">{{product.product.name}}</span>
				<p>{{product.product.description}}</p>
				<p>${{product.product.price}}</p>
				<div class="row">
					<div class="col-md-4 product-type-grid" v-for="option of optionSize" :key="option.id">
						<label>
							<input v-model="productTypeOption" type="radio" name="test" :value="option.id" class="radio">
							<img src="statics/logo.png" alt="" class="responsive m-w-100 imgradio">
						</label>
						
						<p align="center" class="product-type-name">{{ option.name }}</p>
						<p align="center" class="product-type-description">( {{ option.description }} )</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-8">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-4">
						<div class="col-count-product">
	  						<span>Cantidad:</span> 
	  						<input type="number" class="input-count-product" float-label="Seleccione un producto" min="0"  v-model="quantity" style="width: 80px">
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="col-count-product">
							<div class="div-select__product" style="width: 200px">
									<pre>{{option}}</pre>
									<options-component :product="product.product.id" :parent="0" id="options"/>
	    					</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-4">
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
				option: [],
				productTypeOption:'',
				optionSize:[
					{
						id: 1,
						name: 'Personal',
						description: '4 Porciones'
					},
					{
						id: 2,
						name: 'Mediana',
						description: '8 Porciones'
					},
					{
						id: 3,
						name: 'Familiar',
						description: '12 Porciones'
					}
				]
			}
		},
		created(){
  		this.$root.$on("updateoptions", this.updateOptions);
  		this.$root.$on("deleteoptions", this.deleteoptions);

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
					"cart_product_option":this.option
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
			},
			updateOptions(event){

				var found = this.option.find(function(element) {
  				return element.product_option_id === event.product_option_id;
				});

				if (!found) {
					this.option.push(event)
				} else {
					var index = this.option.indexOf(found);
					this.option.splice(index, 1);
					this.option.push(event)
				}
							
			},
			deleteoptions(event){
				var found = this.option.find(function(element) {
  				return element.id === event.id;
				});
				var index = this.option.indexOf(found);
				this.option.splice(index, 1);
			}

		}
	}
</script>