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
					class="no-shadow" />
			</div>

			<div class="col-xs-12 col-sm-12 col-md-12 q-my-md">
				<q-select 
					filter
					v-model="formData.country" 
					placeholder="País" 
					radio 
					:options="countries"
					@input="getProvinces()"
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

	</div>
</template>

<script>
	import locationsService from 'src/services/locations'

	export default {
		props:['formData'],
		data(){
			return {
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
		        value: item.id.toString()
		      });
		    })
		    return response
		  }
		}
	}
</script>