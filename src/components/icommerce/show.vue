<template>

	<div class="col-md-9 container-section--p2">	
		<div class="border-top">	
			<div class="row q-mt-md">
				<label for="" class="col-xs-12 col-sm-12 col-md-3 offset-5">Seleccione un producto:</label>
				<q-select v-model="product.product" placeholder="Seleccione un producto" class="q-select--app col-xs-12 col-sm-12 col-md-4" radio :options="selectProduts"/>
			</div>
		</div>
	
		<div class="row q-mt-lg">
			<div class="col-xs-12 col-sm-12 col-md-5">
				<div class="card-product-img im-mt-1">
					<img src="statics/logo.png" alt="" class="responsive m-w-100 full-width">
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-7 im-mt-1">
				<div class="row">
					<div class="col-md-12">
						<span class="q-display-1 color-baked-title">{{product.product.name}}</span>
						<p>{{product.product.description}}</p>
						<p>${{product.product.price}}</p>
						<div class="row" v-if="showSizesprop">
							<div class="col-xs-12 col-sm-12 col-md-4 product-type-grid text-center" v-for="option of optionSize" :key="option.id">
								<label>
									<input v-model="productTypeOption" type="radio" :value="option.product_option_value_id" class="radio" @click="updateSize(option)">
									<img :id="option.product_option_value_id" src="statics/logo.png" alt="" class="responsive m-w-100 imgradio">
								</label>
								
								<p align="center" class="product-type-name">{{ option.name }}</p>
								<p align="center" class="product-type-description">( {{ option.description }} )</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-8">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-4">
						<div class="col-count-product">
	  						<div class="row">
								<span class="col-md-4">Cantidad:</span> 
	  							<input type="number" class="input-count-product col-xs-12 col-sm-12 col-md-8" float-label="Seleccione un producto" min="0"  v-model="quantity" style="width: 80px">
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="col-count-product">
							<div class="porduct-option-content" style="width: 200px">
									<!-- <pre>{{option}}</pre> -->
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
	  					<input type="text" class="input-count-product" :value="calculatePrice" readonly>
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
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import optionsComponent from 'src/components/pages/menu/optionsComponent';
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import cartService from 'src/services/cart';
	import EventBus from 'src/utils/event-bus';

	export default {
		props :['products', 'product'],
		components:{
			'options-component': optionsComponent,
		},
		data(){
			return{
				showSizesprop: false,
				quantity : 1,
				options: [],
				cart: '',
				user: '',
				option: [],
				productTypeOption:'',
				optionSize:[],
				sizeSelected: { product_option_id: 0,  product_option_value_id: 0}
			}
		},
		created(){
			this.$root.$on("updateoptions", this.updateOptions);
			this.$root.$on("deleteoptions", this.deleteoptions);
			
			EventBus.$on('tamanos', (data) => {
				this.showSizes(data)
			})
		},
		computed:{
			selectProduts(){
				return this.select(this.products)
			},
			calculatePrice(){
				var priceOptions = 0;
				this.option.forEach(element => {
					priceOptions += parseFloat(element.price)
				})

				return parseFloat(this.product.product.price) + priceOptions
			}
		},
		mounted(){
			this.getcart()
		},
		methods:{
			showSizes(data){
				let options = data.productOptionValues
				options.forEach(element => {
					let item = {
						parent: '',
						option_id: element.option_id,
						product_option_value_id	: element.id,
						name: element.option_value,
						description: 'Description exaple',
						product_option_id: data.id,
						price: element.price,
					}
					this.optionSize.push(item)
				});
				this.showSizesprop = true
			},
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
				
				//Format data option
				let options = this.option
				var formatData = []
					
				for (let index = 0; index < options.length; index++) {
					formatData.push({ product_option_id : parseInt(options[index].product_option_id), product_option_value_id : parseInt(options[index].product_option_value_id) })
				}

				let formData = {
					"cart_products": {
					 	"product_id": this.product.product.id,
					  "quantity": this.quantity,
					  "price": this.product.product.price
					},
					"cart_product_option": formatData
				}
				//End format data option

				if (this.cart != '')
					formData['cart_id']  = this.cart.id

				if (this.user != '')
					formData['user_id']  = this.user.id
				console.log(formData)
				
    		cartService.create(formData)
    		.then(response=>{
    			alert.success('Producto agregado')
    			helper.storage.set('cart_server', response.data.data.cart)
    			this.cart = response.data.data.cart
    			this.$root.$emit('updateCart',  response.data.data.cart)
    			
    		})
			},
			updateOptions(event){
				var found = this.option.find(function(element) {
  				return element.product_option_id === event.product_option_id;
				});
				var parent = event.option_id
				if (!found) {
					if (event.product_option_value_id > -1) {
						this.option.push(event)	
					}
					this.deleteoptions(parent)
				} else {
					var index = this.option.indexOf(found);
					this.option.splice(index, 1);
					this.deleteoptions(parent)
					
					if (event.product_option_value_id > -1) {
						this.option.push(event)
					}
				}	
			},
			deleteoptions(parent){
				var end 	= false
				var options = this.option
				while (!end) {
				end = true
					for (let index = 0; index < options.length; index++) {
						if(parseInt(parent) === parseInt(options[index].parent)){
							parent = options[index].option_id
							this.option.splice(index, 1)
							end = false
						}
					}
				}
			},
			/*deleteoptions(event){
				var found = this.option.find(function(element) {
  				return element.id === event.id;
				});
				var index = this.option.indexOf(found);
			},*/
			deleteOptionsSize(element){
				var i	= -1;
				var options = this.option

				for (let index = 0; index < options.length; index++) {
					if(options[index].product_option_id === element.product_option_id){
						this.option.splice(index, 1)
						break
					}
				}
			},
			updateSize(option){
				var id 		= option.product_option_value_id
				var element = document.getElementById(id);

				if((this.sizeSelected.product_option_value_id == option.product_option_value_id)){

					this.deleteOptionsSize(this.sizeSelected)

					this.sizeSelected.product_option_id 		= 0
					this.sizeSelected.product_option_value_id 	= 0

					element.classList.remove("checkedImg");
				}else{
					this.deleteOptionsSize(this.sizeSelected)

					this.sizeSelected.product_option_id 		= option.product_option_id
					this.sizeSelected.product_option_value_id 	= option.product_option_value_id
					//update data
					let data = {
						'parent': option.parent,
						'option_id': option.option_id,
						'product_option_id' : option.product_option_id,
						'product_option_value_id' : option.product_option_value_id,
						'price' : option.price,
					}
					this.updateOptions(data)
					//end update data

					//change color img
					var elems = document.querySelectorAll(".checkedImg");
					[].forEach.call(elems, function(el) {
						el.classList.remove("checkedImg");
					});
					//end change color img

  					element.classList.add("checkedImg");
				}
				
			},
		}
	}
</script>