<template>
	<section class="container-fluid">
		<breadcrumb-component name="Pide en linea" image="statics/header-pide.jpg"></breadcrumb-component>
		<div class="container-section">
			<div class="row" v-if="validaddress">
				<div class="col-xs-12 col-sm-12 col-md-3">
					<div class="label bg-deep-orange-7 text-white full-width title-menu">
						<span>· Nuestro Menú ·</span>
					</div>
					<q-list sublabel-lines id="pide-menu">
						<menuCategoriesComponent parent="0" @category="getProducts" group="root"/>
					</q-list>
				</div>
				<div class="col-md-9" v-if="!showProduct">
					<div class="row grid-products" v-if="products.length">
						<div class="col-xs-12 col-sm-12 col-md-4" align="center" v-for="product in products" :key="product.id">
							<div class="card-product-img">
								<img :src="'statics/' + product.options.image" alt="" class="responsive m-w-100">
								<q-btn type="submit" label="Pedir" color="red" sence class="q-my-md round-borders-0 btn-add-card" @click="productSelected(product)"/>
							</div>
							<div class="q-mt-lg">
								<span class="q-display-1 color-baked-title">{{product.name}}</span>
								<p class="baked-price">${{product.price}}</p>
							</div>
						</div>
					</div>
					<div class="row" v-else align="center">
						<div class="col-md-12">
							<span class="q-display-1 color-baked-title">No se encontraron resultados para esta categoría.</span>
						</div>
					</div>
					<q-inner-loading :visible="visible">
			      <q-spinner size="50px" color="primary"></q-spinner>
			    </q-inner-loading>
				</div>
				<showComponent v-else :products="products" :product="selected"/>
			</div>
			<div class="row" v-else align="center">
				<div class="col-md-12">
					<span class="q-display-1 color-baked-title">Comprobando dirección.</span>
				</div>
			</div>
		</div>

    <q-modal
      v-model="modalvalidateAddres"
      no-esc-dismiss
      no-backdrop-dismiss>
      <q-modal-layout style="background: #cfcfcf9c">
        <div class="q-mx-lg">
          <validateaddressComponent
            :whitLabels="false"
            @addressValidated="modalvalidateAddres = false"/>
        </div>
      </q-modal-layout>
    </q-modal>

	</section>
</template>

<script>
	//services
	import productService from 'src/services/products';
	import categoryService from 'src/services/categories';

	//components
	import showComponent from 'src/components/icommerce/show'
	import breadcrumbComponent from 'src/components/pages/sections/breadcrumb'
  import menuCategoriesComponent from 'src/components/Menucategories';
  import validateaddressComponent from 'src/components/icommerce/validateAddress'

	import store from 'src/store/cart/index'
	import { mapState } from 'vuex'
	import {alert} from '@imagina/qhelper/_plugins/alert'
  import EventBus from 'src/utils/event-bus';
  import {helper} from '@imagina/qhelper/_plugins/helper'

	export default{
		components:{
			menuCategoriesComponent,
			breadcrumbComponent,
      showComponent,
      validateaddressComponent,
		},
		store,
		data(){
			return{
				visible: false,
				products: [],
				selected: {
					product:[]
				},
        showProduct: false,
        modalvalidateAddres: false,
			}
		},
		mounted(){
			/*this.detecteUrl(this.$route.params.slug)
			EventBus.$on('categorySlug', (data) => {
				this.categorySlug(data)
      })
      this.isAddressValidate()*/
		},
		methods:{
      isAddressValidate(){
				helper.storage.get.item('dataAddress').then(res => {
          if (res == null) {
            console.log('No tiene  una direccion validada')
            this.modalvalidateAddres = true
          }
        })
			},
			getProducts(id = '',showProduct = false){
				this.visible = true
				let filter = ''
				if (id !== '') {
					filter = {"categories":[id]}
				}
				productService.index(
					filter,'', '', '', '', true
					)
				.then(response =>{
					this.products 		= response.data
					this.showProduct 	= showProduct
					this.visible		= false
				})
			},
			productSelected(product){
				this.showProduct 		= true
				this.selected.product 	= product
				this.$router.push({ name: 'pide-en-linea/product' , params: { slug : product.slug } })
			},
			productSlug(slug){
				this.visible = true
				let filter = {slug: slug}
				productService.show(' ',filter)
				.then(response =>{
					this.getProducts('',true)
					this.showProduct 		= true
					this.selected.product 	= response.data
					this.visible = false
				})
			},
			categorySlug(slug = ''){
				this.visible = true
				categoryService.index({slug: slug})
				.then(response =>{
					let id = (response.data.length > 0) ? response.data[0].id : ''
					this.getProducts(id)
				})
			},
			detecteUrl(slug){
				var route = this.$route
				if (route.name === 'pide-en-linea/category' || route.name === 'pide-en-linea') {
					this.categorySlug(slug)
				} else if(route.name === 'pide-en-linea/product') {
					this.productSlug(slug)
				}
			}
		},
		computed: {
		...mapState(['domicile','validaddress'])
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
		position relative
	    img
	        vertical-align middle
	        width 100%
	        max-height 100%
	        display table-cell

	.card-product-img
		position relative
		text-align center

	.card-product-img
		.btn-add-card
			position absolute
			left 50%
			bottom -33px
			transform translate(-50%)
			-webkit-transform translate(-50%)
			&:hover
				background-color #ff8c00!important


	.grid-products
		.color-baked-title
			color #723d3d!important

	.baked-price
		color #ec3800!important
		font-weight 600

	.title-menu
		border-radius 15px
		span
			padding 5px 0 5px 0


	.product-type-name
		margin-bottom 0px!important
		margin-top -7px
		color #ff8c00
		font-weight 600
	
	.product-type-description
		color #723d3d
		font-size 1rem
	
	.product-option-name
		margin-top .6rem
		

	.product-type-grid .radio {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	}

	.imgradio
		cursor: pointer;
		display inline-block;
		-webkit-filter: grayscale(100%)
	
	.checkedImg
		-webkit-filter: grayscale(0%)
	
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

	@media only screen and (max-width: 600px) {
		.grid-products{
			margin-top: 20px;
		}

		.im-mt-1{
			margin-top: 1rem;
		}

		.porduct-option-content{
			width: 100%!important;
		}

		.input-count-product{
			width: 100%!important;
		}
	}
</style>
