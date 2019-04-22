<template>
		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de Envío</div>
				</div>
			</div>
			<div class="q-py-lg row">
				<div v-if="priceMethods.length > 0" class="col-xs-12 col-sm-12 col-md-12 q-py-xs">
					<div v-for="(item, index) of priceMethods" :key="index">
						<div v-if="item.calculations.status === 'success'" class="row">
							<div class="col-md-6">
								<q-radio v-model="shippingMethodSelected" :val="item" :label="item.title" />
							</div>
							<div class="col-md-6 text-right">
								$ {{ item.calculations.price }}
							</div>
						</div>
					</div>
				</div>
				<div v-else class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(item, index) in shippingMethods" :key="index">
					<div class="q-title">{{ item.title }}</div>			
				</div>				
			</div>
		</q-card>
</template>

<script type="text/javascript">
	import shippingMethodsService from 'src/services/shipping-methods'
	import cartService from 'src/services/cart';
	import shippingMetodsService from 'src/services/shipping-methods';

	import {helper} from '@imagina/qhelper/_plugins/helper'
	import {mapState} from 'vuex'
	import EventBus from 'src/utils/event-bus';

	export default {
		props: ['parentData', 'sippingprice'],
		data(){
			return {
				shippingMethods: [],
				shippingMethod: '',
				priceMethods: [],
				shippingMethodSelected: '',
				products: [],
				totalCart: 0,
				cart_id: 0,
			}
		},
		computed: {
			...mapState({
				defaultAddress 				: state => state.address.defaultAddress,
				addressSelected 			: state => state.address.addressSelected,
				sipping_method_selected		: state => state.shippingmethod.sipping_method_selected
			})
		},
		created() {
			this.getCart()
		},
		mounted(){
			this.getshippingMethods()
		},
		methods:{
			getshippingMethods(){
				/*this.visible = true
				shippingMethodsService.index()
				.then(response=>{
					this.visible = false
					this.shippingMethods = response.data
				})*/
			},
			getCart(){
				helper.storage.get.item('cart_server').then(res => {
				this.cart_id = res.id
				if (res !== null) {
					cartService.show(res.id)
					.then(response=>{
						this.products 	= this.createObjectProducts(response.data)
						this.totalCart 	= response.data.total
					})
				}
				})
			},
			createObjectProducts(data){
				let products 	  	= data.products
				let arrayproducts 	= []

				for (let index = 0; index < products.length; index++) {
					let item = {
						title: products[index].name,
						price: parseFloat(products[index].price),
						weight: 1,
						width: 1,
						height: 1,
						length: 1,
						freeshipping: 0,
						quantity: 1,
					}
					arrayproducts.push(item)
				}

				
				return  {...arrayproducts} 
			},
			priceMethodsShipping(data){
				this.concatInfoShipping(this.cart_id,data.zip_code,data.country_id,this.totalCart,this.products)
			},
			concatInfoShipping(cart_id,zipcode = '', country = '', total = 0 , products = {}){
				var object = []
				if(cart_id > 0, zipcode != '' && country != '' && Object.keys(products).length > 0){
					object = {
						options : {
							countryCode : country,
							postalCode	: zipcode,
						},
						products :{
							cart_id	: cart_id,
							total 	: total,
							items 	: products,
						}
					}

					shippingMetodsService.calculateShipping(object)
					.then(response=>{
						this.shippingMethods = response.data
						this.priceMethods = response.data
						if(this.priceMethods.length === 0){
							this.shippingMethodSelected = ''
						}
					})
				}else{
					this.shippingMethods = []
					this.priceMethods = data
					if(this.priceMethods.length === 0){
						this.shippingMethodSelected = ''
					}
				}
			},
		},
		watch: {
			shippingMethodSelected: function(val){
				this.$store.dispatch('shippingmethod/setShippingMethodSelected',val)
			},
			addressSelected: function(val){
				if (Object.keys(val).length > 0) {
					this.priceMethodsShipping(val)
				}
			}
		},
	}
</script>

<style lang="stylus">

	.item{
		border-top: 1px solid #8080804d;
    	padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
