<template>
	<q-card class="no-shadow">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12" align="center">
				<div class="q-display-1 csh3__catering_title q-mt-lg q-mb-lg">Detalles</div>
			</div>
		</div>
		<div class="q-py-lg row">
			<div class="col-sm-12 col-md-12">
				<q-input type="text" float-label="Distancia del pedido" v-model="parentData.distance" :after="[{ icon: 'motorcycle', }]" style="background: transparent;" class="no-shadow" />
			</div>
			<div class="col-sm-12 col-md-12">
				<q-input type="text" float-label="Escribe aquí..." v-model="parentData.commentary" :after="[{ icon: 'fas fa-comment', }]" style="background: transparent;" class="no-shadow" />
			</div>
			<div class="col-sm-12 col-md-12">
				<q-input type="text" float-label="Añadir cupones" v-model="parentData.coupon" :after="[{ icon: 'fa fa-tag', }]" style="background: transparent;" class="no-shadow" />
			</div>
			<div class="col-sm-12 col-md-12">
				<q-input type="text" float-label="Valor Total" v-model="parentData.total" :after="[{ icon: 'fas fa-thumbs-up', }]"   style="background: transparent;" :disable="true" class="no-shadow" />
			</div>
		</div>
	</q-card>
</template>

<script type="text/javascript">
	export default {
		props: ['parentData'],
		data(){
			return {
				distance: '',
				commentary: '',
				coupon: '',
				total: '',
			}
		}
	}
</script>
