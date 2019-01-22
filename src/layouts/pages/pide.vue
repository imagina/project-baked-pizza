<template>
	<div>

		<div class="row ">
			<div class="col-md-12">
				<img src="/statics/header-pide.jpg" width="100%">
			</div>		
		</div>

		<div class="row container">
			<div class="col-md-2 q-py-xl">
				<span class="label bg-deep-orange-7 text-white q-mb-md">· Nuestro Menú ·</span>

				<div v-for="category in categories" :key="category.id">
					<p class="category" @click="selectCategory(category)">{{category.title}}</p>
				</div>
				
			</div>
			<div class="col-md-10 q-my-xl border-top">
				
				<div class="row">
					<div class="col-6">
						<span>Seleccione el producto: </span>
					</div>
					<div class="col-6">
						<q-select
				      	v-model="product"
				      	:options="products"
    					/>
					</div>
				</div>

				<div class="row">
					<div class="col-9">{{products}}</div>
					<div class="col-3">
						<p class="">Pizza Napolitana</p>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import {array} from "@imagina/qhelper/_plugins/array";
	import categoryService from 'src/services/categories';
	import productService from 'src/services/products';

	export default{
		data(){
			return{
				product:'',
				products: [],
				listProducto:[],
				categories:[]
			}
		},
		mounted(){
			this.getCategories()
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
			getCategories: function () {
				this.loading = true

				categoryService.index({childrens: true},'', '', '', '', true)
				.then(response =>{
					this.categories = response.data
					console.log(response.data)
					this.loading = false
				})
			},
			selectCategory: function (category){
				this.productsByCategory(category.id)
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
	.border-top{
		border-top: 1px solid #c4c4c4;
	}

	.label {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-width: 10px;
    border-radius: 2px;
    padding: .3rem .7rem;
    line-height: 1;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    width: 90%;
    justify-content: center;
    font-size: 2em;
    border-radius: 5px;
	}

	.category{
	    border-bottom: 3px dotted #723D3D;
	    color: #723D3D;
	    font-size: 1.8em;
	    line-height: 60px;
	    margin-bottom: 0;
	    margin-right: 25px;
	    list-style-type: none;
	    transition: .4s all;

	    cursor: pointer;
	}


</style>
