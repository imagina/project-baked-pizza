<template>
	<div>

		<div class="row ">
			<div class="col-md-12">
				<img src="/statics/header-pide.jpg" width="100%">
			</div>		
		</div>

		<div class="row container">
			<div class="col-md-2 q-py-xl">
				<span class="label bg-deep-orange-7 text-white">· Nuestro Menú ·</span>
				<ul class="categories">
					<li v-for="category in categories" :key="category.id" class="category" @click="selectCategory(category)">{{category.title}}</li>
				</ul>
			</div>
			<div class="col-md-10 q-my-xl border-top">
				Seleccione el producto
			</div>
		</div>

	</div>
</template>

<script>
	import categoryService from 'src/services/categories';

	export default{
		data(){
			return{
				categories:[]
			}
		},
		mounted(){
			this.getCategories()
		},
		methods:{
			getCategories: function () {
				this.loading = true
				categoryService.index({},'', '', '', '', true)
				.then(response =>{
					this.categories = response.data
					this.loading = false
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
	    border-bottom: 3px solid #efefef;
	    font-size: 1.2em;
	    line-height: 60px;
	    margin-bottom: 0;
	    margin-right: 25px;
	    list-style-type: none;
	    transition: .4s all;
	    cursor: pointer;
	}

	.category:hover{
		background: #efefef;

	}
</style>
