<template>
	<section class="container-fluid">
		<!--== START BREADCRUMB ==-->
		<breadcrumb-component name="Pide en linea" image="statics/header-pide.jpg"></breadcrumb-component>
		<!--== END BREADCRUMB ==-->
		<div class="container-section">	
			<div class="row">
				<!--== START CATETGORIES MENU ==-->
				<div class="col-md-3">
					<div class="label bg-deep-orange-7 text-white full-width">
						<span>· Nuestro Menú ·</span>
					</div>
					<q-list sublabel-lines id="pide-menu">
						<menu-categories-component parent="0" @category="getProducts" group="root"/>
					</q-list>
				</div>
				<!--== END CATETGORIES MENU ==-->
				<!--== START GRIDS PRODUCTS ==-->
				<div class="container-section--p2" v-if="!showProduct">	
					<div class="row" v-if="products.length">
						<div class="col-4" align="center" v-for="product in products" :key="product.id">
							<div class="card-product-img">
								<img src="statics/logo.png" alt="" class="responsive m-w-100">
								<q-btn type="submit" label="Pedir" color="red" sence class="q-my-md round-borders-0" @click="productSelected(product)"/>
							</div>
							<div class="q-mt-lg">
								<span class="q-display-1 color-baked-title">{{product.name}}</span>
								<p>${{product.price}}</p>
							</div>
						</div>
					</div>
					<div class="row" v-else align="center">
						<div class="col-md-12">
							<span class="q-display-1 color-baked-title">No se encontraron resultados para esta categoría.</span>
						</div>	
					</div>
				</div>
				<!--== START SHOW PRODUCTS ==-->
				<showComponent v-else :products="products" :product="selected"/>
				<!--== END SHOW PRODUCTS ==-->
				<!--== END GRIDS PRODUCTS ==-->
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	//services
	import productService from 'src/services/products';

	//components
	import showComponent from 'src/components/icommerce/show'
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
	import menuCategoriesComponent from 'src/components/Menucategories';

	export default{
		components:{
			menuCategoriesComponent,
			breadcrumbComponent,
			showComponent,
		},
		data(){
			return{
				products: [],
				selected: {
					product:[]
				},
				showProduct: false
			}
		},
		mounted(){
			this.getProducts(2)
		},
		methods:{
			getProducts(id){
				let filter = {"categories":[id]}
				productService.index(
					filter,'', '', '', '', true
					)
				.then(response =>{
					this.products = response.data
					this.showProduct = false
				})
			},
			productSelected(product){
				this.showProduct = true
				this.selected.product = product
			},
		}
	}
</script>

<style lang="stylus">
	.card-product-img
	    width 100%
	    border 1px solid #DDDDDD
	    border-radius 20px
	    display table
	    padding 1rem
	    img
	        vertical-align middle
	        width 100%
	        max-height 100%
	        display table-cell

	.border-top
	    border-top 1px solid #c4c4c4

	.q-list
	    border none

	#pide-menu
	    .q-collapsible-toggle-icon
	        display none
	    .pide-menu__subcategory
	        .q-item
	            padding-left 0px

	.q-collapsible
	    border-bottom 1px dashed gray

	.q-collapsible-inner
	    .q-item-label
	        color #7E6C6B
	    & > .q-item
	        .q-item-label
	            font-size 1.865rem

	.q-collapsible-sub-item
	    .q-collapsible
	        border none
	    .q-item-label
	        display inline-block
	        &:hover
	            text-decoration underline

	.q-select
	    &.q-select--app
	        background-color transparent
	        box-shadow none
	        border-bottom 1px solid #723D3D !important
	        font-size 22px
	        color #723D3D
	        &::before
	            content none

	.div-select__product
	    display inline-block
	    .q-select
	        width 270px
	        max-width 100%

	.div-select__label
	    font-size 18px
	    font-weight inherit
	    color #6B5B5A

	.q-select.q-select--app .q-if-label, 
		.q-select.q-select--app .q-input-target, 
		.q-select.q-select--app .q-if-inner,
		.q-item-label
	    padding-left 0px !important
	    color #723D3D !important
</style>
