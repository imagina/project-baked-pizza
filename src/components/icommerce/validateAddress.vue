<template>
	<div class="text-center">
		<div class="q-display-1 " style="color: white">
			¡ACEPTANDO PEDIDOS!
		</div>
		<div class="q-display-2 q-my-md">
			RECOGER EN TIENDA
			<input 
				class="toggle toggle__textless" 
				type="checkbox"
				@change="handleChangeCheckbox()"
				v-model="typeOrder"> 
				DOMICILIO
		</div>
		<div class="q-my-lg">
			(Recoger en tienda te ahorra la fila y esperar)
		</div>
		<div class="q-my-lg" id="q-carousel-search">
		  <div class="row">
		    <div class="col-sm-3">
		      <select class="search" v-model="typeStreet">
		          <option 
		          	v-for="(type, index) in typesStreet" 
		          	:key="index" 
		          	:value="type.name">
		          {{type.name}}
		        </option>
		      </select>
		    </div>
		    <div class="col-sm-3">
		      <input type="text" v-model="street" class="search" placeholder="86bis"> 
		    </div>
		    <div class="col-sm-1">
		      <span>#</span>
		    </div>
		    <div class="col-sm-2">
		      <input type="text" v-model="number1" class="search" placeholder="38">
		    </div>
		    <div class="col-sm-2">
		      <input type="text" v-model="number2" class="search" placeholder="42">
		    </div>
		   	<div class="col-sm-1">
		      <q-icon name="check_circle" color="green" size="25px" style="line-height: 35px" v-if="ifcoberture"/>
		      <q-icon name="highlight_off" color="red" size="25px" style="line-height: 35px" v-else/>
		    </div>
		  </div>
		  <input 
		  	type="button" 
		  	value="VERIFICAR COBERTURA" 
		  	class="button button-search" 
		  	@click="evalAddress()">
		</div>

		<img src="statics/cards2.png">
		<div class="" style="font-family: Muli">
			Paga tu pedido en línea de forma segura
		</div>

		<!--==================== MODAL  =============-->
		<q-modal v-model="opened" :content-css="{minWidth: '80vw'}">
			<q-modal-layout>
				<q-toolbar slot="header">
					<q-btn
		        flat
		        round
		        dense
		        v-close-overlay
		        icon="close"
		      />
	      	<q-toolbar-title>
	        	Tiendas disponibles
	      	</q-toolbar-title>
				</q-toolbar>
				<div class="layout-padding">
					<div class="row">
						<div class="col-md-3">
							<pre>{{areas}}</pre>
						</div>
						<div class="col-md-9">
							<gmap-map
					      :center="addresslatLng"
					      :zoom="15"
					      style="width:100%;  height: 550px;"
					    	>
		      			<gmap-marker
				        :key="index"
				        v-for="(m, index) in markers"
				        :label='m.label'
				        :position="m.position"
				        :icon='m.icon'
				        :clickable="true"
				        @click="center=m.position"
				      ></gmap-marker>
		    			</gmap-map>
						</div>
					</div>
					
				</div>
			</q-modal-layout>
		</q-modal>
		<!--================ MODAL ==============-->

	</div>
</template>

<script>

	import {helper} from '@imagina/qhelper/_plugins/helper'
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import mapAreaService from 'src/services/maparea'

	export default {
		data(){
			return{
				opened: false,
				areas: [],
				areasValidated: [],
				ifcoberture: false,
				typeOrder: false,
				typesStreet:
				[
					{name : 'Calle'},
					{name : 'Carrera'},
					{name : 'Avenida'},
					{name : 'Diagonal'},
					{name : 'Transversal'},
					{name : 'Vía'},
				],
				addresslatLng: {lat:0, lng: 0},
				markers: [],
				typeStreet: 'Carrera',
				street: '',
				number1: '',
				number2: '',
				map: false,
				//
			}
		},
		computed: {
			fullAddress(){
				return this.typeStreet+' '+this.street+' Numero+'+this.number1+' '+this.number2
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getMapAreas()
				this.initCheckbox()
				this.initAddress()
				this.initifcoberture()
			});
    },
		methods: {
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
      	helper.storage.set('areasValidated',{})
      	helper.storage.set('ifcoberture', false)
      	this.ifcoberture = false

      	this.areasValidated = [] 

        mapAreaService.latLng(this.fullAddress)
        .then(response=>{
        	
     			this.addresslatLng = response.coordenades
     			helper.storage.set('addresslatLng', response.result)
     			helper.storage.set('address', {
     				typeStreet: this.typeStreet,
						street: this.street,
						number1: this.number1,
						number2: this.number2,
     			})
     			this.markers = [
     				{ 
     					position: { "lat": 4.6365976, "lng": -74.1658186 },
     					icon: 'statics/favicon.png'
     				}, 
     				{ 
     					position: response.coordenades,
     				}
     			]
        	var areasValidated = []
          this.areas.forEach( area => {
            let poligon = new google.maps.Polygon({paths: area.polygon})
            var those = this;

            setTimeout(function() {

	    				let result = google.maps.geometry.poly.containsLocation(response.coordenades, poligon)
	    				if (result) {
	    					areasValidated.push({area: area.id, coberture: result});
	    					helper.storage.set('areasValidated',{area: area, coberture: result})
	    					helper.storage.set('ifcoberture', result)
	    					console.log(result)
	    					those.ifcoberture = result

	    					those.areasValidated = areasValidated
	    				}
    				}, 1000)
          })
          if (this.typeOrder) {
      			console.log('show disponibilidad de envio')
      		}else{
      			this.opened = true
					}
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      initifcoberture(){
      	helper.storage.get.item('ifcoberture').then(res => {
          if (res !== null) {
            this.ifcoberture = res
          }
        })
      },
      initCheckbox(){
      	helper.storage.get.item('typeOrder').then(res => {
          if (res !== null) {
            this.typeOrder = res
          }
        })
      },
      initAddress(){
      	helper.storage.get.item('address').then(res => {
          if (res !== null) {
          	this.typeStreet = res.typeStreet
						this.street = res.street
						this.number1 = res.number1
						this.number2 = res.number2
          }
        })
      },
      initAreasValidated(){
      	helper.storage.get.item('areasValidated').then(res => {
          if (res !== null) {
          	this.areasValidated = res
          	this.coberture = true
          }
        })
      },
      handleChangeCheckbox(){
      	helper.storage.set('typeOrder', this.typeOrder)
      }
      //
		}
	}
</script>