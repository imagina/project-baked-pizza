<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1">
		<q-card class="no-shadow" v-if="userData">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 q-py-lg">
					<moduleaddressesComponent :type="'shipping'"/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 q-py-lg">
					<q-checkbox v-model="billingShippingaddress" :val="true" label="La direcciónn de facturación es la misma que la de envio" @input="setBillingShippingaddress"/>
				</div>
			</div>
			<div class="row" v-if="!billingShippingaddress">
				<div class="col-md-12 q-py-lg">
					<moduleaddressesComponent :type="'billing'"/>
				</div>
			</div>
		</q-card>
	</div>
</template>

<script>
	import billingaddressComponent from 'src/components/icommerce/checkout/billingaddressComponent'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import profileService from 'src/services/profile'
	import locationsService from 'src/services/locations';

	import moduleaddressesComponent from 'src/components/icommerce/address/index'
	import { mapState } from 'vuex';

	export default {
		props: ['parentData'],
		components:{
			billingaddressComponent,
			moduleaddressesComponent,
		},
		data(){
			return {
				userData: true,
				billingShippingaddress: true,
			}
		},
		computed: {
			...mapState({
				defaultAddress 			: state => state.address.defaultAddress
			})
		},
		created(){
		  this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
		},
		methods:{
			setData(){
				helper.storage.get.item('userData').then(response => {
					this.userData = response
				})
			},
			setBillingShippingaddress(val){
				this.$store.dispatch('address/setBillingShippingaddress',val)
			}
		}
	}
</script>