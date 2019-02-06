<template>
	<div>
		<q-btn  label="Adicionales" size="md" color="red" sence class="q-my-sm round-borders-0 full-width" @click="opened = true"  />
		<q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
			<q-modal-layout>
		  	<q-toolbar slot="header">
		    	<q-btn flat round dense v-close-overlay icon="cancel"/>
		    	<q-toolbar-title>
		     		Adicionales
		    	</q-toolbar-title>
		  	</q-toolbar>
		  	<div class="layout-padding">
		    	<options-component :product_id="product_id"/>
		  	</div>
			</q-modal-layout>
		</q-modal>
	</div>
</template>

<script>
	import optionsComponent from 'src/components/pages/menu/options';

	export default{
		components:{
			'options-component': optionsComponent,
		},
		props:['product_id',],
		data(){
			return{
				opened: false,
			}
		},
	}	
</script>