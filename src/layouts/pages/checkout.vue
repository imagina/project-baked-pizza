<template>
	<section class="container-fluid">
		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">		
			<div class="row">

				<div class="col-sm-12">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>	
				</div>

				<div class="col-sm-12" align="center">
					<div class="q-display-2 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row flex flex-center">
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-2 label-content">
								<label for="">E-Mail:</label>
							</div>
							<div class="col-md-10">
								<q-input type="text" v-model="email" :after="[{ icon: 'email', }]" placeholder="Email" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12 border-top q-py-lg row" align="center">
					<div class="col-sm-12 col-md-6">
						<q-radio v-model="CustmerType" val="opt1" label="Nuevo" />	
					</div>
					<div class="col-sm-12 col-md-6">
						<q-radio v-model="CustmerType" val="opt2" label="Comprar como invitado" />	
					</div>
				</div>	

				<div class="col-sm-12" align="center">
					<div class="q-display-2 csh3__catering_title q-mb-md">Detalles</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Dirección de entregar:</label>
							</div>
							<div class="col-md-6">
								<q-input type="text" placeholder="Dirección de entregar" v-model="address" :after="[{ icon: 'location_on', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Distancia del pedido:</label>
							</div>
							<div class="col-md-6">
								<q-input type="text" placeholder="Distancia del pedido" v-model="distance" :after="[{ icon: 'motorcycle', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Comentarios:</label>
							</div>
							<div class="col-md-6">
								<q-input type="text" placeholder="Escribe aquí..." v-model="commentary" :after="[{ icon: 'fas fa-comment', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Forma de pago:</label>
							</div>
							<div class="col-md-6">
								<q-select
								v-model="select"
								:options="paymentMethod" placeholder="Pago en Línea"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Añadir cupones:</label>
							</div>
							<div class="col-md-6">
								<q-input type="text" placeholder="Digita el Código" v-model="coupon" :after="[{ icon: 'fa fa-tag', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-6">
						<div class="row">
							<div class="col-md-6 label-content">
								<label for="">Valor Total:</label>
							</div>
							<div class="col-md-6">
								<q-input type="text" placeholder="Valor Total" v-model="total" :after="[{ icon: 'fas fa-thumbs-up', }]"   style="background: transparent;" :disable="true" class="no-shadow" />
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
			email: 'ejemplo@ejemplo.com',
			address: 'Cra 87F #38A Sur-10',
			distance: '3,7 Km',
			commentary: '',
			coupon: '',
			CustmerType: false,
			total: '$' + 100,
			paymentMethod: [
				{
				label: 'Payu',
				value: 'payu'
				},
				{
				label: 'Credito',
				value: 'credit'
				}
			],
		}
	},
	mounted(){
	},
	methods:{
	}
	}
</script>

<style lang="stylus">
	.label-content{
		text-align: right;
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
		font-size: 23px;
	}

	::placeholder { color: red; font-weight: bold; }

	.q-option-label{
		font-size: 23px;
		color: #713e3d;
	}

	@media only screen and (max-width: 600px) {
		.q-input-target{
			font-size: 17px!important;
		}

	}

</style>
