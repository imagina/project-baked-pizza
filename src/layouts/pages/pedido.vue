<template>
	<div class="flex flex-center" style="margin-top:10%; height: 500px">
		<p>{{message}}</p>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				message: 'Pedido'
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