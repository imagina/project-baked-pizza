<template>
	<div style="margin: 50px;">
		<!--== 
			Componente para testear manualmente un componente de 
			manera independiente de toda los demas componentes de 
		 	la aplicacion.
		==-->

		<div class="row">
			<div class="col-md-12">
				<indexComponent/>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">

	// Cambiar la ruta del componenten para testear desacoplado 
	// de todos los demas componetes de la aplicacion.
	import testComponent from 'src/components/icommerce/addresses'

	import indexComponent from 'src/components/icommerce/address/index'

	export default{
		components:{
			indexComponent,
			testComponent,
		},
	}
</script>