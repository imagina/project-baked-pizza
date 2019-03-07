<template>

		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de Envío</div>
				</div>
			</div>
			<div class="q-py-lg row">
				<div v-if="priceMethods.length > 0" class="col-xs-12 col-sm-12 col-md-12 q-py-xs">
					<div v-for="(item, index) of priceMethods" :key="index">
						<div v-if="item.calculations.status === 'success'" class="row">
							<div class="col-md-6">
								<q-radio v-model="shippingMethodSelected" :val="item.name" :label="item.title" />
							</div>
							<div class="col-md-6 text-right">
								$ {{ item.calculations.price }}
							</div>
						</div>
					</div>
				</div>
				<div v-else class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(item, index) in shippingMethods" :key="index">
					<div class="q-title">{{ item.title }}</div>			
				</div>				
			</div>
		</q-card>

</template>

<script type="text/javascript">
	import shippingMethodsService from 'src/services/shipping-methods'

	import EventBus from 'src/utils/event-bus';

	export default {
		props: ['parentData', 'sippingprice'],
		data(){
			return {
				shippingMethods: [],
				shippingMethod: '',
				priceMethods: [],
				shippingMethodSelected: '',
			}
		},
		mounted(){

			this.getshippingMethods()

			EventBus.$on('calculateshipping', (data) => {
				this.priceMethods = data
				if(this.priceMethods.length === 0){
					this.shippingMethodSelected = ''
				}
			})
		},
		methods:{
			getshippingMethods(){
				this.visible = true
				shippingMethodsService.index()
				.then(response=>{
					this.visible = false
					this.shippingMethods = response.data
				})
			}
		}
	}
</script>

<style lang="stylus">

	.item{
		border-top: 1px solid #8080804d;
    	padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
