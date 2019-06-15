<template>
  <div class="row">
		<div class="col-xs-12 q-px-sm q-mb-md border-botton">
			<p> <q-icon name="list_alt"/> Dirección de Facturación</p>
		</div>

    <div class="col-md-12">
      <div class="row items-center gutter-xs">
        <div class="col-xs-3" style="padding-top: 0;">
          <q-select
            class="q-py-none"
            v-model="address.form.typeStreet"
            :options="typesStreet"
            :clearable="false"/>
        </div>
        <div class="col-xs-3">
          <p>
          <q-input
            type="text" 
            v-model="address.form.street"  />
          </p>
        </div>
        
        <div class="col-xs-1 q-px-sm text-center">
          <p>#</p>
        </div>

        <div class="col-xs-2">
          <p>
          <q-input
            type="text" 
            v-model="address.form.number1"
            />
          </p>
        </div>

        <div class="col-xs-1 q-px-sm text-center">
          <p>-</p>
        </div>

        <div class="col-xs-2">
          <p>
          <q-input
            type="text" 
            v-model="address.form.number2"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {helper} from '@imagina/qhelper/_plugins/helper'
  export default {
    props:{
      value:{
        type:Object,
        default:()=>{}
      }
    },
    watch:{
      address(val){
        this.value.addressBilling = this.address
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
        address:{
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
    components: {
      Treeselect
    },
    mounted(){
      this.$nextTick(() => {
				this.getAddress()
			})
    },
    methods:{
      getAddress(){
				helper.storage.get.item('dataAddress').then(response => {
          if (response !== null) {
						this.address = response
          }
        })
      },
    }
  }
</script>