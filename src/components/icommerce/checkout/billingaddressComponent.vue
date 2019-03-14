<template>
	<div class="row">
		{{formData}}
		<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.companyname"  
					float-label="Nombre de empresa" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.name"  
					float-label="Nombre" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.last_name"  
					float-label="Apellido" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.address1"  
					float-label="Direccion 1" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.address2"  
					float-label="Direccion 2" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.zip_code"  
					float-label="Zip Code" 
					style="background: transparent;" 
					class="no-shadow"
					v-on:blur="getDataShipping" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 q-my-md">
				<q-select 
					filter
					v-model="formData.country" 
					placeholder="País" 
					radio 
					:options="countries"
					@input="getProvinces()"
					v-on:blur="getDataShipping"
					class="q-select--app col-xs-12 col-sm-12 col-md-4" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 q-my-md">
				<q-select 
					filter
					v-model="formData.province" 
					placeholder="Departamento" 
					radio 
					:options="provinces"
					@input="getCities()"
					class="q-select--app col-xs-12 col-sm-12 col-md-4" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 q-my-md">
				<q-select 
					filter
					v-model="formData.city" 
					placeholder="Ciudad" 
					radio 
					:options="cities"
					class="q-select--app col-xs-12 col-sm-12 col-md-4" />
			</div>
			<q-btn label="Guardar" size="xs" class="float-left" color="red" no-caps @click="createAddress"/>
	</div>
</template>

<script>
	import locationsService from 'src/services/locations'
	import EventBus from 'src/utils/event-bus';

	export default {
		props:['formData','type','different'],
		data(){
			return {
				name: '',
				countries: [],
				provinces: [],
				cities: [],
			}
		},
		mounted(){
			this.getCountries()
		},
		methods:{
			getCountries(){
				locationsService.countries()
				.then(response=>{
					this.countries = this.select(response.data)
					this.cities = []
				})
			},
			getProvinces(){
				let filter = {"country": this.formData.country}
				locationsService.provinces(filter)
				.then(response=>{
					this.provinces = this.select(response.data)
				})
			},
			getCities(){
				let filter = {"province_id": this.formData.province}
				locationsService.cities(filter)
				.then(response=>{
					this.cities = this.select(response.data)
				})
			},
			select(dataArray) {
		    let response = []
		    dataArray.forEach((item) => {
		      let labelTitle = item.title ? item.title : (item['name'] ? item['name'] : 'default')

		      response.push({
		        label: labelTitle,
		        value: item.iso_2.toString()
		      });
		    })
		    return response
			},
			getDataShipping(){
				let data = {
					zip_code 	: this.formData.zip_code,
					country		: this.formData.country,
				}
				if(this.type == 1 && this.different == true){
					EventBus.$emit('onblurmethodshipping', data)
				}
				
				if(this.type == 2 && this.different == false){
					EventBus.$emit('onblurmethodshipping', data)
				}
			},
			createAddress(){
				EventBus.$emit('createAddress',this.formData)
			}
		}
	}
</script>