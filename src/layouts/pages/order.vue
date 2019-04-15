<template>
	<section class="container-fluid">
		<breadcrumb name="Orden" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			<orderComponent :order="order"/>
		</div>
		<section-carting-app></section-carting-app> <!--== COMPONENTS BANNER CATERGIN INFO ==-->
		<q-modal v-model="opened" :content-css="{maxWidth: '80vw', minHeight: '80vh'}">
				<q-modal-layout>
						<q-toolbar slot="header">
						<q-btn
								flat
								round
								dense
								v-close-overlay
								icon="close"
						/>
						<q-toolbar-title>
								PAGO
						</q-toolbar-title>
						</q-toolbar>   
								Qui va la URL
						</q-modal-layout>
		</q-modal>
	</section>
</template>

<script>
	//components
	import orderComponent from 'src/components/icommerce/order/details'
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'

	//Services
	import orderService from 'src/services/order'
	import paymentMethods from 'src/services/payment-methods'

	export default{
		components:{
			breadcrumbComponent,
			orderComponent,
		},
		data() {
			return {
				id	: '',
				order: [],
				opened: false,
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getOrder(this.id)
		},
		methods: {
			getOrder(id){
				orderService.show(id).then(response => {
					this.order = response.data
					this.getPaymentOrder(this.order.payment_code,this.order.id)
				})
			},
			getPaymentOrder(paymentmethod, orderId){
				paymentMethods.orderMethod(paymentmethod,orderId).then(response => {
					if (Object.keys(response.data).length > 0) {
						console.log(response)
						if (response.data.external) {
							window.open(response.data.redirectRoute, '_blank');
						}else{
							this.opened = true
						}
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	
</style>