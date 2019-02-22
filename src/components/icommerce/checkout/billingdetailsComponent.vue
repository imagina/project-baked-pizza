<template>
	<div class="col-xs-12 col-sm-12 col-md-4 section-1 ">
		<q-card class="no-shadow">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12" align="center">
				<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Detalles de facturación</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 q-py-lg">
				<q-select
					radio
				  style="background: transparent;"
				  v-model="address"
				  float-label="Direcciones"
				  :options="addresses"
				/>
			</div>
		</div>
		<addresses-component></addresses-component>
		</q-card>
		<q-card class="no-shadow">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 q-mb-md" align="center">
					<div class="q-display-1 csh3__catering_title q-mt-xl q-mb-lg">Dirección de Envío</div>
					<q-checkbox
						v-model="differentAddress"
						label="Mis direcciones de envío y facturación son las mismas."
						true-value="yes"
						false-value="no"
					/>
				</div>
			</div>
			<transition name="component-fade" mode="out-in">
				<div class="row" v-if="differentAddress == 'no'">
					<div class="col-md-12 q-pb-lg">
				  	<q-select
						  radio
						  style="background: transparent;"
						  v-model="address"
						  float-label="Direcciones"
						  :options="addresses"
						/>
					</div>
				</div>
			</transition>
		</q-card>
	</div>
</template>

<script type="text/javascript">
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import addressesComponent from 'src/components/icommerce/addresses'

	export default {
		components:{
			addressesComponent,
		},
		data(){
			return {
				userData: false,
				addresses: [],
				address : '',
				differentAddress: 'yes',
			}
		},
		mounted(){
			this.setData()
		},
		methods:{
			setData(){
      	helper.storage.get.item('userData').then(response => {
        	this.userData = response
      	})
    	},
		}

	}
</script>