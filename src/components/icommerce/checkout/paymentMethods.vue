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
					<q-radio v-model="paymentMethod" :val="shippingMethod.id" :label="shippingMethod.title" />	
				</div>
			</div>
		</q-card>

		<details-component /> <!--== START - DETAILS ==-->
   	<q-inner-loading :visible="visible" style="background: #f4f4f4;">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
	</div>
</template>

<script type="text/javascript">
	import http from "axios"

	export default {
		components:{
			detailsComponent
		},
		data(){
			return {
				visible: false,
				shipMethods: [],
				paymentMethod: '',
			}
		},
		mounted(){
			
		},
		methods:{

		}
	}
</script>