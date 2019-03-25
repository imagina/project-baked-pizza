<template>
	<div>
		<div v-for="(option, index) in options" :key="index">
			<div v-if="option.productOptionValues.length && option.option_description !== 'Tamaños'">
			<!-- <label>{{option.option_description}}</label>
			<select v-model="option.selected" @change="updateOption(option)">
				<option></option>
				<option v-for="(value, index) in option.productOptionValues" :key="index" :value="value.id">
					{{value.option_value}}
				</option>
			</select> -->
			<div class="row">
				<span class="col-md-4 product-option-name">{{option.option_description}}: </span>
				<q-select
				@input="updateOption(option)"
				v-model="option.selected"
				style="background: transparent;"
				class="col-xs-12 col-sm-12 col-md-8"
				radio
				:options="resetOptions(option.productOptionValues)"
				/>
			</div>

			<div v-if="option.selected != ''">
			<br>
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
	import EventBus from 'src/utils/event-bus';

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
			//this.$root.$emit('deleteoptions', this.selected)
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
					this.options.forEach(item=>{
						if (item.option_description == 'Tamaños') {
							EventBus.$emit('tamanos',item)
						}
					})


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
				var price = 0;
				let options = option.productOptionValues
				options.forEach(element => {
					if(element.id === option.selected){
						price = element.price
					}
				})
				this.selected = option
				
				let data = {
					'parent': this.parent,
					'option_id': option.option_id,
					'product_option_id' : option.id,
					'product_option_value_id' : option.selected,
					'price': price,
				}

				this.$root.$emit('updateoptions', data)
			},
			resetOptions(options){
				let newArray = [{label: 'Sin opcion',value: -1}];
				for (let index = 0; index < options.length; index++) {
					newArray.push({ label: options[index].option_value , value: options[index].id });
				}

				return newArray;
			},
		}
	}
</script>
