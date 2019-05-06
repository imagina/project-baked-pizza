<template>
	<div class="">

		<div class="q-display-1" v-if="whitLabels">
			¡ACEPTANDO PEDIDOS!
		</div>
		<div class="q-display-2 q-my-md text-center" >
			RECOGER EN TIENDA
			<input 
				class="toggle toggle__textless" 
				type="checkbox"
				v-model="typeOrder"> 
				DOMICILIO
		</div>
		<div class="q-my-lg" v-if="whitLabels">
			(Recoger en tienda te ahorra la fila y esperar)
		</div>

		<div class="row text-center" v-if="userId">
			<div class="col-xs-12 col-ms-12">
				<input
					@click="openMyAddress()"
					type="button" 
					value="Usar Mis Direcciones" 
					class="button button-search">
			</div>
		</div>

		<div class="q-my-lg" :id="false ? 'q-carousel-search': ''">
		  <div class="row text-center">

		    <div class="col-xs-6 col-sm-3">
		      <select 
						class="search" 
						v-model="form.typeStreet">
							<option value="">- Seleccione -</option>
		          <option 
		          	v-for="(type, index) in typesStreet" 
		          	:key="index" 
		          	:value="type.name">
		          {{type.name}}
		        </option>
		      </select>
		    </div>

		    <div class="col-xs-6 col-sm-3">
		      <input type="text" 
						v-model="form.street" 
						class="search" 
						placeholder="87b"> 
		    </div>

		    <div class="col-xs-6 col-sm-3">
		      <input type="text" 
						v-model="form.number1" 
						class="search" 
						placeholder="38a">
		    </div>

		    <div class="col-xs-6 col-sm-3">
		      <input 
						type="text" 
						v-model="form.number2" 
						class="search" 
						placeholder="42">
		    </div>

		  </div>

		  <div class="row text-center">
				<div class="col-xs-12 col-ms-12">
					<input 
						type="button" 
						value="VERIFICAR COBERTURA" 
						class="button button-search"
						@click="validateAddress()">
				</div>
			</div>

		</div>
		
		<img 
			src="statics/cards2.png" 
			class="desktop-only" 
			v-if="$q.platform.is.desktop && whitLabels">
		<div 
			class="desktop-only" 
			style="font-family: Muli" 
			v-if="$q.platform.is.desktop && whitLabels">
			Paga tu pedido en línea de forma segura
		</div>

		<q-modal v-model="opened" :content-css="{minWidth: '80vw'}">
			<q-modal-layout>
				<q-toolbar slot="header">
					<q-btn
		        flat
		        round
		        dense
		        v-close-overlay
		        icon="close"/>
	      	<q-toolbar-title>
	        	Se encontraron las siguientes direcciones
	      	</q-toolbar-title>
				</q-toolbar>
				<div class="q-mx-md q-my-md">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<q-btn 
								v-for="(add, index) in results.results" 
								:key="index" 
								:label="add.formatted_address" 
								rounded 
								icon="room"
								color="green"
								@click="showMap(add)"
								class="q-mr-xl q-mb-md full-width"/>
						</div>
						<div class="col-xs-12 col-md-12" v-if="containerMap">
							<gmap-map
					      :center="addresslatLng"
					      :zoom="15.7"
					      style="width:100%;  height: 200px;">
		      			<gmap-marker
									:key="index"
									v-for="(m, index) in markers"
									:label='m.label'
									:position="m.position"
									:icon='m.icon'
									:draggable="true"
									@dragend="handleMarkerUpdate"
									:clickable="true"
									:animation="2"
									@click="center=m.position">
								</gmap-marker>
								<gmap-polygon 
									:key="i+10"
									v-for="(area, i) in areas"
									:paths="area.polygon">
								</gmap-polygon>
		    			</gmap-map>
							<q-btn 
								label="Validar" 
								class="full-width q-mt-md" 
								color="red"
								icon="where_to_vote"
								@click="validateLatLng()"/>
						</div>
					</div>
				</div>
			</q-modal-layout>
		</q-modal>
		
		<q-modal v-model="modalresultcoverage" no-esc-dismiss	no-backdrop-dismiss :content-css="{minWidth: '80vw'}">
			<q-modal-layout>
				<div class="q-mx-md q-my-md">

					<div class="row" v-if="typeOrder">
						<div class="col-xs-12 col-md-12 text-center">
							<q-icon name="sentiment_very_satisfied" size="45px" v-if="coverage"/>
							<q-icon name="sentiment_very_dissatisfied" size="45px" v-else/>
						</div>
						<div class="col-xs-12 col-md-12 text-center">
								<p> <b>{{coverage.status ? 'Si' : 'No'}}</b> hay cobertura en tu dirección en este momento. </p>
								<p v-if="coverage.status"> Costo Domicilio ${{ coverage.price}} </p>
						</div>
						<q-btn label="Aceptar" class="full-width" color="green" @click="saveConfigAddress(true)"/>
					</div>

					<div class="row" v-else>
						<div class="col-md-12">
							<q-card class="no-shadow">
								<q-card-title>
									<p>Listado de tiendas disponibles</p>
								</q-card-title>
								<q-card-main>
									<q-item tag="label" v-for="(store, index) in stores" :key="index">
										<q-item-side>
											<p>
												<q-radio v-model="storeSelected" :val="store.id"/>
												{{store.name}} <b>{{store.address}}</b> {{store.phone}}
											</p>
										</q-item-side>
									</q-item>
								</q-card-main>
							</q-card>
						</div>
						<q-btn label="Aceptar" class="full-width" color="green" @click="saveConfigAddress(false)"/>
					</div>

				</div>
				<q-inner-loading :visible="loading">
      		<q-spinner size="50px" color="primary"></q-spinner>
    		</q-inner-loading>
			</q-modal-layout>
		</q-modal>

		<q-modal 
			v-model="modalMyAddress">
			<q-modal-layout>
				<div class="q-mx-lg">

					<div class="row">
						<div class="col-md-12">
							<p class="q-mt-lg text-center">
								Mis Direcciones
							</p>
						</div>
						<div class="col-md-12">
							<q-btn 
								v-for="(addres, index) in myAddres" 
								:key="index" 
								color="green"
								@click="setAddresFromMyAddress(addres)"
								class="q-my-sm q-mb-md full-width">
								<p class="text-white">
									{{addres.address_1.typeStreet}} 
									{{addres.address_1.street}} 
									{{addres.address_1.number1}}
									{{addres.address_1.number2}}
								</p>
							</q-btn>
						</div>
					</div>
				</div>
			</q-modal-layout>
		</q-modal>

		<q-inner-loading :visible="visible" style="background: transparent">
      <q-spinner size="50px" color="white"></q-spinner>
    </q-inner-loading>

	</div>
</template>

<script>
	import mapService from 'src/services/maparea'
	import { required } from 'vuelidate/lib/validators'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import addressesService from 'src/services/addresses'
	export default {
		props:{
			whitLabels: {
      	type: Boolean,
      	default: true
    	},
		},
		data(){
			return{
				opened: false,
				areas: [],
				areasValidated: [],
				ifcoberture: false,
				typeOrder: false,
				storeSelected : '',
				typesStreet:
				[
					{name : 'Calle'},
					{name : 'Carrera'},
					{name : 'Avenida'},
					{name : 'Diagonal'},
					{name : 'Transversal'},
					{name : 'Vía'},
				],
				addresslatLng: {},
				markers: [],
				form:{
					typeStreet: '',
					street: '',
					number1: '',
					number2: '',
				},
				visible: false,
				results:[],
				map: false,
				stores: [],
				store_id: '',
				containerMap: false,
				addressSelected:[],
				coverage: [],
				modalresultcoverage: false,
				loading: true,
				userId: false,
				myAddres: [],
				modalMyAddress: false,
			}
		},
		validations: {
			storeSelected: {required},
    	form: {
				typeStreet: { required },
				street: { required },
				number1: { required },
				number2: { required },
    	}
  	},
		computed: {
			fullAddress(){
				return `${this.form.typeStreet}+
					${this.form.street}+
					${this.form.number1}+
					${this.form.number2}`
			},
			polygons(){
				return this.areas.map(area=>{
					return {
						path: new google.maps.Polygon({paths: area.polygon}),
						price: area .price,
						id: area.id
					}
				})
			},
		},
		mounted(){
			this.$nextTick(() => {
				this.getDataFromStorage()
				this.isLoggued()
				this.getMapAreas()
				this.getStores()
			})
		},
		methods:{
			validateAddress(){
				this.containerMap = false
				this.$v.form.$touch()
				if (this.$v.form.$error) {
					this.$q.notify('Faltan datos para validar su direccion.')
					return
				}else{
					mapService.latLng(this.fullAddress)
					.then(response =>{ 
						this.opened = true
						this.results = response.data.data
					})
					.catch(error=>{
						console.warn(error)
					})
				}
			},
			showMap(map){
				this.markers = []
				this.containerMap = true
				this.addresslatLng = map.geometry.location
				this.markers.push({
					position: map.geometry.location
				})
			},
			validateLatLng(){
				this.coverage = false
				let address = new google.maps.LatLng(this.addresslatLng)
				this.polygons.forEach(polygon=>{
					setTimeout(()=>{
						let response = google.maps.geometry.poly.containsLocation(address, polygon.path)
						if(response){
							this.coverage = {
								status: response,
								price: polygon.price,
								area: polygon.id
							}
						}
					},1000)
				})
				this.opened = false
				this.modalresultcoverage = true
				setTimeout(()=>{
					this.loading =  false
				},2000)
			},
			saveConfigAddress(typeOrder){
				let data = {}
				data.typeOrder = this.typeOrder
				data.form = {
					typeStreet: this.form.typeStreet,
					street: this.form.street,
					number1: this.form.number1,
					number2: this.form.number2,
				}
				data.addresslatLng = this.addresslatLng
				data.coverage = this.coverage
				if (!typeOrder){
					data.store = this.storeSelected
				}
				if(!typeOrder && this.storeSelected == ''){
					this.$q.notify('Seleccione una tienda')
					return
				}
				this.modalresultcoverage = false
				helper.storage.set('dataAddress', data)
			},
			getDataFromStorage(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res !== null) {
						this.typeOrder = res.typeOrder
          	this.form.typeStreet = res.form.typeStreet
						this.form.street = res.form.street
						this.form.number1 = res.form.number1
						this.form.number2 = res.form.number2
						this.addresslatLng = res.addresslatLng
						this.coverage = res.coverage
						if(res.typeOrder){
								this.storeSelected = res.store
						}
          }
        })
			},
			isLoggued(){
				helper.storage.get.item('userData').then(response => {
					if (response !== null) {
						this.userId = response.id 
						this.getAddresOfUserLogued(response.id)
					}
				})
			},
			getAddresOfUserLogued(userId){
				let filter = {
					user: userId
				}
				this.visible = true
				addressesService.index(filter)
				.then(response=>{
					this.myAddres = response.data
					this.visible = false
				})
				.catch(error=>{
					console.warn(error)
					this.visible = false
				})
			},
			openMyAddress(){
				this.modalMyAddress = true
			},
			setAddresFromMyAddress(addres){					
				this.form.typeStreet = addres.address_1.typeStreet
				this.form.street = addres.address_1.street
				this.form.number1 = addres.address_1.number1
				this.form.number2 = addres.address_1.number2

				this.modalMyAddress = false
			},
			getMapAreas(){
        mapService.mapareas()
        .then(response=>{
          this.areas = response.data
        })
        .catch(error=>{
          console.warn(error)
        })
      },
			getStores(){
				mapService.stores()
				.then(response => {
					this.stores = response.data
				})
				.catch(error=>{
					console.warn(error)
				})
			},
			handleMarkerUpdate(e){
				console.log(e)
				
			}
		}
	}
</script>