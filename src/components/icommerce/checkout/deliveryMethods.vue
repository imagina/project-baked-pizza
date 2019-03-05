<template>

		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Métodos de Envío</div>
				</div>
			</div>
			<div class="q-py-lg row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-py-xs" v-for="(item, index) in shippingMethods" :key="index">
					<q-radio v-model="parentData.shippingMethod_id" :val="item.id" :label="item.title" />				
				</div>				
			</div>
			<div class="q-py-lg row">
				<div class="col-z-xs-12 col-sm-12 col-md-12">
					{{ sippingprice }}
					<div v-if="priceMethods.length > 0">
						<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg text-center">
							Costo de Envio
						</div>
						<div v-for="(item, index) of priceMethods" :key="index">
							<div v-if="item.calculations.status === 'success'" class="row item">
								<div class="col-md-6">
									<div class="q-title">{{ item.title }}</div>
								</div>
								<div class="col-md-6 text-right">
									$ {{ item.calculations.price }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</q-card>

</template>

<script type="text/javascript">
	import shippingMethodsService from 'src/services/shipping-methods'

	import EventBus from 'src/utils/event-bus';

	export default {
		props: ['parentData'],
		data(){
			return {
				shippingMethods: [],
				shippingMethod: '',
				priceMethods: [],
			}
		},
		props: ['sippingprice'],
		mounted(){
			this.getshippingMethods()

			EventBus.$on('calculateshipping', (data) => {
				this.priceMethods = data
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
