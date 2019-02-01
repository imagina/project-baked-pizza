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
						<menucategories-component parent="0"/>
					</q-list>
				</div>
				<div class="col-md-9 border-top">
					<div class="row">
						<div class="col div-select text-right">
							<span class="div-select__label">Seleccione un producto</span>
							<div class="div-select__product">
    							<q-select v-model="product" float-label="Seleccione un producto" class="q-select--app" radio :options="listProducto" />
							</div>
						</div>
					</div>
					<div class="container-section container-section--p2">					
						<div class="row">
							<div class="col-5">
								<div class="card-product-img">
									<img src="statics/pizza.png" alt="" class="responsive m-w-100">
								</div>
							</div>
							<div class="col">
								<span class="q-display-1 color-baked-title">Pizza Napolitana</span>
								<p>Variedad de vegetales, tomate, cebolla, pimentón, aceitunas, champiñones.</p>
							</div>
						</div>
						<div class="row">
							<div class="col-8">
								<div class="row">
									<div class="col-6 col-md-4">
										<div class="col-count-product">
											
				    					<span>Cantidad:</span>
				    					<input type="number" class="input-count-product" float-label="Seleccione un producto" value="1" readonly style="width: 80px">
										</div>
									</div>
									<div class="col-6 col-md-8">
										<div class="col-count-product">
					    					<span>Adicionales:</span>
											<div class="div-select__product" style="width: 200px">
					    						<q-select type="checkbox" v-model="adicionales" :options="selectAdicionales" radio></q-select>
					    					</div>
										</div>
									</div>
									<div class="col">
										<div class="col-count-product">
											<span>Bebida para el combo:</span>
											<div class="div-select__product">
				    							<q-select v-model="product" float-label="Seleccione un producto" class="q-select--app" :options="listProducto" />
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
						                	<q-btn type="submit" label="AÑADIR" size="lg" color="red" sence class="q-my-md round-borders-0"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
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

	export default{
		components:{
			'menucategories-component': menuCategories,
			breadcrumb
		},
		data(){
			return{
				product:'',
				products: [],
				selectAdicionales: [{
					label: 'Añadir Adicionales',
					value: []
				},{
        		  label: 'queso',
        		  value: 'valor_1'
        		},
        		{
        		  label: 'peperoni',
        		  value: 'valor_2'
        		}],
				adicionales: [],
				listProducto:[{
        		  label: 'pizza 4queseo',
        		  value: 'pizza'
        		},
        		{
        		  label: 'pizza napolitana',
        		  value: 'pizza_napolitana'
        		}],
				categories:[],
				subcategory: []
			}
		},
		mounted(){

		},
		methods:{
				select(dataArray) {
					let response = []
					dataArray.forEach((item) => {
						let labelTitle = item.description ? item.description :'default'
						response.push({
							label: labelTitle,
							value: item.id
						});
					})
					return response
				},

			getSubCategories: function () {

				categoryService.index({parent_id: this.parent_id})
				.then(response =>{
					this.subcategory = response.data
					console.log(response.data)

				})

			},
			selectCategory: function (category){
				this.parent_id = category.id
				//this.productsByCategory(category.id)
				this.getSubCategories()

			},
			productsByCategory: function (id){

				let filterBackend = {}
        
        filterBackend["categories"] = [id];

				productService.index(filterBackend,'', '', '', '', true)
				.then(response =>{
					this.products = this.select(response.data)
				})
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
