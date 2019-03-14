<template>
	<div class="row">
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
					:error="$v.formData.$error"
					@blur="$v.formData.$touch()"
					float-label="Nombre" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.last_name"  
					:error="$v.formData.$error"
					@blur="$v.formData.$touch()"
					float-label="Apellido" 
					style="background: transparent;" 
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12">
				<q-input 
					type="text" 
					v-model="formData.address1"
					:error="$v.formData.$error"
					@blur="$v.formData.$touch()"
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
					:error="$v.formData.$error"
					@blur="$v.formData.$touch()" 
					float-label="Zip Code" 
					style="background: transparent;" 
					class="no-shadow"
					v-on:blur="getDataShipping" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 q-my-md">
				<q-select 
					filter
					v-model="formData.country"
					:error="$v.formData.$error"
					@blur="$v.formData.$touch()"
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
			<q-btn label="Guardar" size="xs" class="float-left" :disabled="disabledForm" color="red" no-caps @click="createAddress"/>
	</div>
</template>

<script>
	import locationsService from 'src/services/locations'
	import EventBus from 'src/utils/event-bus';

	import { required } from 'vuelidate/lib/validators';

	export default {
		props:['formData','type','different','disabledForm'],
		data(){
			return {
				name: '',
				countries: [],
				provinces: [],
				cities: [],
			}
		},
		validations:{
			formData: {
				name: {required},
				last_name: {required},
				address1: {required},
				zip_code: {required},
				country: {required}
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
		        value: item.id.toString()
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
				this.$v.formData.$touch()
				if (this.$v.formData.$error) {
					this.$q.notify({
						 position	: 'top-right',
						 message	: 'Por favor revise los campos de nuevo.'
					})
					return
				}else{
					EventBus.$emit('createAddress',this.formData)
				}
			}
		}
	}
</script>