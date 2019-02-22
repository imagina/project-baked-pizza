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
						<q-card class="no-shadow">
							<q-card-main>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12" align="center">
										<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
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
								</div>	
							</q-card-main>
						</q-card>
					</div>

				<div class="col-xs-12 col-sm-12 col-md-4 section-1" v-else>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
						</div>
					</div>

					
						<q-list>
							<q-collapsible group="somegroup" icon="shopping_cart" label="Comprar como invitado" >
								<div class="row">
							
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
							<q-collapsible opened group="somegroup" icon="fas fa-key" label="Soy usuario">

								<!--== START INICIO DE SESION == -->
								<div class="row">
			
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

					<div class="row">
						<div class="col-md-12 q-mb-lg">
							<q-btn label=" - Agregar otra direccion -" class="full-width" color="red"/>
						</div>
					</div>
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
				<!-- end section -->
				<!-- section -->
				<div class="col-xs-12 col-sm-12 col-md-4 section-1 section-3">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de pago</div>
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
	import profile from 'src/services/profile'
	import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {array} from '@imagina/qhelper/_plugins/array'
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
			],
			addresses: [],
			address : '',
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
