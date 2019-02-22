<template>

		<div class=" col-md-4  col-xs-12 col-sm-12 section-1" v-if="userData">
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
			<q-card class="no-shadow">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12" align="center">
						<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
					</div>
				</div>
			
				<div class="row">
				<q-list class="col-xs-12 col-sm-12 col-md-12 q-mb-lg">
					<q-collapsible group="somegroup" icon="shopping_cart" label="Invitado" >
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

			</q-card>
		</div>

</template>

<script type="text/javascript">
	import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
	import {helper} from '@imagina/qhelper/_plugins/helper'
	
	export default {
		data(){
			return {
				userData : false,
			 	form: {
	        username: null,
	        password: null
	      },
	      name: '',
				lastName: '',
				email: '',
				phone: '',
				password: '',
				confirmPassword: '',
				registeredEmail: '',
				registeredPassword: '',
				loading_login: false,
			}
		},
		validations: {
	    form: {
	      username: {required},
	      password: {required}
	    }
	  },
	  mounted(){
			this.setData()
		},
		methods:{
			setData(){
      	helper.storage.get.item('userData').then(response => {
        	this.userData = response
      	})
    	},
		}

	}
</script>

<style type="text/css">
	.q-collapsible {
   border-bottom: 1px solid #8080803b;
	}

</style>