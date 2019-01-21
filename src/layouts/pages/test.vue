<template>
<div>
			<input type="text" v-model="message">
		<p>{{message}}</p>


		<p>{{message}}</p>
		<p>{{message}}</p>
		<p>{{message}}</p>

		<q-btn
  	color="purple-2"
  	size="sm"
  	text-color="cyan-12"
  	label="Edit asdasd asdasd"
  	@click="getUsers"
	/>

</div>
	
</template>

<script>
	export default{
		data(){
			return{
				message: 'Hola asda'
			}
		},
		mounted(){
			this.getUsers()
		},
		methods:{
			getUsers(){
				console.log('mounted', this.message)
			}
		}
	}
</script>

<style>
	
</style>