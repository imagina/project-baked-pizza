<template>
	<section class="container-fluid">
		<breadcrumb name="Pide en linea" image="statics/header-pide.jpg"></breadcrumb>
		<div class="container-section">		
			<div class="row">
				<div class="col-md-3">
					<div class="label bg-deep-orange-7 text-white full-width">
						<span>· Nuestro Menú ·</span>
					</div>
					<q-list sublabel-lines id="pide-menu">
						<menucategories-component parent="0" @category="getProductsByCategory" group="root"/>
					</q-list>
				</div>
				<div class="col-md-9">

					<!-- Start Show product-->
					<div class="container-section--p2" v-if="showProduct">		
						<div class="row">
							<div class="col-md-12 div-select text-right border-top">
								<span class="div-select__label">Seleccione un producto</span>
								<div class="div-select__product">
	    							<q-select v-model="product" float-label="Seleccione un producto" class="q-select--app" radio :options="listProducto" @input="updateaSelected"/>
								</div>
							</div>
						</div>

						<div class="row q-mt-lg">
							<div class="col-5">
								<div class="card-product-img">
									<img src="statics/pizza.png" alt="" class="responsive m-w-100">
								</div>
							</div>
							<div class="col">
								<span class="q-display-1 color-baked-title">{{productSelected.name}}</span>
								<p>{{productSelected.description}}</p>
								<p>${{productSelected.price}}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-8">
								<div class="row">
									<div class="col-6 col-md-4">
										<div class="col-count-product">
				    					<span>Cantidad:</span>
				    					<input type="number" class="input-count-product" float-label="Seleccione un producto" value="1" v-model="quantiy" style="width: 80px">
										</div>
									</div>
									<div class="col-6 col-md-8">
										<div class="col-count-product">
											<div class="div-select__product" style="width: 200px">
					    					</div>
										</div>
									</div>
									<div class="col">
										<div class="col-count-product">
											<div class="div-select__product">
				    							<options-component :product="productSelected.id"/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col">
								<div class="row">
									<div class="col-12 col-count-product">
			    						<span>Valor Total:</span>
				    					<input type="text" class="input-count-product" value="$10.900" readonly>
				    				</div>
									<div class="col-12">
										<div class="col-count-product text-right">
											<q-btn type="submit" label="AÑADIR" size="lg" color="red" sence class="q-my-md round-borders-0" @click="addCart()"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Show product-->

					<div class="container-section--p2" v-else>		
						<div class="row" v-if="products.length ">
							<div class="col-4" align="center" v-for="product in products" :key="product.id">
								<div class="card-product-img">
									<img src="statics/pizza.png" alt="" class="responsive m-w-100">
									<q-btn type="submit" label="Pedir" color="red" sence class="q-my-md round-borders-0" @click="show(product)"/>
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
					<q-inner-loading :visible="visible" style="background-color: #f4f4f4c7">
      				<q-spinner size="50px" color="primary"></q-spinner>
    				</q-inner-loading>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import {array} from "@imagina/qhelper/_plugins/array";
	import categoryService from 'src/services/categories';
	import productService from 'src/services/products';
	import breadcrumb from 'src/components/pages/sections/breadcrumb'
	import menuCategories from 'src/components/Menucategories';

	import productOptionService from 'src/services/product-option';
	import productOptionValuesService from 'src/services/product-option-values';

	import modaloptions from 'src/components/pages/menu/modal';

	import optionsComponent from 'src/components/pages/menu/options';
	import {alert} from '@imagina/qhelper/_plugins/alert'

	export default{
		components:{
			'menucategories-component': menuCategories,
			'modaloptions-component': modaloptions,
			'options-component': optionsComponent,
			breadcrumb
		},
		data(){
			return{
				visible: false,
				opened: false,
				product: '',
				quantiy: 1,
				products: [],
				selectAdicionales: [],
        bebidas: [],
				adicionales: [],
				listProducto:[],
				categories:[],
				subcategory: [],
				showProduct: false,
				productSelected: [],
			}
		},
		mounted(){
			//this.getProductsByCategory(4)
		},
		methods:{
			updateaSelected(newVal){
				this.productSelected = newVal
			},
			show(product){
				this.showProduct = true
				this.productSelected = product
				this.product = product
			},
			select(dataArray) {
				let response = []
				dataArray.forEach((item) => {
					let labelTitle = item.name ? item.name :'default'
					response.push({
						label: labelTitle,
						value: item
					});
				})
				return response
			},
			getProductsByCategory(id){
				this.visible = true
				this.showProduct = false
				let filterBackend = {}
        filterBackend["categories"] = [id];
				productService.index(filterBackend,'', '', '', '', true)
				.then(response =>{
					this.visible = false
					this.listProducto = this.select(response.data)
					this.products = response.data
				})
			},
	  	addCart: function () {
	  		let item = []
	  		item['product'] = this.product;
	  		item['quantity_cart'] = this.quantiy;
	      	this.$store.dispatch("add_item", item)
	      	alert.success('Producto agregado')
	    },
		}
	}
</script>

<style>
	.card-product-img
	{
		width: 100%;
		border: 1px solid #DDDDDD;
		border-radius: 20px;
		display: table;
		padding: 1rem;
	}
	.card-product-img img
	{
		vertical-align: middle;
		width: 100%;
		max-height: 100%;
		display: table-cell;
	}
	.border-top{
		border-top: 1px solid #c4c4c4;
	}
	.q-list
	{
		border: none;
	}
	#pide-menu .q-collapsible-toggle-icon 
	{
		display: none
	}
	#pide-menu .pide-menu__subcategory .q-item
	{
		padding-left: 0px;
	}
	.q-collapsible
	{
		border-bottom: 1px dashed gray;
	}
	.q-collapsible-inner .q-item-label
	{
		color: #7E6C6B
	}
	.q-collapsible-inner > .q-item  .q-item-label
	{
    	font-size: 1.865rem;
	}
	.q-collapsible-sub-item .q-collapsible
	{
		border: none;
	}
	.q-collapsible-sub-item .q-item-label
	{
    	display: inline-block;
	}
	.q-collapsible-sub-item .q-item-label:hover
	{
    	text-decoration: underline;
	}
	.q-select.q-select--app{
		background-color: transparent;
    	box-shadow: none;
    	border-bottom: 1px solid #723D3D !important;
    	font-size: 22px;
    	color: #723D3D;
	}
	.div-select__product
	{
		display: inline-block;
	}
	.div-select__label
	{
		font-size: 18px;
		font-weight: inherit;
		color: #6B5B5A;
	}
	.div-select__product .q-select
	{
		width: 270px;
		max-width: 100%;
	}
	.q-select.q-select--app::before
	{
		content: none
	}
	.q-select.q-select--app .q-if-label, 
	.q-select.q-select--app .q-input-target, 
	.q-select.q-select--app .q-if-inner,
	.q-item-label
	{
		padding-left: 0px !important;
		color: #723D3D !important
	}
</style>
