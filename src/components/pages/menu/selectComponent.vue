<template>
	<div>

		<select @change="updateSelected" v-model="selected">
			<option></option>
			<option v-for="(value, index) in values" :key="index" :value="value.option_value_id">
				{{value.option_value}}
			</option>
		</select>

	</div>
</template>

<script>
	
	export default {
		name : 'selectComponent',
		props: ['values'],
		data(){
			return{
				selected: ''
			}
		},
		methods: {
			updateSelected(){
				this.$emit('updateSelected', this.selected)
			}
		}
	}
</script>