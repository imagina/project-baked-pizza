<template>
	<div class="row">
		<q-card class="no-shadow col-sm-12">
			<q-card-main class="row">
				
	  		<div class="col-md-6 q-px-sm q-pt-lg">	  			
					<q-select 
						filter
						v-model="formData.country"
						@blur="$v.formData.country.$touch"
						placeholder="País *" 
						:options="countries"
						@input="getProvinces()"/>
				</div>
				<div class="col-md-6 q-px-sm q-pt-lg">
					<q-select 
						filter
						v-model="formData.province" 
						placeholder="Departamento *" 
						:options="provinces"
						@input="getCities()"/>
				</div>
				<div class="col-sm-6 q-px-sm q-pt-lg">
					<q-select 
						filter
						:error="$v.formData.$error"
						v-model="formData.city" 
						placeholder="Ciudad *" 
						:options="cities" />
				</div>
				<div class="col-md-6 q-px-sm">
					<q-input 
						type="text" 
						v-model="formData.zip_code"
						:error="$v.formData.$error"
						@blur="$v.formData.$touch()" 
						float-label="Zip Code *" 
						style="background: transparent;" 
						class="no-shadow"/>
				</div>

				<div class="col-md-12 q-px-sm">
					<q-input 
						type="text" 
						v-model="formData.address1"
						:error="$v.formData.$error"
						@blur="$v.formData.$touch()"
						float-label="Direccion *" 
						style="background: transparent;" 
						class="no-shadow" />
				</div>

				<div class="col-sm-12 q-px-sm q-py-lg">
					<gmap-map
			      :center="center"
			      :zoom="18"
			      style="width:100%;  height: 380px;">
			      <gmap-marker
			        :key="index"
			        v-for="(m, index) in markers"
			        :position="m.position"
			        :clickable="true"
			        :draggable="true"
							@dragend="drag"
			        @click="center=m.position">
			        </gmap-marker>
		    		</gmap-map>
				</div>
				<div class="col-sm-12">
					<q-btn label="Guardar" class="full-width" color="red" @click="save"/>
				</div>
			</q-card-main>
		</q-card>
	</div>
</template>

<script>
	import locationsService from 'src/services/locations'
	import mapareaService from 'src/services/maparea'
	import addresService from 'src/services/addresses'
	import {required} from 'vuelidate/lib/validators'

	export default {
		props: ['user', 'isedit', 'data'],
		data(){
			return{
				opened: false,
				countries: [],
				provinces: [],
				cities: [],

				// data`s form`
				formData:{
					country: '48',
					province: '',
					city: '',
					zip_code: '',
					address1: '',
					lat: 4.6361606,
					lng: -74.16523990000002,
				},

				// Data for maps
				center: { lat: 4.6361606, lng: -74.16523990000002 },
				markers: [ { "position": { "lat": 4.6361606, "lng": -74.16523990000002 } } ],
				places: ['baked pizza'],
				currentPlace: null,
				autocompleteOptions: {
					componentRestrictions:{
						country: ['CO'],
					}
				}
			}
		},
		validations:{
			formData: {
				country: {required},
				province: {required},
				city: {required},
				zip_code: {required},
				address1: {required},
			}
		},
		mounted(){
			this.getCountries()
			this.getProvinces()
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
			save(){
				this.$v.formData.$touch()
				if (this.$v.formData.$error) {
					this.$q.notify({
						position	: 'top-right',
						message	: 'Por favor revise los campos de nuevo.'
					})
					return
				}

				let attributes = {
					user_id: this.user.id,
					country_id: this.formData.country,
					province_id: this.formData.province,
					zip_code: this.formData.zip_code,
					address_1: JSON.stringify({address: this.formData.address1, lat: this.formData.lat, lng: this.formData.lng})
				}

				addresService.create({attributes: attributes})
				.then(response=>{
					
					this.$root.$emit('update_address')
				})
			},
			drag(e){
				this.formData.lat = e.latLng.lat()
				this.formData.lng = e.latLng.lng()
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
		}
	}
</script>
