<template>

		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de Envío</div>
				</div>
			</div>
			<div class="q-py-lg row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(item, index) in shippingMethods" :key="index">
					<q-radio v-model="shippingMethod" :val="item.id" :label="item.title" />				
				</div>				
			</div>
		</q-card>

</template>

<script type="text/javascript">
	import shippingMethodsService from 'src/services/shipping-methods'

	export default {
		data(){
			return {
				shippingMethods: [],
				shippingMethod: '',
			}
		},
		mounted(){
			this.getshippingMethods()
		},
		methods:{
			getshippingMethods(){
				this.visible = true
				shippingMethodsService.index()
				.then(response=>{
					this.visible = false
					this.shippingMethods = response.data
				})
			},
		}
	}
</script>