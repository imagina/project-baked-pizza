<template>
	<section class="container-fluid">
		<breadcrumb name="Checkout" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">		
			<div class="row">

				<div class="col-sm-12">
					<div class="q-display-2 color-baked-title" align="center">Checkout</div>	
				</div>

				<div class="col-sm-12" align="center">
					<div class="q-display-2 csh3__catering_title">Informaciòn del cliente</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row flex flex-center">
					<div class="col-md-6">
						<q-input type="text" float-label="Email" v-model="email" :after="[{ icon: 'email', }]" style="background: transparent;" class="no-shadow" />
					</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row" align="center">
					<div class="col-sm-12 col-md-6">
						<q-radio v-model="CustmerType" val="opt1" label="Nuevo" />	
					</div>
					<div class="col-sm-12 col-md-6">
						<q-radio v-model="CustmerType" val="opt1" label="Comprar como invitado" />	
					</div>
				</div>	

				<div class="col-sm-12" align="center">
					<div class="q-display-2 csh3__catering_title">Detalles</div>
				</div>		

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Direccion de entregar" v-model="email" :after="[{ icon: 'location_on', }]" style="background: transparent;" class="no-shadow" />
					</div>
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Dsitancia del pedido" v-model="email" :after="[{ icon: 'motorcycle', }]" style="background: transparent;" class="no-shadow" />
					</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Comentarios" v-model="email" :after="[{ icon: 'fas fa-comment', }]" style="background: transparent;" class="no-shadow" />
					</div>
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Forma de pago" v-model="email" :after="[{ icon: 'email', }]" style="background: transparent;" class="no-shadow" />
					</div>
				</div>

				<div class="col-sm-12 border-top q-py-lg row">
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Cupones" v-model="email" :after="[{ icon: 'fa fa-tag', }]" style="background: transparent;" class="no-shadow" />
					</div>
					<div class="col-sm-12 col-md-6">
						<q-input type="text" float-label="Valor Total" v-model="email" :after="[{ icon: 'fas fa-thumbs-up', }]"   style="background: transparent;" class="no-shadow" />
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
			email: '',
			CustmerType: false,
		}
	},
	mounted(){
	},
	methods:{
	}
	}
</script>