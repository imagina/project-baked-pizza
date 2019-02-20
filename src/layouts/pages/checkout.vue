<template>
	<section class="container-fluid">
		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">		
			<div class="row">

				<div class="col-sm-12">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>	
				</div>

				<div class="row">
					<div class="col-md-4">
						<div class="row">
							<div class="col-sm-12" align="center">
								<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
							</div>
						</div>
						<div class="border-top q-py-lg row" align="center">
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="CustmerType" val="invited" label="Comprar como invitado" />	
							</div>
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="CustmerType" val="registerAccount" label="Crear cuenta" />	
							</div>
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="CustmerType" val="registered" label="Soy usuario" />	
							</div>
						</div>

						<transition name="component-fade" mode="out-in">
							<div class="border-top q-py-lg row" v-if="(CustmerType == 'invited') || (CustmerType == 'registerAccount') ">
								<div class="col-sm-12 col-md-12">	
									<q-input type="text" v-model="name" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="text" float-label="Apellidos" v-model="lastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>
						</transition>

						<transition name="component-fade" mode="out-in">
							<div class="border-top q-py-lg row" v-if="(CustmerType == 'invited') || (CustmerType == 'registerAccount') ">
								<div class="col-sm-12 col-md-12">
									<q-input type="email" v-model="email" :after="[{ icon: 'fas fa-envelope', }]" float-label="E-mail" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="text" float-label="Número de Teléfono" v-model="phone" :after="[{ icon: 'fas fa-phone', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>
						</transition>

						<transition name="component-fade" mode="out-in">
							<div class="border-top q-py-lg row" v-if="CustmerType == 'registerAccount'">
								<div class="col-sm-12 col-md-12">
									<q-input type="password" v-model="password" :after="[{ icon: 'fas fa-key', }]" float-label="Clave" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="password" float-label="Confirmar clave" v-model="confirmPassword" :after="[{ icon: 'fas fa-key', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>
						</transition>

						<transition name="component-fade" mode="out-in">
							<div class="border-top q-py-lg row" v-if="CustmerType == 'registered'">
								<div class="col-sm-12 col-md-12">
									<q-input type="email" v-model="registeredEmail" :after="[{ icon: 'fas fa-envelope', }]" float-label="Email" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="password" float-label="Clave" v-model="registeredPassword" :after="[{ icon: 'fas fa-key', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>
						</transition>
					</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-sm-12" align="center">
								<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
							</div>
						</div>
						<div class="row" v-if="differentAddress == 'yes'">
							<div class="border-top q-py-lg row q-mb-md">
								<div class="col-sm-12 col-md-12">
									<q-input type="text" v-model="billName" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="text" float-label="Apellidos" v-model="billLastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>

							<div class="border-top q-py-lg row">
								<div class="col-sm-12 col-md-12">
									<q-input type="text" v-model="billCompanyName" :after="[{ icon: 'fas fa-building', }]" float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
								</div>
							</div>

							<div class="border-top q-py-lg row">
								<div class="col-sm-12 col-md-12">
									<q-input type="text" v-model="billAddress1" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 1" style="background: transparent;" class="no-shadow" />
								</div>
							</div>

							<div class="border-top q-py-lg row">
								<div class="col-sm-12 col-md-12">
									<q-input type="text" v-model="billAddress2" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 2" style="background: transparent;" class="no-shadow" />
								</div>
							</div>

							<div class="border-top q-py-lg row">
								<div class="col-sm-12 col-md-12">
									<q-input type="text" v-model="billCity" :after="[{ icon: 'fas fa-city', }]" float-label="Ciudad" style="background: transparent;" class="no-shadow" />
								</div>
								<div class="col-sm-12 col-md-12">
									<q-input type="text" float-label="Código postal" v-model="postalCode" :after="[{ icon: 'fas fa-archway', }]" style="background: transparent;" class="no-shadow" />
								</div>
							</div>

							<div class="col-sm-12 border-top q-py-lg row">
								<div class="col-sm-12 col-md-12">
									<q-select
									v-model="billSelectCountry"
									style="background: transparent;"
									:options="country" float-label="Seleccione pais..." />
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-sm-12 q-mb-md" align="center">
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

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" v-model="shippingName" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" float-label="Apellidos" v-model="shippingLastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" v-model="shippingCompanyName" :after="[{ icon: 'fas fa-building', }]" float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" v-model="shippingAddress1" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 1" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" v-model="shippingAddress2" :after="[{ icon: 'fas fa-map-marker-alt', }]" float-label="Dirección 2" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-input type="text" v-model="shippingCity" :after="[{ icon: 'fas fa-city', }]" float-label="Ciudad" style="background: transparent;" class="no-shadow" />
									</div>
									<div class="col-sm-12 col-md-12">
										<q-input type="text" float-label="Código postal" v-model="shippingPostalCode" :after="[{ icon: 'fas fa-archway', }]" style="background: transparent;" class="no-shadow" />
									</div>
								</div>

								<div class="col-sm-12 border-top q-py-lg row">
									<div class="col-sm-12 col-md-12">
										<q-select
										v-model="shippingSelectCountry"
										style="background: transparent;"
										:options="country" float-label="Seleccione pais..."
										/>
									</div>
								</div>
								
							</div>
						</transition>
					</div>

					<div class="col-md-4">
						<div class="col-sm-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de pago</div>
						</div>

						<div class="border-top q-py-lg row" align="center">
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="paymentMethod" val="paypal" label="Paypal" />	
							</div>
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="paymentMethod" val="cheque" label="Cheque / Giro postal" class="col-sm-12 col-md-4" />
							</div>	
							<div class="col-sm-12 col-md-4">
								<q-radio v-model="paymentMethod" val="autorizar" label="Autorizar" class="col-sm-12 col-md-4" />
							</div>	
						</div>

						<div class="col-sm-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-lg q-mb-lg">Detalles</div>
						</div>

						<div class="border-top q-py-lg row">
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Distancia del pedido" v-model="distance" :after="[{ icon: 'motorcycle', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Escribe aquí..." v-model="commentary" :after="[{ icon: 'fas fa-comment', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>

						<div class="border-top q-py-lg row">
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Añadir cupones" v-model="coupon" :after="[{ icon: 'fa fa-tag', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-sm-12 col-md-12">
								<q-input type="text" float-label="Valor Total" v-model="total" :after="[{ icon: 'fas fa-thumbs-up', }]"   style="background: transparent;" :disable="true" class="no-shadow" />
							</div>
						</div>

					</div>
				</div>

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
	export default{
	components:{
	},
	data(){
		return{
			visible: false,
			name: 'Yeison',
			lastName: 'Tapia',
			email: 'ejemplo@ejemplo.com',
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
	mounted(){
		this.typeUser()
	},
	methods:{
		typeUser(){
			console.log(this.CustmerType)
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

	span.number-circle{
		background: gray;
		border-radius: 0.8em;
		-moz-border-radius: 0.8em;
		-webkit-border-radius: 0.8em;
		color: #ffffff;
		display: inline-block;
		font-weight: bold;
		line-height: 1.6em;
		margin-right: 15px;
		text-align: center;
		width: 1.6em; 
	}

	@media only screen and (max-width: 600px) {
		.q-input-target{
			font-size: 17px!important;
		}

	}

</style>
