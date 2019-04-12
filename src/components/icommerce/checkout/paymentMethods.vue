<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1 section-3">
		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de Pago</div>
				</div>
			</div>
			<div class="q-py-lg row">

				<div class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(shippingMethod, index) in shipMethods" :key="index">
					<q-radio v-model="paymentmethodselected" :val="shippingMethod" :label="shippingMethod.title" />				
				</div>				
			</div>
		</q-card>

		<deliverymethods-component :parentData="parentData"/>
		<details-component :parentData="parentData.details"/> <!--== START - DETAILS ==-->
   	<q-inner-loading :visible="visible" style="background: #f4f4f4;">
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
		props: ['parentData'],
		components:{
			detailsComponent,
			deliverymethodsComponent
		},
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