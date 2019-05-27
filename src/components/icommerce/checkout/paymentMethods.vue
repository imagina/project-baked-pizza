<template>
	<div>
		<q-card>
			<q-card-title>
				<p class="color-baked-title">
					<b>
						<q-icon name="credit_card"/>
						Método de Pago
					</b>
				</p>
			</q-card-title>
			<q-card-main>
				<div class="row">

					<div 
						class="col-md-12 q-py-xs" 
						v-for="(shippingMethod, index) in payMethods" 
						:key="index">

						<p v-if="delivery.typeOrder == false">
							<span v-if="shippingMethod.title != 'Paypal' && shippingMethod.title != 'Check Money'">
								<q-radio 
									v-model="payment.method" 
									:val="shippingMethod" />
								{{shippingMethod.title}}
							</span>
						</p>
						<p v-else>
							<q-radio
								v-model="payment.method" 
								:val="shippingMethod" />
								{{shippingMethod.title}}
						</p>
					</div>
				</div>
				<div class="row q-ml-lg">
					<div class="col-md-12 q-ml-xs">
						<div v-if="payment.method.title == 'Check Money'">
							<p>
								<q-radio
									val="money"
									v-model="paymentDetail"/>
									Pago en efectivo
							</p>
							<p>
								<q-radio
									val="card"
									v-model="paymentDetail"/>
									Pago con tarjeta (Se enviará Datafono)
								</p>
						</div>
					</div>
				</div>

			</q-card-main>
		</q-card>
		<q-inner-loading :visible="visible">
			<q-spinner size="50px" color="primary"></q-spinner>
		</q-inner-loading>
	</div>
</template>

<script type="text/javascript">
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import deliverymethodsComponent from 'src/components/icommerce/checkout/deliveryMethods'
	import detailsComponent from 'src/components/icommerce/checkout/detailsComponent'
	import { mapState } from 'vuex'
	import paymentMethods from 'src/services/payment-methods'

	export default {
		props:{
			payment:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				visible: false,
				//shipMethods: [],
				paymentMethod: '',
				paymentmethodselected: [],
				delivery:{},
				paymentDetail:'',
				payMethods:[],
			}
		},
		computed: {
			...mapState({
					payment_method_selected: state => state.paymentmethod.payment_method_selected
			}),
			shipMethodsFiltered(){
				return this.shipMethods.map(item=>{
					if(this.typeOrder == false){
						return item.title == ''
					}else{
						return item
					}
				})
			}
		},
		mounted(){
			this.getPaymentMethods()
			this.deliveryMethod()
		},
		methods:{
			deliveryMethod(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res !== null) {
						this.delivery = res
          }
        })
			},
			getPaymentMethods(){
				this.visible = true
				paymentMethods.index()
				.then(response=>{
					this.visible = false
					this.payMethods = response.data
				})
      },
		},
		watch: {
			paymentmethodselected: function(val){
				this.$store.dispatch('paymentmethod/setPaymentMethodSelected',val)
			}
		},
	}
</script>