<template>
	<section class="container-fluid">
		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			<div class="row"> <!--== TITLE ==-->
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-xl">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>
				</div>
			</div>
			<div class="row" v-if="Object.keys(userData).length === 0">
				<div class="col-md-12">
					<div class="q-title text-center"><router-link to="/auth/login">Inicie Sesión</router-link> para ver esta página. </div>
				</div>
			</div>
			<div class="row" v-else> <!--== COMPONENTS CHECKOUT ==-->
				<customerinformation-component :parentData="order.customerInformation"/> <!--==  CUSTOMER INFORMATION ==-->	
				<billingdetails-component :parentData="order.addreses"/> <!--==  BILLING DETAILS ==-->
				<paymentmethods-component :parentData="order.shippingAndPay"/> <!--==  DELIVERY METHODS ==-->
				<div class="col-12"> <!--== ACTION BUTTON ==-->
					<div class="col-count-product text-right">
						<q-btn type="submit" label="Comprar Ahora" size="lg" color="red" sence @click="saveOrder"/>
					</div>
				</div>
			</div>
		</div>
		
		<section-carting-app></section-carting-app> <!--== COMPONENTS BANNER CATERGIN INFO ==-->
	</section>
</template>

<script>
	// COMPONENTS
	import customerinformationComponent from 'src/components/icommerce/checkout/customerInformation'
	import billingdetailsComponent from 'src/components/icommerce/checkout/billingdetailsComponent'
	import paymentmethodsComponent from 'src/components/icommerce/checkout/paymentMethods'

	import {alert} from '@imagina/qhelper/_plugins/alert'
	import {helper} from '@imagina/qhelper/_plugins/helper';
	import orderService from 'src/services/order'
	import {mapState} from 'vuex'
	import EventBus from 'src/utils/event-bus'
	import LocalForage from "localforage"

	export default{
		components:{
			customerinformationComponent,
			billingdetailsComponent,
			paymentmethodsComponent,
		},
		data(){
			return{
				userData : false,
				order:{
					customerInformation: {
						userData: false,
						name: '',
						lastName: '',
						email: '',
						phone: '',
						password: '',
						confirmPassword: '',
					},
					addreses:{
						billing: {
							address_id: 0,
							companyname: '',
							name: '',
							last_name: '',
							address1: '',
							address2: '',
							zip_code: '',
							country: '',
							province: '',
							city: '',
						},
						shipping: {
							differentAddress: true,
							address_id: 0,
							companyname: '',
							name: '',
							last_name: '',
							address1: '',
							address2: '',
							zip_code: '',
							country: '',
							province: '',
							city: '',
						}
					},
					shippingAndPay:{
						paymentMethod_id: 0,
						shippingMethod_id: 1,
						shippingMethod_name: 0,
						details:{
							distance: '',
							commentary: '',
							coupon: '',
							total: '',
						}
					},				
					cart_id: 0,
					token: '',
				}
			}
		},
		computed: {
			...mapState({
					defaultAddress: 					state => state.address.defaultAddress,
					shipping_method_selected: state => state.shippingmethod.shipping_method_selected,
					payment_method_selected: 	state => state.paymentmethod.payment_method_selected
			})
		},
		mounted(){
			this.getcart()
			this.setData()
		},
		methods:{
			saveOrder(){

				if (this.cart_id === 0) {
					alert.error('Debe agregar articulos al carrito')
				}else if(Object.keys(this.defaultAddress).length === 0){
					alert.error('Debe seleccionar una dirección')
				}else if(Object.keys(this.payment_method_selected).length === 0){
					alert.error('Debe seleccionar un metodo de pago')
				}else if(Object.keys(this.shipping_method_selected).length === 0){
					alert.error('Debe seleccionar un metodo de envio')
				}else{
					// data preparada, lista para enviar
					let fotData = {
						"user_id"							: this.userData.id, //esto se debe eliminar, se hizo porque el servidor no me reconoce el usuario logueado
						"store_id"						: 1,
						"cart_id"							: this.cart_id,
						"address_payment_id"	: this.defaultAddress.id,
						"address_shipping_id"	:	this.defaultAddress.id,
						"payment_id"					: this.payment_method_selected.id,
						"shipping_name"				: this.shipping_method_selected.name
					}
					orderService.create({attributes: fotData})
					.then(response=>{
							if (Object.keys(response).length > 0) {
								LocalForage.removeItem('cart_server').then(value => {
									localStorage.removeItem('cart_server')
									EventBus.$emit('getcart')
									alert.success('Orden eviada!')
									this.$router.push('/inicio')
								})
							}else{
								alert.error('Error al agregar el registro')
							}
							
					})
				}

			},
    	async authenticate() {
        this.$v.$touch();
        if (this.$v.$error) {
          //alert.error('Please review fields again.', 'bottom');
        } else {
          const {username, password} = this.form;
          this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then(response => {
            this.loading_login = !this.loading_login;
            this.$root.$emit('sesionStart')
          });
        }
      },
			getcart(){
        helper.storage.get.item('cart_server').then(res => {
          if (res !== null) {
          	this.cart_id = res.id
          }
        })
			},
			setData(){
        helper.storage.get.item('userData').then(response => {
          this.userData = response
				})
				
				helper.storage.get.item('userToken').then(response => {
          this.token = response
        })
			}
		}
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
		color: #ec3800;
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
