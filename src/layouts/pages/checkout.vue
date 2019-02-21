<template>
	<section class="container-fluid">
		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>	
				</div>
			</div>

			<div class="row">
				<!-- section -->

				<div class="col-xs-12 col-sm-12 col-md-4 section-1" v-if="userData">

					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
							<hr>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12">	
							<q-input type="text" v-model="userData.first_name" float-label="Nombre" style="background: transparent;" class="no-shadow" readonly/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" float-label="Apellidos" v-model="userData.last_name" style="background: transparent;" class="no-shadow" readonly/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="email" v-model="userData.email"  float-label="E-mail" style="background: transparent;" class="no-shadow" readonly/>
						</div>

						<div class="col-sm-12 col-md-12 q-my-md" align="center">
							<q-btn label="Cerrar Sesión" :loading="loading_login" color="red">
								<span slot="loading">
        					<q-spinner-oval class="on-left"/>
        					Validando ...
      					</span>
							</q-btn>
					</div>

					</div>						
				</div>

				<div class="col-xs-12 col-sm-12 col-md-4 section-1" v-else>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
							<hr>
						</div>
					</div>

					
						<q-list>
							<q-collapsible opened group="somegroup" icon="shopping_cart" label="Comprar como invitado">
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12">
										<hr>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">	
										<q-input type="text" v-model="name" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="text" float-label="Apellidos" v-model="lastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="email" v-model="email" :after="[{ icon: 'fas fa-envelope', }]" float-label="E-mail" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="text" float-label="Número de Teléfono" v-model="phone" :after="[{ icon: 'fas fa-phone', }]" style="background: transparent;" class="no-shadow" />
									</div>
								</div>
							</q-collapsible>
							<q-collapsible group="somegroup" icon="fa fa-user" label="Crear cuenta">
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12">
										<hr>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">	
										<q-input type="text" v-model="name" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="text" float-label="Apellidos" v-model="lastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="email" v-model="email" :after="[{ icon: 'fas fa-envelope', }]" float-label="E-mail" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="text" float-label="Número de Teléfono" v-model="phone" :after="[{ icon: 'fas fa-phone', }]" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="password" v-model="password" :after="[{ icon: 'fas fa-key', }]" float-label="Clave" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="password" float-label="Confirmar clave" v-model="confirmPassword" :after="[{ icon: 'fas fa-key', }]" style="background: transparent;" class="no-shadow" />
									</div>
								</div>
							</q-collapsible>
							<q-collapsible group="somegroup" icon="fas fa-key" label="Soy usuario">

								<!--== START INICIO DE SESION == -->
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12">
										<hr>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="email" v-model="form.username" :after="[{ icon: 'fas fa-envelope', }]" float-label="Email" style="background: transparent;" class="no-shadow" :error="$v.form.username.$error"/>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12">
										<q-input type="password" float-label="Clave" v-model="form.password" :after="[{ icon: 'fas fa-key', }]" style="background: transparent;" class="no-shadow" :error="$v.form.password.$error"/>
									</div>									
									<div class="col-sm-12 col-md-12 q-my-md" align="center">
											<q-btn label="Iniciar Sesión"  @click="authenticate()" :loading="loading_login">
												<span slot="loading">
                					<q-spinner-oval class="on-left"/>
                					Validando ...
              					</span>
											</q-btn>
									</div>
									<!--== END INICIO DE SESION == -->

								</div>
							</q-collapsible>
						</q-list>
				</div>

				<!-- end section -->
				<!-- section -->
				<div class="col-xs-12 col-sm-12 col-md-4 section-1 section-2" >
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
							<hr>
						</div>
					</div>
					<div class="row" v-if="differentAddress == 'yes' || expandBill">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billName" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" float-label="Apellidos" v-model="billLastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName" :after="[{ icon: 'fas fa-building', }]" float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billAddress1" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 1" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billAddress2" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 2" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCity" :after="[{ icon: 'fas fa-city', }]" float-label="Ciudad" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" float-label="Código postal" v-model="postalCode" :after="[{ icon: 'fas fa-archway', }]" style="background: transparent;" class="no-shadow" />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-select
							v-model="billSelectCountry"
							style="background: transparent;"
							:options="country" float-label="Seleccione pais..." />
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 q-mt-lg"><br><hr></div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 q-mb-md" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Dirección de Envío</div>
							<q-checkbox
							v-model="differentAddress"
							label="Mis direcciones de envío y facturación son las mismas."
							true-value="yes"
							false-value="no"
							/>
							<hr>
						</div>
					</div>
					
					<transition name="component-fade" mode="out-in">
						<div class="row" v-if="differentAddress == 'no'">
							<div class="col-sm-12 col-md-12">
								<q-input type="text" v-model="shippingName" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Apellidos" v-model="shippingLastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" v-model="shippingCompanyName" :after="[{ icon: 'fas fa-building', }]" float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" v-model="shippingAddress1" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 1" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" v-model="shippingAddress2" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 2" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" v-model="shippingCity" :after="[{ icon: 'fas fa-city', }]" float-label="Ciudad" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Código postal" v-model="shippingPostalCode" :after="[{ icon: 'fas fa-archway', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-select
								v-model="shippingSelectCountry"
								style="background: transparent;"
								:options="country" float-label="Seleccione pais..."
								/>
							</div>
						</div>
					</transition>
				</div>
				<!-- end section -->
				<!-- section -->
				<div class="col-xs-12 col-sm-12 col-md-4 section-1 section-3">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de pago</div>
							<hr>
						</div>
					</div>

					<div class="q-py-lg row">
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-radio v-model="paymentMethod" val="paypal" label="Paypal" />	
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-radio v-model="paymentMethod" val="cheque" label="Cheque / Giro postal" />
						</div>	
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-radio v-model="paymentMethod" val="autorizar" label="Autorizar" />
						</div>	
						<div class="col-xs-12 col-sm-12 col-md-12"><br><hr></div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-lg q-mb-lg">Detalles</div>
							<hr>
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
				</div>
				<!-- end section -->
			</div>
					
			<div class="row q-mt-lg">
				<div class="col-12">
					<div class="col-count-product text-right">
						<q-btn type="submit" label="Comprar Ahora" size="lg" color="red" sence class="q-my-md round-borders-0"/>
					</div>
				</div>

				<q-inner-loading :visible="visible" style="background-color: #f4f4f4c7">
	      		<q-spinner size="50px" color="primary"></q-spinner>
	    		</q-inner-loading>
			</div>
		</div>
		<section-carting-app></section-carting-app>
	</section>
</template>

<script>
	import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {helper} from '@imagina/qhelper/_plugins/helper'

	export default{
	components:{
	},
	data(){
		return{
			userData : false,

		 	form: {
        username: null,
        password: null
      },
      rememberData: true,
      loading_login: false,


			visible: false,
			name: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',

			registeredEmail: '',
			registeredPassword: '',

			billName: '',
			billLastName: '',
			billCompanyName: '',
			billAddress1: '',
			billAddress2: '',
			billCity: '',
			postalCode: '',
			billSelectCountry: '',
			address: 'Cra 87F #38A Sur-10',

			differentAddress: 'yes',
			shippingName: '',
			shippingLastName: '',
			shippingCompanyName: '',
			shippingAddress1: '',
			shippingAddress2: '',
			shippingCity: '',
			shippingPostalCode: '',
			shippingSelectCountry: '',
			
			distance: '3,7 Km',
			commentary: '',
			coupon: '',
			selectPayment: '',
			paymentMethod: 'paypal',
			CustmerType: false,
			total: '$' + 100,
			CustmerType: 'invited',
			companyName: '',
			
			country: [
				{
					label: "Alemania",
					value: 'alemania'
				},
				{
					label: "Andorra",
					value: 'andorra'
				},
				{
					label: "Angola",
					value: 'angola'
				},
				{
					label: "Antartida",
					value: 'antartida',
				},
				{
					label: "Antigua y Barbuda",
					value: 'antigua y barbuda'
				},
				{
					label: "Arabia Saudi",
					value: 'arabia saudit'

				},
				{
					label: "Argelia",
					value: 'argelia'
				}
			]
		}
	},
  validations: {
    form: {
      username: {required},
      password: {required}
    }
  },
	mounted(){
		this.typeUser()
		this.setData()
	},
	methods:{
		setData(){
      helper.storage.get.item('userData').then(response => {
        this.userData = response
      })
    },
		typeUser(){
			console.log(this.CustmerType)
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
            console.log('setear variables del store para el Checkout')
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
		font-weight: 600;
		font-size: 18px;
	}

	::float-label { color: red; font-weight: bold; }
	.disabled, [disabled]{
		opacity: 1 !important;
		color: #ec3800!important;
	}

	.q-option-label{
		font-size: 23px;
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

	.q-input .q-icon{
		color: #eb4000!important;
	}

	.q-collapsible-opened .q-item{
		background-color:#f8b415c2;
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
