<template>
	<div>
		<q-card class="no-shadow">
			<q-card-main>
				<p class="color-purple-secondary">RESUMEN DE TU PEDIDO</p>
				<hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
				<p>TOTAL: <span class="table-price__total"><b>$ {{total}}</b></span></p>
				
				<hr style="background-color: #e0e0e0; color: #e0e0e0; border: none; height: 1px;">
			</q-card-main>
		</q-card>
	</div>
</template>

<script>
	export default {
		props: ['total'],
	}
</script>