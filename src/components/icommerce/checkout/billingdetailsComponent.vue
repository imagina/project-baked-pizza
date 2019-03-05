<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1">
		<q-card class="no-shadow" v-if="userData">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 q-py-lg">
					<addresses-component :parentData="parentData.billing"/>
				</div>
			</div>
		</q-card>
		<q-card class="no-shadow" v-else>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>
<<<<<<< HEAD
			<billingaddress-component :formData="parentData.billing" />
=======

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Nombre" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Apellido" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Direccion 1" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Direccion 2" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billZipCode"  float-label="Zip Code" style="background: transparent;" class="no-shadow" v-on:blur="priceMethodsShipping" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-select v-model="Shipping.country" placeholder="País" class="q-select--app col-xs-12 col-sm-12 col-md-4" v-on:blur="priceMethodsShipping" radio :options="countries"/>
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Departamento" style="background: transparent;" class="no-shadow" />
			</div>


			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Ciudad" style="background: transparent;" class="no-shadow" />
			</div>


>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
		</q-card>
		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-md" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Dirección de Envío</div>
					<q-checkbox
						v-model="parentData.shipping.differentAddress"
						label="Mis direcciones de envío y facturación son las mismas."
<<<<<<< HEAD
						:true-value="true"
						:false-value="false"
=======
						true-value="no"
						false-value="yes"
>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
					/>
				</div>
			</div>
			<transition name="component-fade" mode="out-in">
<<<<<<< HEAD
				<div class="row" v-if="parentData.shipping.differentAddress == false">
=======
				<div class="row" v-if="differentAddress == 'yes'">

>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
					<div class="col-md-12 q-pb-lg" v-if="userData">
						<addresses-component :parentData="parentData.shipping"/>
					</div>
<<<<<<< HEAD
					<div v-else class="row">		
						<billingaddress-component :formData="parentData.shipping" />
=======

					<div v-else class="row">

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Nombre" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Apellido" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Direccion 1" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Direccion 2" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Ciudad" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="differentBillZipCode"  float-label="Zip Code" style="background: transparent;" class="no-shadow" v-on:blur="priceMethodsShipping" />
						</div>


						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-select v-model="Billing.country" placeholder="País" class="q-select--app col-xs-12 col-sm-12 col-md-4" radio :options="countries" v-on:blur="priceMethodsShipping" />
						</div>


						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Departamento" style="background: transparent;" class="no-shadow" />
						</div>
>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
					</div>
				</div>
			</transition>
		</q-card>
	</div>
</template>

<<<<<<< HEAD
<script>
	import billingaddressComponent from 'src/components/icommerce/checkout/billingaddressComponent'
	import addressesComponent from 'src/components/icommerce/addresses'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import profileService from 'src/services/profile'

=======
<script type="text/javascript">

	import cartService from 'src/services/cart';
	import profileService from 'src/services/profile'
	import locationsService from 'src/services/locations'
	import shippingMetodsService from 'src/services/shipping-methods';

	import {helper} from '@imagina/qhelper/_plugins/helper';
	import EventBus from 'src/utils/event-bus';

	import addressesComponent from 'src/components/icommerce/addresses'


>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
	export default {
		props: ['parentData'],
		components:{
			addressesComponent,
			billingaddressComponent,
		},
		data(){
			return {
				countries: [],
				userData: true,
				addresses: [],
				address : '',
<<<<<<< HEAD
=======
				differentAddress: 'no',
				billCompanyName: '',
				billZipCode: '',
				differentBillZipCode: '',
				products : [],
				shippingMethods : [],
				
				Billing: {
					country: ''
				},

				Shipping: {
					country: ''
				},

>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
			}
		},
		created(){
  		this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
<<<<<<< HEAD
		},
		methods:{
		  select(dataArray) {
		    let response = []
		    dataArray.forEach((item) => {
		      let labelTitle = item.title ? item.title : (item['name'] ? item['name'] : 'default')

		      response.push({
		        label: labelTitle,
		        value: item.id.toString()
		      });
		    })
		    return response
		  },
=======
			this.getCountries()
			this.getcart()
		},
		methods:{
			getCountries(){
				locationsService.countries()
				.then(response=>{
					this.countries = this.select(response.data)
				})
			},
			select(dataArray) {
				let response = []
				dataArray.forEach((item) => {
				let labelTitle = item.title ? item.title : (item['currency'] ? item['currency'] : 'default')

				response.push({
					label: labelTitle,
					value: item.iso_2.toString()
				});
				})
				return response
			},
>>>>>>> ca42a0c9b42f49bda8c0bd3e214309da51c45872
			setData(){
				helper.storage.get.item('userData').then(response => {
					this.userData = response
					if (response != null) {
						this.getAddresses(response.id)
					}
				})
			},
			getAddresses(id){
				let include = 'addresses'
				profileService.show(id, include)
				.then(response => {
					this.addresses = (response.data.addresses)
				})
			},
			getcart(){
				helper.storage.get.item('cart_server').then(res => {
				if (res !== null) {
					cartService.show(res.id)
					.then(response=>{
						this.products = this.createObjectProducts(response.data)
					})
				}
				})
			},
			createObjectProducts(data){
				let products 	  	= data.products
				let arrayproducts 	= []
				arrayproducts.total	= data.total
				arrayproducts.items = []

				for (let index = 0; index < products.length; index++) {
					let item = {
						title: products[index].name,
						price: products[index].price,
						weight: 1,
						width: 1,
						height: 1,
						length: 1,
						freeshipping: 0,
						quantity: 1,
					}
					arrayproducts.items.push(item)
				}
				return  {...arrayproducts} 
			},
			priceMethodsShipping(){
				if(this.differentAddress == 'no'){
					this.concatInfoShipping(this.billZipCode,this.Shipping.country,this.products.total,this.products.items)
				}else{
					this.concatInfoShipping(this.differentBillZipCode,this.Billing.country,this.products.total,this.products.items)
				}
			},
			concatInfoShipping(zipcode = '', country = '', total = 0 , products = {}){
				var object = []
				if(zipcode != '' && country != ''){
					object = {
						options : {
							countryCode : country,
							postalCode	: zipcode,
						},
						products :{
							total : total,
							items : products,
						}
					}
					shippingMetodsService.calculateShipping(object)
					.then(response=>{
						this.shippingMethods = response.data
						EventBus.$emit('calculateshipping', this.shippingMethods)
					})
				}else{
					this.shippingMethods = []
					EventBus.$emit('calculateshipping', this.shippingMethods)
				}
			
			},
		}
	}
</script>