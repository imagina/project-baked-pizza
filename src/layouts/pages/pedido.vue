<template>
	<div>
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Listado de Pedidos" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->

		<div class="bg-white">
			<productsComponent/>
		</div>

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

	.bg-color-three
		color #723D3D

	@media only screen and (max-width: 600px) {
		.cart-content .button-pedido{
			width: 100%;
		}
	}
</style>
