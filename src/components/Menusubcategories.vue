<template>
	<div>
		<div v-for="category in categories" :key="category.id">
			<div v-if="category.id == category.parent_id">
		    	<p class="category subcategory" @click="getSubCategories(category.id)">{{category.title}}</p>
		    	<menu-subcategories :category="category"/>
		  	</div>
		</div>
	</div>
</template>

<script>
	import categoryService from 'src/services/categories';
	export default {
		name: 'menu-subcategories',
		data(){
    	return{
      	categories: [],
      }
    },
    getSubCategories(id){
      categoryService.index({parent_id: id})
        .then(response =>{
        this.categories = response.data
        console.log(response.data)
      })
    },

	}
</script>