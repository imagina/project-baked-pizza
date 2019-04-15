<template>
	<section class="container-fluid">
		<breadcrumb name="Orden" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">
			<orderComponent :order="order"/>
		</div>
		<section-carting-app></section-carting-app> <!--== COMPONENTS BANNER CATERGIN INFO ==-->
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
						}
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	
</style>