<template>
	<div>
		<q-card class="no-shadow">
			<q-card-main>
				<p class="color-purple-secondary">RESUMEN DE TU PEDIDO</p>
				<hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
				<p>TOTAL: <span class="table-price__total"><b>$ {{total | toFixed}}</b></span></p>
				
				<hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
			</q-card-main>
		</q-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				total: 0
			}
		},
		created(){
  		this.$root.$on("updateCart", this.handleupdateCart);
		},
		methods:{
			handleupdateCart(e){
				this.total = e
			}
		},
		filters: {
  		toFixed: function (value) {
  			if (value) {
  				return (value).toFixed(2)	
  			} else {
  				return 0
  			}
  		}
		},
	}
</script>