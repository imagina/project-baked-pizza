<template>
  <q-card>
    <q-card-title>
      <p class="color-baked-title">
        <b>
          <q-icon name="list_alt"/>
          Dirección de Facturación
        </b>
      </p>
    </q-card-title>
    <q-card-main>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
						<div class="col-xs-12 q-px-sm">
              <p>
              <q-select
                v-model="addrees.form.typeStreet"
                float-label="Tipo"
                :options="typesStreet"
                class="no-shadow"/>
              </p>
            </div>
            <div class="col-xs-12 q-px-sm">
              <p>
              <q-input 
                type="text" 
                v-model="addrees.form.street"  
                float-label="Calle, Carrera, Avenida" 
                class="no-shadow"/>
              </p>
            </div>
            <div class="col-xs-12 q-px-sm">
              <p>
              <q-input 
                type="text" 
                v-model="addrees.form.number1"  
                float-label="Numero" 
                class="no-shadow"/>
              </p>
            </div>
            <div class="col-xs-12 q-px-sm">
              <p>
              <q-input 
                type="text" 
                v-model="addrees.form.number2"  
                float-label="Con" 
                class="no-shadow"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'
  export default {
    props:{
      addrees:{
        type:Object,
        default:{
          typeOrder: false,
          form: {
            typeStreet: '',
            street: '',
            number1: '',
            number2: ''
          },
          addresslatLng: {
            lat: 0,
            lng: 0
          },
          coverage: {
            status: false,
            price: '',
            area: 0
          }
        }
      }
    },
    data(){
      return{
        typesStreet:
				[
					{label : 'Calle', value : 'Calle'},
					{label : 'Carrera', value : 'Carrera'},
					{label : 'Avenida', value : 'Avenida'},
					{label : 'Diagonal', value : 'Diagonal'},
					{label : 'Transversal', value : 'Transversal'},
					{label : 'Vía', value : 'Vía'},
				],
      }
    },
    mounted(){
      this.$nextTick(() => {
				
			})
    },
    methods:{

    }
  }
</script>