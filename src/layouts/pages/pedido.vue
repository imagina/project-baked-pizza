<template>
	<div>
		<breadcrumbComponent 
			:name="name"
			:image="image"/>
		<productsComponent/>
    <section-carting-app/>
	</div>
</template>

<script>
	// Components
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
	import productsComponent from 'src/components/icommerce/cart/products'

	export default{
		components:{
			breadcrumbComponent,
			productsComponent,
		},
		data(){
			return{
				name:'Listado de Pedidos',
				image:'statics/header-pide.jpg'
			}
		}
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
