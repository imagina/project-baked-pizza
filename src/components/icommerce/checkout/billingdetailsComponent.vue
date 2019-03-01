<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1">

		<q-card class="no-shadow" v-if="userData">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 q-py-lg">
					<addresses-component></addresses-component>
				</div>
			</div>
			
		</q-card>

		<q-card class="no-shadow" v-else>

			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Nombre" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Apellido" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Direccion 1" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Direccion 2" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Zip Code" style="background: transparent;" class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-select v-model="Shipping.country" placeholder="País" class="q-select--app col-xs-12 col-sm-12 col-md-4" radio :options="countries"/>
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Departamento" style="background: transparent;" class="no-shadow" />
			</div>


			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input type="text" v-model="billCompanyName"  float-label="Ciudad" style="background: transparent;" class="no-shadow" />
			</div>


		</q-card>

		<q-card class="no-shadow" >
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

					<div class="col-md-12 q-pb-lg" v-if="userData">

						<addresses-component></addresses-component>

					</div>

					<div v-else class="row">

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Nombre de empresa" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Nombre" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Apellido" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Direccion 1" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Direccion 2" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Ciudad" style="background: transparent;" class="no-shadow" />
						</div>

						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Zip Code" style="background: transparent;" class="no-shadow" />
						</div>


						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-select v-model="Billing.country" placeholder="País" class="q-select--app col-xs-12 col-sm-12 col-md-4" radio :options="countries"/>
						</div>



						<div class="col-xs-12 col-sm-12 col-md-12">
							<q-input type="text" v-model="billCompanyName"  float-label="Departamento" style="background: transparent;" class="no-shadow" />
						</div>
					</div>

				</div>
			</transition>
		</q-card>

	</div>
</template>

<script type="text/javascript">
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import addressesComponent from 'src/components/icommerce/addresses'
	import profileService from 'src/services/profile'

	import locationsService from 'src/services/locations'


	export default {
		components:{
			addressesComponent,
		},
		data(){
			return {
				countries: [],
				userData: true,
				addresses: [],
				address : '',
				differentAddress: 'yes',
				billCompanyName: '',
				
				Billing: {
					country: ''
				},

				Shipping: {
					country: ''
				},

			}
		},
		created(){
  		this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
			this.getCountries()
		},
		methods:{
			getCountries(){
				locationsService.countries()
				.then(response=>{
					this.countries = this.select(response.data)
				})
			},
		  select(dataArray) {
		    let response = []
		    dataArray.forEach((item) => {
		      let labelTitle = item.title ? item.title : (item['currency'] ? item['currency'] : 'default')

		      response.push({
		        label: labelTitle,
		        value: item.id.toString()
		      });
		    })
		    return response
		  },
			setData(){
      	helper.storage.get.item('userData').then(response => {
        	this.userData = response
        	if (response != null) {
        		this.getAddresses(response.id)
        	}
      	})
    	},
    	getAddresses(id){
    		let include = 'addresses'
    		profileService.show(id, include)
    		.then(response => {
    			this.addresses = (response.data.addresses)
    		})
      }
		}

	}
</script>