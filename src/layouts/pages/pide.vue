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
				<q-list sublabel-lines>
					<menucategories-component parent="0"/>
				</q-list>
			</div>
			<div class="col-md-10 q-my-xl border-top">

			</div>
		</div>

	</div>
</template>

<script>
	import {array} from "@imagina/qhelper/_plugins/array";
	import categoryService from 'src/services/categories';
	import productService from 'src/services/products';

	import menuCategories from 'src/components/Menucategories';

	export default{
		components:{
			'menucategories-component': menuCategories
		},
		data(){
			return{
				parent_id: 0,
				product:'',
				products: [],
				listProducto:[],
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
				this.productsByCategory(category.id)
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
	.border-top{
		border-top: 1px solid #c4c4c4;
	}



</style>
