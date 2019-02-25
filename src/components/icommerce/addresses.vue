<template>
	<div>

		<q-card class="no-shadow">
			  <q-card-title>
		    Direccion de Facturaciòn
		  </q-card-title>
		  <q-card-separator />
		  <q-card-main>
		    <b>Nombre: </b> {{addressSelected.first_name}} {{addressSelected.last_name}}<br>
		    <b>Direccion  1: </b> {{addressSelected.address_1}}<br>
		    <b>Direccion  2: </b> {{addressSelected.address_2}}<br>
		    <b>Empresa: </b> {{addressSelected.company}}<br>
		  </q-card-main>
		</q-card>

		<div class="row">
			<div class="col-md-12 q-mb-lg">
				<q-btn label=" - Cambiar dirección de Facturación -" class="full-width" color="red"  @click="opened = true"/>
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
					<q-card v-for="(address, index) in addresses" :key="index" class="no-shadow" >
						  <q-card-title>
					    Direccion de Facturaciòn
					  </q-card-title>
					  <q-card-separator />
					  <q-card-main>
					  	<div class="col-md-12 q-mt-sm">
								<q-btn label=" Seleccionar" size="xs" class="float-right" color="red" no-caps @click="changeAddressSelected(address)"/>
							</div>
					    <b>Nombre: </b> {{address.first_name}} {{address.last_name}}<br>
					    <b>Direccion  1: </b> {{address.address_1}}<br>
					    <b>Direccion  2: </b> {{address.address_2}}<br>
					    <b>Empresa: </b> {{address.company}}<br>
					  </q-card-main>
					</q-card>
		    </div>
		  </q-modal-layout>
		</q-modal>

		<q-inner-loading :visible="visible" style="background: #f4f4f4;">
			<q-spinner size="50px" color="primary"></q-spinner>
		</q-inner-loading>

	</div>
</template>
<script>
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import profileService from 'src/services/profile'

	export default {
		data(){
			return {
				visible: false,
				opened: false,
				addresses: [],
				addressSelected: [],
			}
		},
		created(){
  		this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
		},
		methods:{
			changeAddressSelected(item){
				this.addressSelected = item
				this.opened = false
			},
			setData(){
      	helper.storage.get.item('userData').then(response => {
        	this.userData = response
        	if (response != null) {
        		this.getAddresses(response.id)
        	}
      	})
    	},
		  getAddresses(id){
		  	this.visible = true
  			let include = 'addresses'
  			profileService.show(id, include)
  			.then(response => {
  				this.visible = false
  				this.addresses = (response.data.addresses)
  				response.data.addresses.forEach(item=>{
  					if (item.default) {
  						this.addressSelected = item
  					}
  				})
  			})
      }
		}
	}
</script>