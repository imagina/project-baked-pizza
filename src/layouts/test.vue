<template>
	<div style="margin: 50px;">
		<!--== 
			Componente para testear manualmente un componente de 
			manera independiente de toda los demas componentes de 
		 	la aplicacion.
		==-->
		<testComponent/>
	</div>
</template>

<script type="text/javascript">

	// Cambiar la ruta del componenten para testear desacoplado 
	// de todos los demas componetes de la aplicacion.
	import testComponent from 'src/components/icommerce/addresses'

	export default{
		components:{
			testComponent,
		},
	}
</script>