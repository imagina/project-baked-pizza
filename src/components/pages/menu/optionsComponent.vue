<template>
	<div>
		<div v-for="(option, index) in options" :key="index">
			<div v-if="option.productOptionValues.length">
			<label>{{option.option_description}}</label>
			<select v-model="option.selected" @change="updateOption(option)">
				<option></option>
				<option v-for="(value, index) in option.productOptionValues" :key="index" :value="value.id">
					{{value.option_value}}
				</option>
			</select>
			<div v-if="option.selected != ''">
		  	<options-values-component :product="product" :parent="option.option_id" :parentOptionValueId="option.selected"/>
			</div>

			</div>
		</div>
		<q-inner-loading :visible="loading" style="background-color: #f4f4f4c7">
     	<q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>	
	</div>
</template>

<script>
	import option from 'src/services/product-option';

	export default {
		name : 'optionsValuesComponent',
		props:['product', 'parent', 'parentOptionValueId'],
		data(){
			return{
				loading: false,
				options:[],
				valueSelected: null,
				selected: [], 
			}
		},

		watch: {
    	parentOptionValueId(val){
    		this.getOptions()	
    	}
  	},
		mounted(){
			this.getOptions()
		},
		beforeDestroy(){
			this.$root.$emit('deleteoptions', this.selected)
		},
		methods:{
			getOptions(){
				this.loading = true
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = this.parent; 
				filter["parentOptionValueId"] = this.parentOptionValueId; 
				let include = 'productOptionValues'
				option.index(filter, '', '', '', include)
				.then(response => {
					this.loading = false
					this.options =  response.data
				})
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
			setValueSelected(event){
				this.valueSelected = event
			},
			updateOption(option){

				this.selected = option
				let data = {
					'product_option_id' : option.id,
					'product_option_value_id' : option.selected,
				}

				this.$root.$emit('updateoptions', data)

			}

		}
	}
</script>
