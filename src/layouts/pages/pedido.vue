<template>
	<div>
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Listado de Pedidos" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->
		<productsComponent/>

    <section-carting-app></section-carting-app>
	</div>
</template>

<script>
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
	import productsComponent from 'src/components/icommerce/cart/products'

	export default{
		components:{
			breadcrumbComponent,
			productsComponent,
		},
	}
</script>

<style lang="stylus">
	.bg-white
		background-color #FFFFFF
	
	.color-primary
		color #EB3800
	
	.q-btn-rectangle
		border-radius 0px!important

	@media only screen and (max-width: 600px) {
		.cart-content .button-pedido{
			width: 100%;
		}
	}
</style>
