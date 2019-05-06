<template>
	<q-card>
		<q-card-title>
			<p class="color-baked-title">
				<b>
					<q-icon name="motorcycle"/>
					Métodos de Envío
				</b>
			</p>
		</q-card-title>
		<q-card-main>
			<div class="row">
				<div class="col-md-12">
					<q-item tag="label" v-for="(store, index) in shippingMethods" :key="index">
						<q-item-side>
							<p>
								<q-radio v-model="shippingMethod" :val="item.id"/>
								{{item.id}} <b>{{item.id}}</b> {{item.id}}
							</p>
						</q-item-side>
					</q-item>
				</div>
				<div class="col-md-12">
					 <p>
						 <b>{{addrees.typeOrder ? 'Domicilio' : 'Recoger en tienda'}}</b>
					 </p>
					 <p>
						 {{priceShipping}}
					 </p>
				</div>
			</div>
		</q-card-main>
	</q-card>
</template>

<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'
  export default {
    data(){
      return{
				shippingMethods: [],
				shippingMethod: '',
        addrees:{
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
				if(this.addrees.coverage.price != null){
					return `Costo ${this.addrees.coverage.price}`
				} 
			}
		},
    methods:{
      getAddress(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res !== null) {
						this.addrees = res
          }
        })
      },
    }
  }
</script>