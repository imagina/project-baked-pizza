<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1">
		<q-card class="no-shadow" v-if="userData">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 q-py-lg">
					<addresses-component :parentData="parentData.billing"/>
				</div>
			</div>
		</q-card>
		<q-card class="no-shadow" v-else>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
				</div>
			</div>
			<billingaddress-component :formData="parentData.billing" />
		</q-card>
		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-md" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Dirección de Envío</div>
					<q-checkbox
						v-model="parentData.shipping.differentAddress"
						label="Mis direcciones de envío y facturación son las mismas."
						:true-value="true"
						:false-value="false"
					/>
				</div>
			</div>
			<transition name="component-fade" mode="out-in">
				<div class="row" v-if="parentData.shipping.differentAddress == false">
					<div class="col-md-12 q-pb-lg" v-if="userData">
						<addresses-component :parentData="parentData.shipping"/>
					</div>
					<div v-else class="row">		
						<billingaddress-component :formData="parentData.shipping" />
					</div>
				</div>
			</transition>
		</q-card>
	</div>
</template>

<script>
	import billingaddressComponent from 'src/components/icommerce/checkout/billingaddressComponent'
	import addressesComponent from 'src/components/icommerce/addresses'
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import profileService from 'src/services/profile'

	export default {
		props: ['parentData'],
		components:{
			addressesComponent,
			billingaddressComponent,
		},
		data(){
			return {
				countries: [],
				userData: true,
				addresses: [],
				address : '',
			}
		},
		created(){
  		this.$root.$on("sesionStart", this.setData);
		},
		mounted(){
			this.setData()
		},
		methods:{
		  select(dataArray) {
		    let response = []
		    dataArray.forEach((item) => {
		      let labelTitle = item.title ? item.title : (item['name'] ? item['name'] : 'default')

		      response.push({
		        label: labelTitle,
		        value: item.id.toString()
		      });
		    })
		    return response
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
    		let include = 'addresses'
    		profileService.show(id, include)
    		.then(response => {
    			this.addresses = (response.data.addresses)
    		})
      }
		}
	}
</script>