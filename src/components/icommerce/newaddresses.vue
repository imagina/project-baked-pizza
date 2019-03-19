<template>
	<div class="row">

		<q-btn label="Nueva Direcciòn" size="sm" no-caps class="float-right" color="red" icon="add" rounded @click="opened = true"/>
		
		<q-modal v-model="opened" :content-css="{minWidth: '80vw', maxWidth: '50vh'}">
		  <q-modal-layout>
		    <q-toolbar slot="header">
		      <q-btn flat round dense v-close-overlay icon="keyboard_arrow_left" />
		      <q-toolbar-title>
		        Direcciones
		      </q-toolbar-title>
		    </q-toolbar>
		    <div class="q-px-lg q-py-md">

					<q-card class="no-shadow">

						<q-card-main class="row">
			    	
							<div class="col-sm-12 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.companyname" 
									float-label="Nombre de empresa" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>

							<div class="col-sm-6 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.name"  
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()"
									float-label="Nombre" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>

							<div class="col-sm-6 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.last_name"  
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()"
									float-label="Apellido" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>

							<div class="col-sm-6 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.address1"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()"
									float-label="Direccion 1" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>

							<div class="col-sm-6 q-px-sm">
								<gmap-autocomplete/>
								
								<q-input 
									type="text" 
									v-model="formData.address2"  
									float-label="Direccion 2" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>

							<div class="col-sm-6 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.zip_code"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()" 
									float-label="Zip Code" 
									style="background: transparent;" 
									class="no-shadow"/>
							</div>

							<div class="col-sm-6 q-px-sm q-pt-lg">
								<q-select 
									filter
									v-model="formData.country"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()"
									placeholder="País" 
									:options="countries"
									@input="getProvinces()"/>
							</div>

							<div class="col-sm-6 q-px-sm q-pt-lg">
								<q-select 
									filter
									v-model="formData.province" 
									placeholder="Departamento" 
									:options="provinces"
									@input="getCities()"/>
							</div>

							<div class="col-sm-6 q-px-sm q-pt-lg">
								<q-select 
									filter
									v-model="formData.city" 
									placeholder="Ciudad" 
									:options="cities" />
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
						        @click="center=m.position"
						      ></gmap-marker>
						    </gmap-map>
							</div>

							<div class="col-sm-12">
								<q-btn label="Guardar" class="full-width" color="red" @click="createAddress"/>
							</div>

						</q-card-main>

					</q-card>

				</div>
			</q-modal-layout>
		</q-modal>
	</div>
</template>

<script>
	import locationsService from 'src/services/locations'
	import {required} from 'vuelidate/lib/validators'
	import GoogleMap from "src/components/GoogleMap"
	import EventBus from 'src/utils/event-bus';

	export default {
		components:{
			GoogleMap
		},
		data(){
			return {
				opened: false,
				formData:[],
				type: '',
				different: '',
				disabledForm: false,

				name: '',
				countries: [],
				provinces: [],
				cities: [],

				center: { lat: 4.6361606, lng: -74.16523990000002 },
				markers: [ { "position": { "lat": 4.6361606, "lng": -74.16523990000002 } } ],
				places: [],
				currentPlace: null
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
			},
			setPlace(place) {
      this.currentPlace = place;
	    },
	    addMarker() {
	      if (this.currentPlace) {
	        const marker = {
	          lat: this.currentPlace.geometry.location.lat(),
	          lng: this.currentPlace.geometry.location.lng()
	        };
	        this.markers.push({ position: marker });
	        this.places.push(this.currentPlace);
	        this.center = marker;
	        this.currentPlace = null;
	      }
	    },
	    geolocate: function() {
	      navigator.geolocation.getCurrentPosition(position => {
	        this.center = {
	          lat: position.coords.latitude,
	          lng: position.coords.longitude
	        };
	      });
	    }

		}
	}
</script>