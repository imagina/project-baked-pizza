<template>
	<div>

		<div v-for="(option, index) in options" :key="index">
			<pre>{{option}}</pre>
			<pre>{{option.productOptionValues}}</pre>
			<options-values-component :product="product" :parent="option.id"/>
		</div>

		<q-inner-loading :visible="loading">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
		
	</div>
</template>

<script>
	import option from 'src/services/product-option';

	export default {
		name : 'optionsValuesComponent',
		props:['product', 'parent'],
		components:{},
		data(){
			return{
				loading: false
				options:[],
			}
		},
		mounted(){
			this.getOptions()
		},
		methods:{
			getOptions(){
				this.loading = true
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = this.parent; 
				let include = 'productOptionValues'
				option.index(filter, '', '', '', include)
				.then(response => {
					this.loading = false
					this.options =  response.data
				})
			},
		}
	}
</script>