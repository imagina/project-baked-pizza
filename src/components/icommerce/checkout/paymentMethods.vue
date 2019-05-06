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
					<div class="col-md-12 q-py-xs" v-for="(shippingMethod, index) in shipMethods" :key="index">
						<p>
							<q-radio v-model="paymentmethodselected" :val="shippingMethod" />
							{{shippingMethod.title}}
						</p>
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
	import deliverymethodsComponent from 'src/components/icommerce/checkout/deliveryMethods'
	import detailsComponent from 'src/components/icommerce/checkout/detailsComponent'
	

	import { mapState } from 'vuex'
	import paymentMethods from 'src/services/payment-methods'


	export default {

		data(){
			return {
				visible: false,
				shipMethods: [],
				paymentMethod: '',
				paymentmethodselected: [],
			}
		},
		computed: {
			...mapState({
					payment_method_selected: state => state.paymentmethod.payment_method_selected
			})
		},
		mounted(){
			this.getshippingMethods()
		},
		methods:{
			getshippingMethods(){
				this.visible = true

				paymentMethods.index()
				.then(response=>{
					this.visible = false
					this.shipMethods = response.data
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