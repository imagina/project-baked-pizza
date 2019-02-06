<template>
	<div>	

		<div v-for="option in options" :key="option.id">
  		<q-select :float-label="option.option_description" v-model="selectLevel1" :options="option.values" class="q-select--app"/>
		</div>

		<div v-for="option2 in options2" :key="option2.id">
  		<q-select :float-label="option2.option_description" v-model="selectLevel2" :options="option2.values" class="q-select--app"/>
		</div>

		<div v-for="option3 in option3s" :key="option3.id">
  		<q-select :float-label="option3.option_description" v-model="selectLevel3" :options="option3.values" class="q-select--app" />
		</div>

		<div v-for="option4 in option4s" :key="option4.id">
  		<q-select :float-label="option4.option_description" v-model="selectLevel4" :options="option4.values" class="q-select--app" />
		</div>

		<div v-for="option5 in option5s" :key="option5.id">
  		<q-select :float-label="option5.option_description" v-model="selectLevel5" :options="option5.values" class="q-select--app"/>
		</div>

	</div>
</template>

<script>
	import option from 'src/services/product-option';
	import optionValues from 'src/services/product-option-values';

	export default {
		name: 'options-component',
		props:['product'],
		data(){
			return{
			visible: false,
			options: [],
			options2: [],
			option3s: [],
			option4s: [],
			option5s: [],
			selectLevel1: '',
			selectLevel2: '',
			selectLevel3: '',
			selectLevel4: '',
			selectLevel5: '',
			}
		},
		watch:{
			product(newValue, old){
				this.getOptions(0, null)
			},
			selectLevel1(newValue, old){
				this.levet2(newValue)
			},
			selectLevel2(newValue, old){
				this.levet3(newValue)
			},
			selectLevel3(newValue, old){
				this.levet4(newValue)
			},
			selectLevel4(newValue, old){
				this.levet5(newValue)
			},

		},
		methods:{
			getOptions(parent, parentOptionValue){
				this.visible = true
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = parent; 
				filter["OptionValueParent"] = parentOptionValue; 
				option.index(filter)
				.then(response => {
					this.visible = false
					this.options =  response.data
				})
			},
			levet2(parent){
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = parent; 
				filter["OptionValueParent"] = this.selectLevel1; 
				option.index(filter)
				.then(response => {
					this.options2 = response.data
				})
			},
			levet3(parent){
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = parent; 
				filter["OptionValueParent"] = this.selectLevel2; 
				option.index(filter)
				.then(response => {
					this.options3 = response.data
				})
			},
			levet4(parent){
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = parent; 
				filter["OptionValueParent"] = this.selectLevel3; 
				option.index(filter)
				.then(response => {
					this.options3 = response.data
				})
			},
			levet5(parent){
				let filter = {}
				filter["product"] = this.product;
				filter["parent"] = parent; 
				filter["OptionValueParent"] = this.selectLevel4; 
				option.index(filter)
				.then(response => {
					this.options3 = response.data
				})
			},
		},
	}
</script>