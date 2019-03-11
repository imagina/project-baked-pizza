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
		    <div class="col-sm-2">
		      <input type="text" v-model="street" class="search"> 
		    </div>
		    <div class="col-sm-1">
		      <span>#</span>
		    </div>
		    <div class="col-sm-3">
		      <input type="text" v-model="number1" class="search">
		    </div>
		    <div class="col-sm-3">
		      <input type="text" v-model="number2" class="search">
		    </div>
		  </div>
		  <input 
		  	type="button" 
		  	value="VERIFICAR COBERTURA" 
		  	class="button button-search" 
		  	@click="evalAddress()">
		</div>

		<div class="row q-my-md hidden" v-if="areasValidated.length">
			<div class="col-sm-12" lass="q-my-xl" style="font-family: Muli">
				Tiendas Disponibles
				<br><br>
			</div>
			<div class="col-sm-12">
				<select class="search">
			    <option 
			      v-for="(baked, index) in areasValidated" 
			      :key="index">
			      {{baked.area.price}}
			    </option>
			  </select>
			</div>
		</div>



		<img src="statics/cards2.png">
		<div class="" style="font-family: Muli">
			Paga tu pedido en línea de forma segura
		</div>
		

	</div>
</template>

<script>

	import {alert} from '@imagina/qhelper/_plugins/alert'
	import mapAreaService from 'src/services/maparea'

	export default {
		data(){
			return{
				visible: false,
				areas: [],
				areasValidated: false,
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
				typeStreet: '',
				street: '',
				number1: '',
				number2: '',
			}
			//
		},
		computed: {
			fullAddress(){
				return this.typeStreet+' '+this.street+' '+this.number1+' '+this.number2
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getMapAreas()	
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

        mapAreaService.latLng(this.fullAddress)
        .then(response=>{
     	
        	let areasValidated = []
          this.areas.forEach( area => {

            let poligon = new google.maps.Polygon({paths: area.polygon})
            setTimeout(function() {
    				let result = google.maps.geometry.poly.containsLocation(response, poligon)
    				if (result) {
    					areasValidated.push({area: area, coberture: result});	
    				}
    				}, 1000)
    				
          })
          this.areasValidated = areasValidated
          
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      //
		}

	}
</script>