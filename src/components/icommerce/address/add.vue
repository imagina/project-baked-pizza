<template>
	<div>
        <div class="layout-padding">
			<div class="row">
				<div class="col-md-12">
					<q-card class="no-shadow col-sm-12">
						<q-card-main class="row">
							<div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-pt-lg">	  			
								<q-input 
									type="text" 
									v-model="formData.first_name"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()" 
									float-label="Nombre *" 
									style="background: transparent;" 
									class="no-shadow"/>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-pt-lg">	  			
								<q-input 
									type="text" 
									v-model="formData.last_name"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()" 
									float-label="Apellido *" 
									style="background: transparent;" 
									class="no-shadow"/>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 q-px-sm q-pt-lg">	  			
								<q-input 
									type="text" 
									v-model="formData.company"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()" 
									float-label="Compañia *" 
									style="background: transparent;" 
									class="no-shadow"/>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-pt-lg">	  			
								<q-select 
									filter
									v-model="formData.country"
									@blur="$v.formData.country.$touch"
									placeholder="País *" 
									:options="countries"
									@input="getProvinces()"/>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-pt-lg">
								<q-select 
									filter
									v-model="formData.province" 
									placeholder="Departamento *" 
									:options="provinces"
									@input="getCities()"/>
							</div>
							<div class="col-xs-12 col-sm-6 col-sm-6 q-px-sm q-pt-lg">
								<q-select 
									filter
									:error="$v.formData.$error"
									v-model="formData.city" 
									placeholder="Ciudad *" 
									:options="cities" />
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.zip_code"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()" 
									float-label="Zip Code *" 
									style="background: transparent;" 
									class="no-shadow"/>
							</div>

							<div class="col-xs-12 col-sm-12 col-md-12 q-px-sm">
								<q-input 
									type="text" 
									v-model="formData.address1"
									:error="$v.formData.$error"
									@blur="$v.formData.$touch()"
									float-label="Direccion *" 
									style="background: transparent;" 
									class="no-shadow" />
							</div>
							<div class="col-sm-12 q-px-sm q-py-lg q-display-2 text-center">
								RECOGER EN TIENDA
								<input 
								class="toggle toggle__textless"
								type="checkbox"
								v-model="domicile">
								DOMICILIO
								<p class="text-bold" v-if="!domicile">Debe seleccionar una tienda para recoger.</p>
								<p class="text-bold" v-if="domicile">Debe seleccionar area valida para el domicilio.</p>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12 q-px-sm" align="center" v-if="!domicile">
								<q-item tag="label" v-for="(store, index) in stores" :key="index">
									<q-item-side>
										<q-radio v-model="formData.store_id" :val="store.id" :label="store.name"/>
									</q-item-side>
								</q-item>
							</div>
							<div class="col-sm-12 q-px-sm q-py-lg" v-if="domicile">
								<q-alert
									v-if="ifcoberture == true"
									type="positive"
									appear
									class="q-mb-sm col-md-12"
								>
									Area cubierta.
								</q-alert>

								<q-alert
									v-if="ifcoberture == false"
									type="negative"
									appear
									class="q-mb-sm col-md-12"
								>
									Area no cubierta.
								</q-alert>

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
							
							<div class="col-xs-12 col-md-12 col-sm-12">
								<q-btn label="Guardar" class="full-width" color="red" @click="save"/>
							</div>
						</q-card-main>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import locationsService from 'src/services/locations'
	import mapareaService from 'src/services/maparea'
	import addresService from 'src/services/addresses'
	import mapAreaService from 'src/services/maparea'

	import EventBus from 'src/utils/event-bus'
	import {required} from 'vuelidate/lib/validators'
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import {mapState} from 'vuex'

	export default {
		props: ['dataEdit'],
		data(){
			return{
				
				countries: [],
				provinces: [],
				cities	 : [],
				stores: [],
				storeSelected: '',
				areas: [],
				ifcoberture: true,
				areasValidated: [],
				domicile: false,
				visible: false,

				// data`s form`
				formData:{
					first_name: '',
					last_name: '',
					company: '',
					country: '48',
					province: '',
					city: '',
					zip_code: '',
					address1: '',
					store_id: '',
					domicile: false,
					lat: 4.6361606,
					lng: -74.1658186,
				},

				// Data for maps
				center: { lat: 4.6361606, lng: -74.1658186 },
				markers: [ { "position": { "lat": 4.6361606, "lng": -74.1658186 }, "icon": 'statics/favicon.png' } ],
				places: ['baked pizza'],
				currentPlace: null,
				autocompleteOptions: {
					componentRestrictions:{
						country: ['CO'],
					}
				}
			}
		},
		watch: {
			dataEdit: function(val){
				if (Object.keys(val).length > 0) {
					this.formData = {
						first_name	: val.first_name,
						last_name	: val.last_name,
						company		: val.company,
						country		: val.country_id,
						province	: val.province_id,
						city		: val.city_id,
						domicile	: val.options.domicile,
						store_id	: parseInt(val.options.store_id),
						zip_code	: val.zip_code,
						address1	: val.address_1.address,
						lat			: val.address_1.lat,
						lng			: val.address_1.lng,
					}
					this.domicile = val.options.domicile
					this.dataMap(val.address_1.lat, val.address_1.lng)
					this.getCountries()
					
					if (val.options.domicile) {
						this.evalAddress()
					}

				}else{
					this.resetData()
				}
			},
			domicile: function(val){
				this.formData.domicile = val
				this.formData.store_id = ''

				if (val) {
					this.evalAddress()
				}
			}
		},
		computed: {
		...mapState({
			addresses: state => state.address.addresses,
			user     : state => state.address.user,
			modal    : state => state.address.modal,
		})
		},
		validations:{
			formData: {
				last_name: {required},
				first_name: {required},
				company: {required},
				country: {required},
				province: {required},
				city: {required},
				zip_code: {required},
				address1: {required},
				store_id: {required},
			}
		},
		created() {
			this.getCountries()
			this.getStores()
			this.getMapAreas()
		},
		mounted(){
			
		},
		methods:{
			getCountries(){
				locationsService.countries()
				.then(response=>{
					this.countries = this.select(response.data)
					this.cities = []
					this.getProvinces()
				})
			},
			getProvinces(){
				let filter = {"country": this.formData.country}
				locationsService.provinces(filter)
				.then(response=>{
					this.provinces = []
					this.provinces = this.select(response.data)
					this.getCities()
				})
			},
			getCities(){
				let filter = {"province_id": this.formData.province}
				locationsService.cities(filter)
				.then(response=>{
					this.cities = []
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

				if (Object.keys(this.dataEdit).length > 0) {
					this.updateAddress()
				}else{
					this.setAddress()
				}

			},
			setAddress(){
				let attributes = {
					first_name	: this.formData.first_name,
					last_name	: this.formData.last_name,
					company		: this.formData.company,
					user_id		: this.user.id,
					country_id	: this.formData.country,
					province_id	: this.formData.province,
					city_id		: this.formData.city,
					zip_code	: this.formData.zip_code,
					store_id 	: this.formData.store_id,
					options		: JSON.stringify({store_id: this.formData.store_id, domicile: this.formData.domicile}),
					address_1	: JSON.stringify({address: this.formData.address1, lat: this.formData.lat, lng: this.formData.lng})
				}

				this.$store.dispatch('address/setAddress',{attributes: attributes}).then(response => {
					if (response) {
						this.getAddresses()
						this.resetData()
						EventBus.$emit('closeModal', false)
						alert.success('Registro agregado')
					}else{
						alert.error('Error al agregar el registro')
					}
				})
			},
			updateAddress(){
				var newData =  {
					id: this.dataEdit.id,
					attributes : {
						first_name	: this.formData.first_name,
						last_name	: this.formData.last_name,
						company		: this.formData.company,
						user_id		: this.user.id,
						country_id	: this.formData.country,
						province_id	: this.formData.province,
						city_id		: this.formData.city,
						zip_code	: this.formData.zip_code,
						options		: JSON.stringify({store_id: this.formData.store_id, domicile: this.formData.domicile}),
						address_1	: JSON.stringify({address: this.formData.address1, lat: this.formData.lat, lng: this.formData.lng})
					}
				}

				this.$store.dispatch('address/updateAddress',newData).then(response => {
					EventBus.$emit('closeModal', false)
					alert.success('Registro actualizado')
				})
			},
			getAddresses(){
				this.$store.dispatch('address/getAddresses')
			},
			drag(e){
				this.formData.lat = e.latLng.lat()
				this.formData.lng = e.latLng.lng()
				this.evalAddress()
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
			dataMap(lat,lng){
				this.center  = { lat: lat, lng: lng }
				this.markers = [ { "position": { "lat": lat, "lng": lng } } ]
			},
			getStores(){
				mapAreaService.stores().then(response => {
					this.stores = response.data
				})
			},
			getMapAreas(){
				mapAreaService.mapareas()
				.then(response=>{
					this.areas = response.data
				})
				.catch(error=>{
					console.warn(error)
				})
			},
			evalAddress(){
				this.ifcoberture 		= false
				this.areasValidated 	= [] 
				this.formData.store_id 	= ''
				var areasValidated 		= []
				var latLng 				= new google.maps.LatLng(this.formData.lat, this.formData.lng)

				this.areas.forEach( area => {
					let poligon = new google.maps.Polygon({paths: area.polygon})
					var those = this;

					setTimeout(function() {
						let result = google.maps.geometry.poly.containsLocation(latLng, poligon)
						if (result) {
							mapAreaService.show(area.id,'store').then(response => {
								if (Object.keys(response).length > 0) {
									those.ifcoberture 		= result
									those.formData.store_id = response.store.id
								}
							})
						}
					}, 1000)
				})
			},
			resetData(){
				this.formData = {
					country: '48',
					province: '',
					city: '',
					zip_code: '',
					address1: '',
					store_id: '',
					domicile: false,
					lat: 4.6361606,
					lng: -74.1658186,
				}
			}

		}
	}
</script>