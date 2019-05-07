<template>
	<section>
		<div 
			class="container-fluid" 
			v-if="!modalLogin">
			<breadcrumb 
				:name="name" 
				:image="image"/>
			<div class="container-section">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<div class="col-md-12">
							<customerinformationComponent 
								:info="datacheckout.user"/>
						</div>
						<div class="col-md-12">
							<shippingAddresComponent/>
						</div>
						<div class="col-md-12 ">
							<billingAddressComponent/>
						</div>
						<div class="col-md-12">
							<deliveryMethodsComponent/>
						</div>
						<div class="col-md-12">
							<paymentMethodsComponent/>
						</div>
						<div class="col-md-12">
							<q-card>
								<q-card-title>
									<p class="color-baked-title">
										<b>
											<q-icon name="comment"/>
											Informacion Adicional
										</b>
									</p>
								</q-card-title>
								<q-card-main>
								</q-card-main>
							</q-card>
						</div>
						<div class="col-md-12">
							<q-btn label="Procesar Compra" color="primary" size="lg"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<q-modal 
				v-model="modalLogin" 
				no-esc-dismiss
				no-backdrop-dismiss>
				<q-modal-layout>
					<div class="q-mx-lg">
						<loginComponent @userLogged="isLoggued()"/>
					</div>
				</q-modal-layout>
			</q-modal>
		</div>
	</section>
</template>

<script>
	// Components
	import customerinformationComponent from 'src/components/icommerce/checkout/customerInformation'
	import shippingAddresComponent from 'src/components/icommerce/checkout/shippingAddres'
	import billingAddressComponent from 'src/components/icommerce/checkout/billingAddressComponent'
	import deliveryMethodsComponent from 'src/components/icommerce/checkout/deliveryMethods'
	import paymentMethodsComponent from 'src/components/icommerce/checkout/paymentMethods'
	import loginComponent from 'src/components/user/login'

	// Helpers
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import {alert} from '@imagina/qhelper/_plugins/alert'

	// Services
	import orderService from 'src/services/order'

	export default{
		components:{
			customerinformationComponent,
			shippingAddresComponent,
			billingAddressComponent,
			deliveryMethodsComponent,
			paymentMethodsComponent,
			loginComponent
		},
		data(){
			return{
				name:'Checkout',
				image:'statics/header-pide.jpg',
				modalLogin:false,
				datacheckout:{
					user:{},
					shippingAddress:{}
				}
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.isLoggued()
			})
		},
		methods:{
			isLoggued(){
				this.modalLogin = false
				helper.storage.get.item('userData').then(response => {
					if (response == null) {
						this.modalLogin = true
					}	else {
						this.datacheckout.user = response
						this.isAddressValidated()
					}
				})
			},
			isAddressValidated(){
				helper.storage.get.item('dataAddress').then(response => {
					if (response == null) {
						alert('no ha validado cobertura ')
					}
				})
			},
			saveOrder(){
				let data = {
					attributes: {
						cart_id: 25,
						address_payment:{
							first_name: "Imagina",
							last_name: "Colombia",
							company: "Lino 2",
							address_1: {
								address: "calle 100 · 5 -3",
							},
							zip_code: "654987",
							city_id: "458",
							province_id: "773",
							country_id: "48"
						},
						address_shipping:{
							first_name: "Imagina",
							last_name: "Colombia",
							company: "Lino",
							address_1: {
								address: "calle 100 · 5 -3",
								lat: 4.635460160206706,
								lng: -74.16265425050966
							},
							zip_code: "654987",
							city_id: "458",
							province_id: "773",
							country_id: "48"
						},
						payment_id:3,
						shipping_name: "icommerceagree",
						store_id: 1
					}
				}
				orderService.create(data)
				.then(response=>{
					// Here
				})
				.catch(error=>{
					console.warn(error)
				})
			},
		}
	}
</script>