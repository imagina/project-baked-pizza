<template>
	<div>
		<div class="row">
			<div class="col-md-12 q-mb-lg">
				<q-btn label=" - Agregar otra direccion -" class="full-width" color="red"  @click="opened = true"/>
			</div>
		</div>
		<q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
		  <q-modal-layout>
		    <q-toolbar slot="header">
		      <q-btn
		        flat
		        round
		        dense
		        v-close-overlay
		        icon="keyboard_arrow_left"
		      />
		      <q-toolbar-title>
		        Direcciones
		      </q-toolbar-title>
		    </q-toolbar>
		    <div class="layout-padding">
		    </div>
		  </q-modal-layout>
		</q-modal>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				opened: false
			}
		},
	}
</script>