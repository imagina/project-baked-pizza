<template>
	<div class="row">
  	<div class="col-xs-12 q-px-sm q-mb-md border-botton">
			<p> <q-icon name="motorcycle"/> Metodo de envío</p>
		</div>

		<div class="col-md-12">
			<q-item tag="label" v-for="(store, index) in shippingMethods" :key="index">
				<q-item-side>
					<q-radio v-model="shippingMethod" :val="item.id"/>
					{{item.id}} <b>{{item.id}}</b> {{item.id}}
				</q-item-side>
			</q-item>
		</div>
			<div class="col-md-12">
        <p class="q-display" v-if="address.typeOrder">
					Domicilio
				</p>
				<p v-else>
				Recoger en tienda
				</p>
		</div>
    <div class="col-md-12">
      <p class="q-display">
        {{priceShipping}}
      </p>
    </div>
	</div>
</template>

<script>
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
        this.value.methodShipping = this.address
      }
    },
    data(){
      return{
				shippingMethods: [],
				shippingMethod: '',
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
    mounted(){
      this.$nextTick(() => {
				this.getAddress()
			})
		},
		computed:{
			priceShipping(){
				if(this.address.coverage!= null){
					return `Costo $${this.$n(this.address.coverage.price)}`
				} 
			}
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
