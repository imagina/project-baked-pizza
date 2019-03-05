<template>

		<div class=" col-md-4  col-xs-12 col-sm-12 section-1" v-if="parentData.userData">
			<q-card class="no-shadow">
				<q-card-main>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12" align="center">
							<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Información del cliente</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12">	
							<q-input type="text" v-model="parentData.userData.first_name" float-label="Nombre" style="background: transparent;" class="no-shadow" readonly/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" float-label="Apellidos" v-model="parentData.userData.last_name" style="background: transparent;" class="no-shadow" readonly/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="email" v-model="parentData.userData.email"  float-label="E-mail" style="background: transparent;" class="no-shadow" readonly/>
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
					<q-collapsible group="somegroup" label="Invitado" >
						<div class="row">
					
							<div class="col-xs-12 col-sm-12 col-md-12">	
								<q-input type="text" v-model="parentData.name" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="text" float-label="Apellidos" v-model="parentData.lastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="email" v-model="parentData.email" :after="[{ icon: 'fas fa-envelope', }]" float-label="E-mail" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="text" float-label="Número de Teléfono" v-model="parentData.phone" :after="[{ icon: 'fas fa-phone', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</q-collapsible>
					<q-collapsible group="somegroup"  label="Crear cuenta">
						<div class="row">

							<div class="col-xs-12 col-sm-12 col-md-12">	
								<q-input type="text" v-model="parentData.name" :after="[{ icon: 'fas fa-user', }]" float-label="Nombre" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="text" float-label="Apellidos" v-model="parentData.lastName" :after="[{ icon: 'fas fa-user', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="email" v-model="parentData.email" :after="[{ icon: 'fas fa-envelope', }]" float-label="E-mail" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="text" float-label="Número de Teléfono" v-model="parentData.phone" :after="[{ icon: 'fas fa-phone', }]" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="password" v-model="parentData.password" :after="[{ icon: 'fas fa-key', }]" float-label="Clave" style="background: transparent;" class="no-shadow" />
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12">
								<q-input type="password" float-label="Confirmar clave" v-model="parentData.confirmPassword" :after="[{ icon: 'fas fa-key', }]" style="background: transparent;" class="no-shadow" />
							</div>
						</div>
					</q-collapsible>
					<q-collapsible opened group="somegroup" label="Soy usuario">

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

<script>
	import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
	import {helper} from '@imagina/qhelper/_plugins/helper'
	
	export default {
		props: ['parentData'],
		data(){
			return {
				form: {
	        username: null,
	        password: null
	      },
				loading_login: false,
			}
		},
		validations: {
	    form: {	
	      username: {required},
	      password: {required}
	    }
	  },
	 	created(){
  		this.$root.$on("sesionStart", this.setData);
		},
	  mounted(){
			this.setData()
		},
		methods:{
			setData(){
      	helper.storage.get.item('userData').then(response => {
        	this.parentData.userData = response
      	})
    	},
    	async authenticate() {
        this.$v.$touch();
        if (this.$v.$error) {
          //alert.error('Please review fields again.', 'bottom');
        } else {
          this.loading_login = !this.loading_login;
          const {username, password} = this.form;
          this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then(response => {
            this.loading_login = !this.loading_login;
            this.$root.$emit('sesionStart')
          });
        }
      },
		}

	}
</script>

<style type="text/css">
	.q-collapsible {
   border-bottom: 1px solid #8080803b;
	}
</style>