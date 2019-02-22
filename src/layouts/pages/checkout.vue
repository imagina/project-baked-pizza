<template>

	<section class="container-fluid">

		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>

		<div class="container-section">
			
			<!--== START - TITLE ==-->
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-xl">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>	
				</div>
			</div>
			<!--== END - TITLE ==-->

			<!--== START - COMPONENTS CHECKOUT ==-->
			<div class="row">

				<!--== START - CUSTOMER INFORMATION ==-->
				<customerInformationComponent />
				<!--== END - CUSTOMER INFORMATION ==-->

				<!--== START - BILLING DETAILS ==-->
				<div class="col-xs-12 col-sm-12 col-md-4 section-1 ">
					<q-card class="no-shadow">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 q-py-lg">
							<q-select
								radio
							  style="background: transparent;"
							  v-model="address"
							  float-label="Direcciones"
							  :options="addresses"
							/>
						</div>
					</div>
					<addresses-component></addresses-component>
					</q-card>
					<q-card class="no-shadow">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12 q-mb-md" align="center">
								<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Dirección de Envío</div>
								<q-checkbox
									v-model="differentAddress"
									label="Mis direcciones de envío y facturación son las mismas."
									true-value="yes"
									false-value="no"
								/>
							</div>
						</div>
						<transition name="component-fade" mode="out-in">
							<div class="row" v-if="differentAddress == 'no'">
								<div class="col-md-12 q-pb-lg">
							  	<q-select
									  radio
									  style="background: transparent;"
									  v-model="address"
									  float-label="Direcciones"
									  :options="addresses"
									/>
								</div>
							</div>
						</transition>
					</q-card>
				</div>
				<!--== END - BILLING DETAILS ==-->

				<!--== START - DELIVERY METHODS ==-->
				<div class="col-xs-12 col-sm-12 col-md-4 section-1 section-3">
					<q-card class="no-shadow">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12" align="center">
								<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de pago</div>
							</div>
						</div>
						<div class="q-py-lg row">
							<div class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(shippingMethod, index) in shipMethods" :key="index">
								<q-radio v-model="paymentMethod" :val="shippingMethod.id" :label="shippingMethod.title" />	
							</div>
						</div>
					</q-card>
					<q-card class="no-shadow">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12" align="center">
								<div class="q-display-1 csh3__catering_title q-mt-lg q-mb-lg">Detalles</div>
							</div>
						</div>
						<div class="q-py-lg row">
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Distancia del pedido" v-model="distance" :after="[{ icon: 'motorcycle', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Escribe aquí..." v-model="commentary" :after="[{ icon: 'fas fa-comment', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Añadir cupones" v-model="coupon" :after="[{ icon: 'fa fa-tag', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Valor Total" v-model="total" :after="[{ icon: 'fas fa-thumbs-up', }]"   style="background: transparent;" :disable="true" class="no-shadow" />
							</div>
						</div>
					</q-card>
				</div>
				<!--== END - DELIVERY METHODS ==-->

				<!--== START - ACTION BUTTON ==-->
				<div class="col-12">
					<div class="col-count-product text-right">
						<q-btn type="submit" label="Comprar Ahora" size="lg" color="red" sence />
					</div>
				</div>
				<!--== END - ACTION BUTTON ==-->

			</div>
			<!--== END - COMPONENTS CHECKOUT ==-->
					
			<!--== START - LOADING ==-->
			<q-inner-loading :visible="visible" style="background-color: #f4f4f4c7">
				<q-spinner size="50px" color="primary"></q-spinner>
			</q-inner-loading>
			<!--== END - LOADING ==-->

		</div>

		<section-carting-app></section-carting-app>
		
	</section>

</template>

<script>
	import customerInformationComponent from 'src/components/icommerce/checkout/customerInformation'
	import addressesComponent from 'src/components/icommerce/addresses'
	import http from "axios"
	import shippingMethods from 'src/services/shippingMethods'
	import profile from 'src/services/profile'
	
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {array} from '@imagina/qhelper/_plugins/array'
  import {helper} from '@imagina/qhelper/_plugins/helper'

	export default{
	components:{
		addressesComponent,
		customerInformationComponent
	},
	data(){
		return{

      rememberData: true,
      
			visible: false,
			

			differentAddress: 'yes',
			distance: '3,7 Km',
			commentary: '',
			coupon: '',
			selectPayment: '',
			paymentMethod: 'paypal',
			CustmerType: false,
			total: '$' + 100,
			CustmerType: 'invited',
			companyName: '',
			addresses: [],
			address : '',
			shipMethods: [],
		}
	},
	mounted(){
		this.typeUser()
		this.setData()
		this.getshippingMethods()
	},
	methods:{
		getshippingMethods(){
			http.get('https://icommerce.imagina.com.co/api/icommerce/v3/shipping-methods/calculations/all')
			.then(response=>{
				this.shipMethods = response.data.data
				console.log(response.data.data)
			})
		},
		setData(){
      helper.storage.get.item('userData').then(response => {
        this.userData = response
        this.getAddresses(response.id)
      })
    },
		typeUser(){
			console.log(this.CustmerType)
		},
		getAddresses(id){
			let include = 'addresses'
			profile.show(id, include)
			.then(response=>{
				this.addresses = this.select(response.data.addresses)
			})
		},
		 select(dataArray) {
    	let response = []
    	dataArray.forEach((item) => {
      let labelTitle = item.first_name ? item.first_name +' '+ item.last_name : (item['full_name'] ? item['full_name'] : 'default')
      	response.push({
        	label: labelTitle,
        	value: item.id.toString()
      	});
    	})
    	return response
  	},
		async authenticate() {
        this.$v.$touch();

        if (this.$v.$error) {
          alert.error('Please review fields again.', 'bottom');
        } else {
          this.loading_login = !this.loading_login;
          const {username, password} = this.form;
          this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then(response => {
            this.loading_login = !this.loading_login;
            this.setData()
          });
        }
      },
		},
	}
</script>

<style lang="stylus">
	.label-content{
		text-align: left;
	}

	label{
		font-size: 23px;
		color: #713e3d;
	}

	.q-if:before{
		border-bottom: 2px solid #713e3d;
	}

	.q-if-label{
		color: #713e3d;
	}

	.q-input{
		margin-bottom: 20px;
	}

	.q-input-target{
		color: #713e3d;
		font-size: 18px;
	}

	::float-label { color: red; font-weight: bold; }
	.disabled, [disabled]{
		opacity: 1 !important;
		color: #ec3800!important;
	}

	.q-option-label{
		font-size: 18px;
		color: #713e3d;
	}

	.component-fade-enter-active, .component-fade-leave-active {
		transition: opacity .3s ease;
	}

	.component-fade-enter, .component-fade-leave-to{
		opacity: 0;
	}

	.q-if-standard.q-if-has-label{
		box-shadow: 0px 3px 5px -1px #c1c1c100!important;
	}

	.section-2{
		border-left: 1px solid #80808024;
		border-right: 1px solid #80808024;
	}

	border-right{
		border-right: 1px solid #80808024;
	}

	border-left{
		border-left: 1px solid #80808024;
	}

	.q-input .q-icon{
		font-size: 15px;
	}


	@media only screen and (max-width: 600px) {
		.q-input-target{
			font-size: 17px!important;
		}

		.section-2{
			border-left: none!important;
			border-right: none!important;
		}

		.q-collapsible-inner > .q-item .q-item-label{
			font-size: 1.3rem!important;
		}

	}
</style>
