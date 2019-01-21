<template>
	<div class="row catering-container">
		<div class="col-md-3 desktop-only">
			<h6 class="color-purple-secondary"><b>CATEGORIES</b></h6>
			<ul class="categories">
				<li class="category"></li>
				<li v-for="category in categories" :key="category.id" class="category" @click="selectCategory(category)">{{category.title}}</li>
			</ul>
		</div>
		<div class="col-md-6 col-sm-12">
			<h6 class="color-purple-secondary"><b> {{category_selected.title}}</b></h6>
			<img src="statics/sliders/category1.png" width="97%" />
			<div v-for="product in products" :key="product.id" class="item-category">
				<p><b @click="opened = true">{{product.name}}</b></p>
				<p align="justify">
					 <span v-html="product.description"></span>
				</p>
			</div>

		</div>
		<div class="col-md-3 desktop-only color-purple-secondary">
			<h6><b>ORDER CONTENTS</b></h6>

			<div class="row">
				<div class="col-6">
					<b>SUB TOTAL</b>
				</div>
				<div class="col-6">
					<b>$0.00</b>	
				</div>
			</div>

			<div class="row">
				<div class="col-6">
					<b>TAX</b>
				</div>
				<div class="col-6">
					<b>$0.00</b>	
				</div>
			</div>

			<div class="row">
				<div class="col-6">
					<b>TOTAL</b>
				</div>
				<div class="col-6">
					<b>$0.00</b>	
				</div>
			</div>
		</div>


		<q-modal v-model="opened" >
		  <q-modal-layout>
		  	<div class="row">
		  		<div class="col-6" style="background: #1f0543; color: white">
		    		<q-btn label="lorem ipsum dolor" flat />
		    	</div>
		    	<div class="col-6" style="background: #1f0543; color: white">
		    		<q-btn icon="close" flat rounded @click="opened = false" class="float-right"/>
		    	</div>		  		
		  	</div>

		    <div class="layout-padding">	

		    	<div class="row text-center">
		    		<div class="col-12">
		    			<span class="color-purple-secondary"><b>SIDES</b></span>
		    		</div>
		    	</div>
		      <div class="row option-row">
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="House salad"	/>
		      		</div>
		      	</div>
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="French frie"	/>
		      		</div>
		      	</div>
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="White Jasmine Rice"	/>
		      		</div>
		      	</div>
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="Plantains +$1"	/>
		      		</div>
		      	</div>
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="Yuca +$1"	/>
		      		</div>
		      	</div>
		      	<div class="col-4">
		      		<div class="option-item">
		      			<q-checkbox label="Lentils +$1"	/>
		      		</div>
		      	</div>
		      </div>
		      <br>

		     	<div class="row q-my-lg">
		      	<div class="col-12">
		      		<q-input 
		      			class="float-right"
								type="number" 
								float-label="Quantity" 
								/>
		      	</div>
		      </div>

		      <div class="row">
		      	<div class="col-12">
		      		<q-btn label="Add to Cart" color="red" class="float-right"/>
		      		<q-btn label="Cancel" color="red" class="float-right q-mx-sm"/>
		      	</div>
		      </div>


					


		    </div>
		  </q-modal-layout>
		</q-modal>




		<q-inner-loading :visible="loading" >
      <q-spinner-puff size="50px" color="red"></q-spinner-puff>
    </q-inner-loading>

	</div>
</template>

<script>
	import categoryService from 'src/services/categories';
	import productService from 'src/services/products';
	import optionService from 'src/services/options';

	export default {
		data(){
			return{
				loading: false,
				opened: false,
				categories:[],
				category_id: '',
				options: [],
				category_selected: '',
				products:[
					{
						id: 1,
						title: 'SED GRAVIDA',
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
					},
					{
						id: 2,
						title: 'SED GRAVIDA',
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
					},
					{
						id: 3,
						title: 'SED GRAVIDA',
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
					},

				]
			}
		},
		mounted(){
			this.getCategories()
			this.productsByCategory()
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
			selectCategory: function (category){
				this.category_id = category.id
				this.category_selected = category
				this.productsByCategory()
			},
			productsByCategory: function (){
				this.loading = true
				let filterBackend = {
				 }
        
        if(this.category_id)
        	filterBackend["categories"] = [this.category_id];

				productService.index(filterBackend,'', '', '', '', true)
				.then(response =>{
					this.products = response.data
					this.loading = false
				})
			},
			optionsByProduct: function () {
				this.loading = true
				optionService.index(filterBackend,'', '', '', '', true)
				.then(response =>{
					this.options = response.data
					this.loading = false
				})


			}
		}
	}
</script>

<style>
	.option-row{
		box-sizing: border-box;
		border: 1px black solid; border-radius: 5px; padding: 10px; 
	}

	.option-row > div {
		margin-bottom: 10px;
	}

	.option-item{
		box-sizing: border-box;
		border: 1px black solid; padding: 10px; height: 100%;
		margin: 5px;
	}

	.category{
	    border-bottom: 3px solid #efefef;
	    font-size: 1.2em;
	    line-height: 60px;
	    margin-bottom: 0;
	    margin-right: 25px;
	    list-style-type: none;
	    transition: .4s all;
	    padding-left: 20px;
	    cursor: pointer;
	}

	.category:hover{
		background: #efefef;

	}

@media (min-width: 1281px) {
  

	.catering-container{
		margin: 0 150px; background: #ffff; margin-top: 10px; padding: 25px
	}
  
}

.catering-container{
	background: #ffff; margin-top: 10px; padding: 25px
}

	ul{
		padding-left: 0;
	}


	.color-purple-secondary{
		color: #1f0543;	
	}

	.item-category{
		padding-right: 20px; margin: 50px auto;
		
	}

	.item-category > p > b{
		cursor: pointer;
	}



</style>

