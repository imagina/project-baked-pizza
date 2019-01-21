<template>
	<div>
		<q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '80vh'}">
		  <q-modal-layout>
		  	<div class="row">
		    	<div class="col-12" style="background: #1f0543; color: white">
		    		<q-btn icon="close" flat rounded @click="opened = false" class="float-right"/>
		    	</div>		  		
		  	</div>
		    <div class="layout-padding">		     
		      <p>SED GRAVIDA</p>
		      <div class="row">
		      	<div class="col-md-4"></div>
		      	<div class="col-md-4"></div>
		      	<div class="col-md-4"></div>
		      </div>
		    </div>
		  </q-modal-layout>
		</q-modal>
	</div>
</template>

<script>
	
</script>